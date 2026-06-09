import React, { useState, useEffect, useRef } from "react";
import { WebsiteConfig } from "../types";
import { Mic, Settings, Volume2, VolumeX, X, Send } from "lucide-react";
import "./InsuranceBossChatbot.css";

interface Message {
  sender: "bot" | "user";
  text: string;
  suggestions?: { text: string; action: string }[];
}

interface InsuranceBossChatbotProps {
  config: WebsiteConfig;
}

export default function InsuranceBossChatbot({ config }: InsuranceBossChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Welcome to The Insurance Boss! I'm here to help you get the best coverage. To get started, what is your <b>Full Name</b>?"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [onboardingStep, setOnboardingStep] = useState<"fullName" | "email" | "voice" | "ready">("fullName");
  const [userData, setUserData] = useState({ fullName: "", email: "" });
  const [isMuted, setIsMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState<any>(null);
  
  // Voice selection state
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  // Form overlay state
  const [activeForm, setActiveForm] = useState<{ name: string; embedId: string } | null>(null);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(
    typeof window !== "undefined" ? window.speechSynthesis : null
  );

  // 1. Fetch Knowledge Base & Load Voices on Mount
  useEffect(() => {
    // Load knowledge base
    fetch("/knowledge_base.json")
      .then((res) => res.json())
      .then((data) => {
        setKnowledgeBase(data);
        console.log("Chatbot Knowledge base loaded");
      })
      .catch((err) => {
        console.error("Failed to load chatbot knowledge base:", err);
      });

    // Load voices
    if (synthesisRef.current) {
      const loadVoices = () => {
        const allVoices = synthesisRef.current?.getVoices() || [];
        // Filter strictly for US English voices
        const usVoices = allVoices.filter((v) => v.lang.includes("en-US"));
        setVoices(usVoices);
      };
      loadVoices();
      if (synthesisRef.current.onvoiceschanged !== undefined) {
        synthesisRef.current.onvoiceschanged = loadVoices;
      }
    }

    // Load Zapier web-components script
    const scriptId = "zapier-embed-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "module";
      script.src = "https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js";
      document.head.appendChild(script);
    }
  }, []);

  // 2. Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "en-US";

      rec.onstart = () => {
        setIsListening(true);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript.trim()) {
          setInputText(transcript);
          handleSendMessage(transcript);
        }
      };

      rec.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, [onboardingStep, userData, knowledgeBase]);

  // 3. Scroll to Bottom on message updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  // 4. Speech Synthesis Speaker
  const speakText = (text: string) => {
    if (!synthesisRef.current || isMuted) return;
    synthesisRef.current.cancel();

    // Remove HTML tags for spoken voice
    const cleanText = text.replace(/<[^>]*>/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Choose voice
    let voice = selectedVoice;
    if (!voice && voices.length > 0) {
      // Fallback searches for standard American voices
      voice = voices.find((v) => v.name.includes("Zira") || v.name.includes("Samantha") || v.name.includes("Google US English")) || voices[0];
    }
    
    if (voice) utterance.voice = voice;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthesisRef.current.speak(utterance);
  };

  // Stop speaking on toggle/close
  const cancelSpeech = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  // 5. Send Slack Notification
  const notifySlack = async (message: string) => {
    const webhook = config.chatbotSlackWebhook || "";
    if (!webhook) return;
    try {
      await fetch(webhook, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ payload: JSON.stringify({ text: message }) })
      });
      console.log("Slack notification sent successfully");
    } catch (err) {
      console.error("Slack Notify Error:", err);
    }
  };

  // Send Chat Summary to Slack
  const sendConversationSummary = async (history: Message[]) => {
    if (history.length < 4) return;
    const key = config.chatbotGeminiKey || "AIzaSyCu20SwPp_WGo5TZ03J-B11c3dOlhqbs8M";
    const summaryPrompt = `Provide a very brief 2-sentence summary of this conversation for a lead notification.
    Conversation: ${JSON.stringify(history.slice(-10))}`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: summaryPrompt }] }]
        })
      });
      const data = await response.json();
      const summary = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No summary generated.";
      notifySlack(`*Conversation Summary for ${userData.fullName}:*\n*Email:* ${userData.email}\n*Summary:* ${summary}`);
    } catch (err) {
      console.error("Summary Generation Error:", err);
    }
  };

  // 6. Gemini Integration
  const getGeminiResponse = async (userPrompt: string) => {
    const key = config.chatbotGeminiKey || "AIzaSyCu20SwPp_WGo5TZ03J-B11c3dOlhqbs8M";
    const systemPrompt = `You are the "Insurance Boss", a professional, exceptionally kind, and expert insurance consultant.
    USER CONTEXT: Name: ${userData.fullName}, Email: ${userData.email}.
    Use this Knowledge Base to answer customer questions precisely. If they ask about quotes, direct them to Auto Quote, Home Quote, Life Insurance or Business Insurance suggestions.
    Knowledge Base: ${JSON.stringify(knowledgeBase)}`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { role: "user", parts: [{ text: systemPrompt }] },
            { role: "model", parts: [{ text: "Understood. I am the Insurance Boss. I will answer customer questions, refer to the client by their name, avoid asterisks, and only trigger forms when needed." }] },
            { role: "user", parts: [{ text: userPrompt }] }
          ]
        })
      });

      const data = await response.json();
      if (data.error) {
        return `Error: ${data.error.message}`;
      }
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having a little trouble connecting. Please try again or call us at 732-COVERED!";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "I'm having a little trouble connecting. Please try again or call us at 732-COVERED!";
    }
  };

  // 7. Onboarding Flow Logic
  const handleOnboarding = (text: string) => {
    if (onboardingStep === "fullName") {
      setUserData((prev) => ({ ...prev, fullName: text }));
      setOnboardingStep("email");
      const botReply = `Great to meet you, <b>${text}</b>! And what is your <b>Email Address</b> so we can keep in touch?`;
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
      speakText(botReply);
    } else if (onboardingStep === "email") {
      setUserData((prev) => ({ ...prev, email: text }));
      setOnboardingStep("voice");
      const botReply = "Got it! Lastly, would you prefer a <b>Male</b> or <b>Female</b> <b>American Accent</b> voice for our conversation?";
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: botReply,
          suggestions: [
            { text: "Female Voice (US)", action: "voice:female" },
            { text: "Male Voice (US)", action: "voice:male" }
          ]
        }
      ]);
      speakText(botReply);
      notifySlack(`New Lead: *${userData.fullName || text}* (${text}) has started a chatbot conversation.`);
    }
  };

  const handleSuggestion = (sug: { text: string; action: string }) => {
    // Render selection as a user message
    setMessages((prev) => [...prev, { sender: "user", text: sug.text }]);

    if (sug.action.startsWith("voice:")) {
      const gender = sug.action.split(":")[1];
      // Select matching speech synthesis voice
      if (voices.length > 0) {
        let voiceMatch = null;
        if (gender === "female") {
          voiceMatch = voices.find((v) => v.name.includes("Zira") || v.name.includes("Samantha") || v.name.includes("Female") || v.name.includes("Google US English"));
        } else {
          voiceMatch = voices.find((v) => (v.name.includes("David") || v.name.includes("Alex") || v.name.includes("Male")) && !v.name.includes("Female"));
        }
        if (voiceMatch) setSelectedVoice(voiceMatch);
      }
      setOnboardingStep("ready");

      const botReply = `Excellent choice! Hello ${userData.fullName.split(" ")[0]}, I'm the Insurance Boss. I'm here to help you navigate <b>Commercial</b>, <b>Life</b>, <b>Personal</b>, and <b>Retirement</b> insurance. How can I help you today?`;
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: botReply,
          suggestions: [
            { text: "Auto Quote", action: "form:auto_quote" },
            { text: "Home Quote", action: "form:home_insurance" },
            { text: "Life Insurance", action: "topic:life" },
            { text: "Business Insurance", action: "topic:commercial" }
          ]
        }
      ]);
      speakText(botReply);
    } else if (sug.action.startsWith("form:")) {
      const formKey = sug.action.split(":")[1];
      openForm(formKey);
    } else if (sug.action.startsWith("topic:")) {
      const topic = sug.action.split(":")[1];
      handleSendMessage(`Tell me about ${topic} insurance`);
    }
  };

  const openForm = (formKey: string) => {
    if (!knowledgeBase || !knowledgeBase.forms) return;
    const formInfo = knowledgeBase.forms[formKey];
    if (!formInfo) return;

    setActiveForm({ name: formInfo.name, embedId: formInfo.embed_id });
    notifySlack(`User *${userData.fullName}* opened the *${formInfo.name}* form.`);
  };

  // 8. Send Main Message
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    if (!textToSend) {
      setMessages((prev) => [...prev, { sender: "user", text }]);
      setInputText("");
    }

    if (onboardingStep !== "ready") {
      handleOnboarding(text);
      return;
    }

    setIsThinking(true);
    const rawResponse = await getGeminiResponse(text);
    setIsThinking(false);

    // Extract form triggers e.g., [TRIGGER_FORM:auto_quote]
    const formMatch = rawResponse.match(/\[TRIGGER_FORM:(\w+)\]/);
    const cleanText = rawResponse.replace(/\[TRIGGER_FORM:\w+\]/g, "").trim();

    // Format HTML formatting
    let formattedText = cleanText.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    formattedText = formattedText.replace(/\*/g, "");
    
    // Auto-highlight categories
    const categories = ["Commercial", "Life", "Personal", "Retirement", "Auto", "Home", "Workers Comp"];
    categories.forEach((cat) => {
      const regex = new RegExp(`\\b${cat}\\b`, "gi");
      formattedText = formattedText.replace(regex, (match) => `<b>${match}</b>`);
    });

    setMessages((prev) => [...prev, { sender: "bot", text: formattedText }]);
    speakText(cleanText);

    if (formMatch) {
      const formKey = formMatch[1];
      setTimeout(() => openForm(formKey), 1200);
    }
  };

  // Voice settings selection
  const selectVoiceSetting = (voice: SpeechSynthesisVoice) => {
    setSelectedVoice(voice);
    setIsVoiceModalOpen(false);
    
    // Play preview
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      const preview = new SpeechSynthesisUtterance("Hello, I am the Insurance Boss. This is a preview of my voice.");
      preview.voice = voice;
      synthesisRef.current.speak(preview);
    }
  };

  const toggleMute = () => {
    const newMute = !isMuted;
    setIsMuted(newMute);
    if (newMute) {
      cancelSpeech();
    }
  };

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  // Close widget action
  const handleCloseChat = () => {
    setIsOpen(false);
    cancelSpeech();
    if (onboardingStep === "ready") {
      sendConversationSummary(messages);
    }
  };

  return (
    <>
      <div id="insurance-boss-widget">
        {/* Floating Button */}
        {!isOpen && (
          <button
            onClick={() => {
              setIsOpen(true);
              if (onboardingStep === "fullName") {
                notifySlack("Someone just opened the chatbot window!");
                speakText(messages[0].text);
              }
            }}
            className="chat-toggle"
            title="Speak with The Insurance Boss"
          >
            <img
              src="/avatar.png"
              alt="Insurance Boss"
              className={isSpeaking ? "speaking" : ""}
            />
            <span className="pulse"></span>
          </button>
        )}

        {/* Chat Window */}
        <div className={`chat-window ${isOpen ? "" : "hidden"}`}>
          {/* Header */}
          <div className="chat-header">
            <div className="header-info">
              <div className="avatar-container">
                <img
                  src="/avatar.png"
                  alt="Insurance Boss"
                  className={isSpeaking ? "speaking" : ""}
                />
                <span className="status-indicator"></span>
              </div>
              <div className="header-text">
                <h3>Insurance Boss</h3>
                <p>Always Online</p>
              </div>
            </div>
            
            <div className="header-actions">
              <button
                id="mic-toggle"
                onClick={toggleMic}
                className={isListening ? "active" : ""}
                title="Talk to Insurance Boss"
              >
                <Mic size={18} />
              </button>
              <button
                onClick={() => setIsVoiceModalOpen(true)}
                title="Voice Settings"
              >
                <Settings size={18} />
              </button>
              <button
                onClick={toggleMute}
                title={isMuted ? "Unmute Bot" : "Mute Bot"}
                style={{ color: isMuted ? "#ff4444" : "white" }}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <button onClick={handleCloseChat} title="Close Chat">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <React.Fragment key={index}>
                <div
                  className={`message ${msg.sender === "bot" ? "bot-message" : "user-message"}`}
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="suggestions">
                    {msg.suggestions.map((sug, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleSuggestion(sug)}
                        className="suggestion-btn"
                      >
                        {sug.text}
                      </button>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}

            {isThinking && (
              <div className="typing">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <span style={{ marginLeft: "8px" }}>Insurance Boss is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Zapier Form Overlay */}
          {activeForm && (
            <div className="form-container">
              <div className="form-header">
                <span id="form-title">{activeForm.name}</span>
                <button id="close-form" onClick={() => setActiveForm(null)}>
                  <X size={20} />
                </button>
              </div>
              <div id="zapier-form-embed">
                {/* Custom Zapier interfaces element embedding */}
                <zapier-interfaces-page-embed
                  page-id={activeForm.embedId}
                  test-id={`${activeForm.embedId}-zapier-interfaces-page-embed-iframe`}
                  no-background="false"
                  style={{ width: "100%", height: "100%", border: "none" }}
                />
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="chat-input-area">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              id="chat-form"
            >
              <input
                type="text"
                id="user-input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={isListening ? "Listening..." : "Ask about insurance..."}
                autoComplete="off"
              />
              <button type="submit" id="send-btn" title="Send message">
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Voice Settings Modal */}
      {isVoiceModalOpen && (
        <div id="voice-settings-modal" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Voice Settings</h3>
              <button id="close-voice-settings" onClick={() => setIsVoiceModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="voice-list">
              {voices.length === 0 ? (
                <p style={{ padding: "10px", textAlign: "center", fontSize: "12px", opacity: 0.8 }}>
                  No US English voices found. Using system default.
                </p>
              ) : (
                voices.map((voice, idx) => (
                  <div
                    key={idx}
                    className={`voice-item ${selectedVoice?.name === voice.name ? "active" : ""}`}
                  >
                    <div className="voice-info">
                      <span className="voice-name">{voice.name}</span>
                      <span className="voice-lang">{voice.lang}</span>
                    </div>
                    <div className="voice-actions">
                      <button
                        className="btn-preview"
                        onClick={() => {
                          if (synthesisRef.current) {
                            synthesisRef.current.cancel();
                            const preview = new SpeechSynthesisUtterance("This is a preview.");
                            preview.voice = voice;
                            synthesisRef.current.speak(preview);
                          }
                        }}
                      >
                        Preview
                      </button>
                      <button
                        className="btn-select"
                        onClick={() => selectVoiceSetting(voice)}
                      >
                        Select
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="modal-footer">
              <p>Choose your preferred American voice.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Global declaration for Zapier Custom Web Component Element in JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "zapier-interfaces-page-embed": any;
    }
  }
}
