// Chatbot Widget Script Loader
// This script can be included in any website to embed the chatbot

interface ChatbotConfig {
  chatbotId?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  primaryColor?: string;
  title?: string;
  welcomeMessage?: string;
  placeholder?: string;
  poweredByText?: string;
  apiEndpoint?: string;
  apiKey?: string;
}

interface ChatbotWidget {
  init: (config?: ChatbotConfig) => void;
  open: () => void;
  close: () => void;
  sendMessage: (message: string) => void;
  destroy: () => void;
}

declare global {
  interface Window {
    ChatbotWidget?: ChatbotWidget;
    chatbotWidget?: any;
  }
}

class ChatbotScriptLoader {
  private widget: any = null;
  private config: ChatbotConfig = {};
  private container: HTMLElement | null = null;

  constructor() {
    this.init();
  }

  private init() {
    // Create global function for initialization
    window.ChatbotWidget = {
      init: (config?: ChatbotConfig) => this.initializeWidget(config),
      open: () => this.openWidget(),
      close: () => this.closeWidget(),
      sendMessage: (message: string) => this.sendMessage(message),
      destroy: () => this.destroyWidget()
    };

    // Auto-initialize if config is provided via data attributes
    this.autoInitialize();
  }

  private autoInitialize() {
    const script = document.currentScript as HTMLScriptElement;
    if (script) {
      const config: ChatbotConfig = {};
      
      // Read configuration from script data attributes
      config.chatbotId = script.getAttribute('data-chatbot-id') || 'default';
      config.position = (script.getAttribute('data-position') as any) || 'bottom-right';
      config.primaryColor = script.getAttribute('data-primary-color') || '#000000';
      config.title = script.getAttribute('data-title') || 'Chat Support';
      config.welcomeMessage = script.getAttribute('data-welcome-message') || 'Hi! How can I help you today?';
      config.placeholder = script.getAttribute('data-placeholder') || 'Type your message...';
      config.poweredByText = script.getAttribute('data-powered-by') || 'Powered by ChatBase';
      config.apiEndpoint = script.getAttribute('data-api-endpoint') || undefined;
      config.apiKey = script.getAttribute('data-api-key') || undefined;

      if (Object.keys(config).length > 0) {
        this.initializeWidget(config);
      }
    }
  }

  private async initializeWidget(config?: ChatbotConfig) {
    if (this.widget) {
      console.warn('Chatbot widget is already initialized');
      return;
    }

    this.config = { ...this.getDefaultConfig(), ...config };

    try {
      // Load React and ReactDOM if not already loaded
      await this.loadDependencies();

      // Create container for the widget
      this.container = document.createElement('div');
      this.container.id = 'chatbot-widget-container';
      document.body.appendChild(this.container);

      // Load the widget component
      await this.loadWidget();

      console.log('Chatbot widget initialized successfully');
    } catch (error) {
      console.error('Failed to initialize chatbot widget:', error);
    }
  }

  private getDefaultConfig(): ChatbotConfig {
    return {
      chatbotId: 'default',
      position: 'bottom-right',
      primaryColor: '#000000',
      title: 'Chat Support',
      welcomeMessage: 'Hi! How can I help you today?',
      placeholder: 'Type your message...',
      poweredByText: 'Powered by ChatBase'
    };
  }

  private async loadDependencies() {
    // Check if React is already loaded
    if (window.React && window.ReactDOM) {
      return;
    }

    // Load React and ReactDOM from CDN
    await this.loadScript('https://unpkg.com/react@18/umd/react.production.min.js');
    await this.loadScript('https://unpkg.com/react-dom@18/umd/react-dom.production.min.js');
    
    // Load Lucide React for icons
    await this.loadScript('https://unpkg.com/lucide@latest/dist/umd/lucide.js');
  }

  private async loadWidget() {
    // In a real implementation, you would load the compiled widget
    // For now, we'll create a simple widget implementation
    this.createSimpleWidget();
  }

  private createSimpleWidget() {
    if (!this.container) return;

    // Create a simple widget using vanilla JavaScript
    const widgetHTML = `
      <div id="chatbot-widget" style="
        position: fixed;
        ${this.config.position?.includes('bottom') ? 'bottom: 16px;' : 'top: 16px;'}
        ${this.config.position?.includes('right') ? 'right: 16px;' : 'left: 16px;'}
        width: 350px;
        height: 500px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        border: 1px solid #e5e7eb;
        display: none;
        flex-direction: column;
        z-index: 9999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      ">
        <div style="
          padding: 16px;
          border-bottom: 1px solid #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: ${this.config.primaryColor};
          color: white;
          border-radius: 12px 12px 0 0;
        ">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 8px; height: 8px; border-radius: 50%; background: #10b981;"></div>
            <h3 style="font-size: 14px; font-weight: 600; margin: 0;">${this.config.title}</h3>
          </div>
          <button id="chatbot-close" style="
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            font-size: 16px;
          ">✕</button>
        </div>
        
        <div id="chatbot-messages" style="
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        ">
          <div style="
            display: flex;
            justify-content: flex-start;
          ">
            <div style="
              max-width: 80%;
              padding: 8px 12px;
              border-radius: 12px 12px 12px 4px;
              background-color: #f3f4f6;
              color: #374151;
              font-size: 14px;
              line-height: 1.4;
            ">${this.config.welcomeMessage}</div>
          </div>
        </div>
        
        <div style="
          padding: 16px;
          border-top: 1px solid #f3f4f6;
          display: flex;
          align-items: center;
          gap: 8px;
        ">
          <input id="chatbot-input" type="text" placeholder="${this.config.placeholder}" style="
            flex: 1;
            padding: 8px 12px;
            border: 1px solid #d1d5db;
            border-radius: 20px;
            font-size: 14px;
            outline: none;
            background-color: #f9fafb;
          ">
          <button id="chatbot-send" style="
            background: ${this.config.primaryColor};
            border: none;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: white;
            font-size: 14px;
          ">➤</button>
        </div>
        
        <div style="
          padding: 8px 16px;
          background-color: #fafafa;
          border-top: 1px solid #f3f4f6;
          text-align: center;
          border-radius: 0 0 12px 12px;
        ">
          <p style="font-size: 11px; color: #6b7280; margin: 0;">🤖 ${this.config.poweredByText}</p>
        </div>
      </div>
      
      <button id="chatbot-toggle" style="
        position: fixed;
        ${this.config.position?.includes('bottom') ? 'bottom: 16px;' : 'top: 16px;'}
        ${this.config.position?.includes('right') ? 'right: 16px;' : 'left: 16px;'}
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background-color: ${this.config.primaryColor};
        border: none;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        transition: transform 0.2s ease;
        z-index: 9998;
        font-size: 24px;
      ">💬</button>
    `;

    this.container.innerHTML = widgetHTML;
    this.attachEventListeners();
  }

  private attachEventListeners() {
    const toggleBtn = document.getElementById('chatbot-toggle');
    const closeBtn = document.getElementById('chatbot-close');
    const sendBtn = document.getElementById('chatbot-send');
    const input = document.getElementById('chatbot-input') as HTMLInputElement;

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggleWidget());
      toggleBtn.addEventListener('mouseenter', () => {
        toggleBtn.style.transform = 'scale(1.1)';
      });
      toggleBtn.addEventListener('mouseleave', () => {
        toggleBtn.style.transform = 'scale(1)';
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeWidget());
    }

    if (sendBtn && input) {
      sendBtn.addEventListener('click', () => this.handleSendMessage());
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.handleSendMessage();
        }
      });
    }
  }

  private toggleWidget() {
    const widget = document.getElementById('chatbot-widget');
    if (widget) {
      const isVisible = widget.style.display === 'flex';
      widget.style.display = isVisible ? 'none' : 'flex';
      
      if (!isVisible) {
        const input = document.getElementById('chatbot-input') as HTMLInputElement;
        if (input) input.focus();
      }
    }
  }

  private openWidget() {
    const widget = document.getElementById('chatbot-widget');
    if (widget) {
      widget.style.display = 'flex';
      const input = document.getElementById('chatbot-input') as HTMLInputElement;
      if (input) input.focus();
    }
  }

  private closeWidget() {
    const widget = document.getElementById('chatbot-widget');
    if (widget) {
      widget.style.display = 'none';
    }
  }

  private handleSendMessage() {
    const input = document.getElementById('chatbot-input') as HTMLInputElement;
    const messagesContainer = document.getElementById('chatbot-messages');
    
    if (input && input.value.trim() && messagesContainer) {
      const message = input.value.trim();
      
      // Add user message
      const userMessageDiv = document.createElement('div');
      userMessageDiv.style.cssText = 'display: flex; justify-content: flex-end;';
      userMessageDiv.innerHTML = `
        <div style="
          max-width: 80%;
          padding: 8px 12px;
          border-radius: 12px 12px 4px 12px;
          background-color: ${this.config.primaryColor};
          color: white;
          font-size: 14px;
          line-height: 1.4;
        ">${message}</div>
      `;
      messagesContainer.appendChild(userMessageDiv);
      
      // Clear input
      input.value = '';
      
      // Simulate AI response
      setTimeout(() => {
        const aiMessageDiv = document.createElement('div');
        aiMessageDiv.style.cssText = 'display: flex; justify-content: flex-start;';
        aiMessageDiv.innerHTML = `
          <div style="
            max-width: 80%;
            padding: 8px 12px;
            border-radius: 12px 12px 12px 4px;
            background-color: #f3f4f6;
            color: #374151;
            font-size: 14px;
            line-height: 1.4;
          ">Thanks for your message: "${message}". This is a demo response.</div>
        `;
        messagesContainer.appendChild(aiMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }, 1000);
      
      // Scroll to bottom
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  private sendMessage(message: string) {
    // Programmatic message sending
    console.log('Sending message:', message);
  }

  private destroyWidget() {
    if (this.container) {
      this.container.remove();
      this.container = null;
      this.widget = null;
    }
  }

  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  }
}

// Initialize the script loader
new ChatbotScriptLoader();

// Export for module systems
 