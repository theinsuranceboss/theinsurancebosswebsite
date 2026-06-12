import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import fs from 'fs';

// Custom plugin to intercept config saving in local development
function saveConfigPlugin() {
  return {
    name: 'save-config-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.method === 'POST' && req.url === '/api/save-config') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);

              // Strip slack webhook to prevent leakage and GitHub push protection failure
              if (data.chatbotSlackWebhook && data.chatbotSlackWebhook.includes('hooks.slack.com')) {
                data.chatbotSlackWebhook = '';
              }

              // Standard default HTML string for comparison
              const defaultHtml = "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  /* Contenedor principal centrado */\n  .boss-button-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 15px; /* Espacio moderado entre botones */\n    padding: 20px 10px;\n    width: 100%;\n    flex-wrap: wrap;\n    font-family: 'Arial', sans-serif;\n  }\n\n  .btn-boss-medium {\n    /* Fondo transparente y borde amarillo de 2px */\n    background-color: transparent;\n    border: 2px solid #FFD700;\n    color: #FFD700;\n    \n    /* Tamaño MEDIO */\n    padding: 12px 28px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    \n    /* Estética y suavidad */\n    border-radius: 6px;\n    transition: all 0.3s ease;\n    cursor: pointer;\n    min-width: 200px; /* Ancho consistente para ambos */\n  }\n\n  /* Efecto al pasar el mouse */\n  .btn-boss-medium:hover {\n    background-color: #FFD700;\n    color: #000000;\n    transform: translateY(-2px);\n    box-shadow: 0px 4px 10px rgba(255, 215, 0, 0.3);\n  }\n\n  /* Ajuste para móviles */\n  @media (max-width: 480px) {\n    .btn-boss-medium {\n      width: 90%;\n      min-width: unset;\n    }\n  }\n</style>\n</head>\n<body>\n\n  <div class=\"boss-button-container\">\n    <a href=\"https://theinsuranceboss.com/contact/\" class=\"btn-boss-medium\">\n      Speak with the boss\n    </a>\n\n    <a href=\"https://theinsuranceboss.com/get-an-auto-quote/\" class=\"btn-boss-medium\">\n      Get a Quote\n    </a>\n  </div>\n\n</body>\n</html>";

              let buttonsHtmlPlaceholder = false;
              if (data.buttonsHtml && data.buttonsHtml.trim() === defaultHtml.trim()) {
                buttonsHtmlPlaceholder = true;
                data.buttonsHtml = "__DEFAULT_BUTTONS_HTML_PLACEHOLDER__";
              }

              let jsonString = JSON.stringify(data, null, 2);
              if (buttonsHtmlPlaceholder) {
                jsonString = jsonString.replace(
                  '"buttonsHtml": "__DEFAULT_BUTTONS_HTML_PLACEHOLDER__"',
                  '"buttonsHtml": DEFAULT_BUTTONS_HTML'
                );
              }

              const configPath = path.resolve(__dirname, 'src/defaultConfig.ts');
              const fileContent = `import { WebsiteConfig } from "./types";
import { DEFAULT_BUTTONS_HTML } from "./subwebsiteHtml";

export const DEFAULT_CONFIG: WebsiteConfig = ${jsonString};
`;

              fs.writeFileSync(configPath, fileContent, 'utf-8');

              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true }));
            } catch (err: any) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
        } else {
          next();
        }
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), saveConfigPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      // Enable SPA fallback so clean URLs like /policy-review work on reload
      historyApiFallback: true,
    },
  };
});
