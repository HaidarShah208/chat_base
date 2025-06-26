import React, { useState, useEffect, useRef } from 'react';
import { Send, X, MessageCircle, RefreshCw } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotWidgetProps {
  chatbotId?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  primaryColor?: string;
  title?: string;
  welcomeMessage?: string;
  placeholder?: string;
  poweredByText?: string;
  onMessageSend?: (message: string) => void;
  onWidgetOpen?: () => void;
  onWidgetClose?: () => void;
}

const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  chatbotId = 'default',
  position = 'bottom-right',
  primaryColor = '#000000',
  title = 'Chat Support',
  welcomeMessage = 'Hi! How can I help you today?',
  placeholder = 'Type your message...',
  poweredByText = 'Powered by ChatBase',
  onMessageSend,
  onWidgetOpen,
  onWidgetClose
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: welcomeMessage,
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    if (onMessageSend) {
      onMessageSend(inputValue);
    }

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        text: `Thanks for your message: "${inputValue}". This is a demo response.`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleWidget = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (newState) {
      onWidgetOpen?.();
    } else {
      onWidgetClose?.();
    }
  };

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4'
  };

  const widgetClasses = positionClasses[position];

  return (
    <div className="chatbot-widget-container" style={{ position: 'fixed', zIndex: 9999 }}>
      {isOpen && (
        <div 
          className={`chatbot-widget ${widgetClasses}`}
          style={{
            position: 'fixed',
            width: '350px',
            height: '500px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid #e5e7eb'
          }}
        >
          <div 
            className="chatbot-header"
            style={{
              padding: '16px',
              borderBottom: '1px solid #f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: primaryColor,
              color: 'white'
            }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <h3 style={{ fontSize: '14px', fontWeight: '600', margin: 0 }}>{title}</h3>
            </div>
            <button
              onClick={toggleWidget}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px'
              }}
            >
              <X size={16} />
            </button>
          </div>

          <div 
            className="chatbot-messages"
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.isUser ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '8px 12px',
                    borderRadius: message.isUser ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                    backgroundColor: message.isUser ? primaryColor : '#f3f4f6',
                    color: message.isUser ? 'white' : '#374151',
                    fontSize: '14px',
                    lineHeight: '1.4'
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  style={{
                    padding: '8px 12px',
                    borderRadius: '12px 12px 12px 4px',
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <RefreshCw size={12} style={{ animation: 'spin 1s linear infinite' }} />
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div 
            className="chatbot-input"
            style={{
              padding: '16px',
              borderTop: '1px solid #f3f4f6',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              disabled={isLoading}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '20px',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: '#f9fafb'
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              style={{
                background: primaryColor,
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: inputValue.trim() && !isLoading ? 'pointer' : 'not-allowed',
                opacity: inputValue.trim() && !isLoading ? 1 : 0.5,
                color: 'white'
              }}
            >
              <Send size={14} />
            </button>
          </div>

          <div 
            className="chatbot-footer"
            style={{
              padding: '8px 16px',
              backgroundColor: '#fafafa',
              borderTop: '1px solid #f3f4f6',
              textAlign: 'center'
            }}
          >
            <p style={{ fontSize: '11px', color: '#6b7280', margin: 0 }}>
              🤖 {poweredByText}
            </p>
          </div>
        </div>
      )}

      <button
        onClick={toggleWidget}
        className={`chatbot-toggle ${widgetClasses}`}
        style={{
          position: 'fixed',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: primaryColor,
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <MessageCircle size={24} />
      </button>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .chatbot-widget-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .chatbot-messages::-webkit-scrollbar {
          width: 4px;
        }
        
        .chatbot-messages::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .chatbot-messages::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 2px;
        }
        
        .chatbot-messages::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
};

export default ChatbotWidget; 