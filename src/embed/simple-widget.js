(function() {
    'use strict';

    class SimpleChatbotWidget {
        constructor() {
            this.config = {};
            this.container = null;
            this.isOpen = false;
            this.messages = [];
            this.init();
        }

        init() {
            window.ChatbotWidget = {
                init: (config) => this.initializeWidget(config),
                open: () => this.openWidget(),
                close: () => this.closeWidget(),
                sendMessage: (message) => this.sendMessage(message),
                destroy: () => this.destroyWidget()
            };

            // Auto-initialize if config is provided via data attributes
            this.autoInitialize();
        }

        autoInitialize() {
            const script = document.currentScript;
            if (script) {
                const config = {};
                
                config.chatbotId = script.getAttribute('data-chatbot-id') || 'default';
                config.position = script.getAttribute('data-position') || 'bottom-right';
                config.primaryColor = script.getAttribute('data-primary-color') || '#000000';
                config.title = script.getAttribute('data-title') || 'Chat Supports';
                config.welcomeMessage = script.getAttribute('data-welcome-message') || 'Hi! How can I help you todays?';
                config.placeholder = script.getAttribute('data-placeholder') || 'Type your message...';
                config.poweredByText = script.getAttribute('data-powered-by') || 'Powered by ChatBase';

                if (Object.keys(config).length > 0) {
                    this.initializeWidget(config);
                }
            }
        }

        initializeWidget(config) {
            if (this.container) {
                console.warn('Chatbot widget is already initialized');
                return;
            }

            this.config = { ...this.getDefaultConfig(), ...config };

            try {
                this.createWidget();
                console.log('Chatbot widget initialized successfully');
            } catch (error) {
                console.error('Failed to initialize chatbot widget:', error);
            }
        }

        getDefaultConfig() {
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

        createWidget() {
            // Create container
            this.container = document.createElement('div');
            this.container.id = 'chatbot-widget-container';
            this.container.style.cssText = `
                position: fixed;
                z-index: 9999;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            `;
            document.body.appendChild(this.container);

            // Create widget HTML
            const widgetHTML = this.createWidgetHTML();
            this.container.innerHTML = widgetHTML;

            // Add initial message
            this.addMessage(this.config.welcomeMessage, false);

            // Attach event listeners
            this.attachEventListeners();
        }

        createWidgetHTML() {
            const position = this.config.position;
            const isBottom = position.includes('bottom');
            const isRight = position.includes('right');

            return `
                <div id="chatbot-widget" style="
                    position: fixed;
                    ${isBottom ? 'bottom: 16px;' : 'top: 16px;'}
                    ${isRight ? 'right: 16px;' : 'left: 16px;'}
                    width: 350px;
                    height: 500px;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                    border: 1px solid #e5e7eb;
                    display: none;
                    flex-direction: column;
                    z-index: 9999;
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
                    ${isBottom ? 'bottom: 16px;' : 'top: 16px;'}
                    ${isRight ? 'right: 16px;' : 'left: 16px;'}
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
        }

        attachEventListeners() {
            const toggleBtn = document.getElementById('chatbot-toggle');
            const closeBtn = document.getElementById('chatbot-close');
            const sendBtn = document.getElementById('chatbot-send');
            const input = document.getElementById('chatbot-input');

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

        toggleWidget() {
            const widget = document.getElementById('chatbot-widget');
            if (widget) {
                this.isOpen = !this.isOpen;
                widget.style.display = this.isOpen ? 'flex' : 'none';
                
                if (this.isOpen) {
                    const input = document.getElementById('chatbot-input');
                    if (input) input.focus();
                }
            }
        }

        openWidget() {
            const widget = document.getElementById('chatbot-widget');
            if (widget) {
                this.isOpen = true;
                widget.style.display = 'flex';
                const input = document.getElementById('chatbot-input');
                if (input) input.focus();
            }
        }

        closeWidget() {
            const widget = document.getElementById('chatbot-widget');
            if (widget) {
                this.isOpen = false;
                widget.style.display = 'none';
            }
        }

        handleSendMessage() {
            const input = document.getElementById('chatbot-input');
            const message = input.value.trim();
            
            if (message) {
                // Add user message
                this.addMessage(message, true);
                input.value = '';

                // Simulate AI response
                setTimeout(() => {
                    this.addMessage(`Thanks for your message: "${message}". This is a demo response.`, false);
                }, 1000);
            }
        }

        addMessage(text, isUser) {
            const messagesContainer = document.getElementById('chatbot-messages');
            if (!messagesContainer) return;

            const messageDiv = document.createElement('div');
            messageDiv.style.cssText = `
                display: flex;
                justify-content: ${isUser ? 'flex-end' : 'flex-start'};
            `;

            messageDiv.innerHTML = `
                <div style="
                    max-width: 80%;
                    padding: 8px 12px;
                    border-radius: ${isUser ? '12px 12px 4px 12px' : '12px 12px 12px 4px'};
                    background-color: ${isUser ? this.config.primaryColor : '#f3f4f6'};
                    color: ${isUser ? 'white' : '#374151'};
                    font-size: 14px;
                    line-height: 1.4;
                ">${text}</div>
            `;

            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        sendMessage(message) {
            console.log('Sending message:', message);
            this.addMessage(message, true);
        }

        destroyWidget() {
            if (this.container) {
                this.container.remove();
                this.container = null;
            }
        }
    }

    // Initialize the widget
    new SimpleChatbotWidget();
})(); 