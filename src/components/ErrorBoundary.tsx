import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReset = () => {
    localStorage.removeItem("the_insurance_boss_config");
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-white font-sans text-center">
          <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-2xl space-y-6">
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 text-red-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold font-serif text-zinc-100">Application Error</h1>
            <p className="text-xs text-zinc-400 font-mono bg-black/40 p-4 rounded-lg overflow-x-auto text-left border border-zinc-800/40">
              {this.state.error?.toString()}
            </p>
            <p className="text-sm text-zinc-300">
              Your browser's cached configuration might be incompatible with the current version. Resetting will restore standard defaults.
            </p>
            <button
              onClick={this.handleReset}
              className="w-full bg-[#FAC000] text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors shadow-lg active:scale-95 cursor-pointer"
            >
              Reset Configuration & Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
