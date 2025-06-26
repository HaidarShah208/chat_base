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

// The actual widget component
const ChatbotWidgetComponent: React.FC<ChatbotWidgetProps> = ({
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

// The demo page component
const ChatbotWidget: React.FC = () => {
  const [selectedPosition, setSelectedPosition] = useState<'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'>('bottom-right');
  const [selectedColor, setSelectedColor] = useState('#3b82f6');
  const [customTitle, setCustomTitle] = useState('Support Chat');

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          color: '#333', 
          marginBottom: '30px',
          fontSize: '2.5rem',
          fontWeight: 'bold'
        }}>
          🤖 Chatbot Widget Demo
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Configuration Panel */}
          <div style={{
            background: '#f9fafb',
            padding: '24px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{ color: '#374151', marginTop: 0, marginBottom: '20px' }}>
              Widget Configuration
            </h2>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Position:
              </label>
              <select 
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="top-right">Top Right</option>
                <option value="top-left">Top Left</option>
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Primary Color:
              </label>
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                style={{
                  width: '100%',
                  height: '40px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Title:
              </label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{
              background: '#dbeafe',
              padding: '16px',
              borderRadius: '6px',
              border: '1px solid #93c5fd'
            }}>
              <h3 style={{ margin: '0 0 12px 0', color: '#1e40af' }}>How to Use:</h3>
              <p style={{ margin: 0, color: '#1e40af', fontSize: '14px' }}>
                1. Configure the widget settings above<br/>
                2. Click the chat button in the bottom-right corner<br/>
                3. Try sending a message to see the demo response
              </p>
            </div>
          </div>

          {/* Preview Area */}
          <div style={{
            background: '#f9fafb',
            padding: '24px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            minHeight: '400px',
            position: 'relative'
          }}>
            <h2 style={{ color: '#374151', marginTop: 0, marginBottom: '20px' }}>
              Preview Area
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>
              This is a simulated website area. The chatbot widget will appear as a floating button.
            </p>
            
            <div style={{
              background: 'white',
              border: '2px dashed #d1d5db',
              borderRadius: '8px',
              padding: '40px',
              textAlign: 'center',
              color: '#6b7280'
            }}>
              <h3 style={{ margin: '0 0 12px 0' }}>Your Website Content</h3>
              <p style={{ margin: 0 }}>
                This is where your website content would go. The chatbot widget will float over this content.
              </p>
            </div>
          </div>
        </div>

        {/* Integration Code */}
        <div style={{
          background: '#1f2937',
          color: '#f9fafb',
          padding: '24px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h3 style={{ margin: '0 0 16px 0', color: '#fbbf24' }}>
            Integration Code:
          </h3>
          <pre style={{
            margin: 0,
            fontSize: '14px',
            lineHeight: '1.5',
            overflowX: 'auto'
          }}>
{`<script src="https://your-domain.com/chatbot-widget.iife.js"></script>
<script>
  ChatbotWidget.init({
    chatbotId: 'demo',
    position: '${selectedPosition}',
    primaryColor: '${selectedColor}',
    title: '${customTitle}',
    welcomeMessage: 'Hello! How can I help you today?'
  });
</script>`}
          </pre>
        </div>

        {/* Features */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          <div style={{
            background: '#f9fafb',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ color: '#374151', marginTop: 0 }}>🎨 Customizable</h3>
            <p style={{ color: '#6b7280', marginBottom: 0 }}>
              Change colors, position, and messages to match your brand.
            </p>
          </div>
          <div style={{
            background: '#f9fafb',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ color: '#374151', marginTop: 0 }}>📱 Responsive</h3>
            <p style={{ color: '#6b7280', marginBottom: 0 }}>
              Works perfectly on desktop, tablet, and mobile devices.
            </p>
          </div>
          <div style={{
            background: '#f9fafb',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ color: '#374151', marginTop: 0 }}>⚡ Lightweight</h3>
            <p style={{ color: '#6b7280', marginBottom: 0 }}>
              Minimal footprint with no external dependencies required.
            </p>
          </div>
        </div>
      </div>

      {/* The actual widget */}
      <ChatbotWidgetComponent
        position={selectedPosition}
        primaryColor={selectedColor}
        title={customTitle}
        welcomeMessage="Welcome to the demo! This is how the chatbot widget looks and works."
        placeholder="Ask me anything..."
        poweredByText="ChatBase Clone"
        onMessageSend={(message) => {
          console.log('Message sent:', message);
        }}
        onWidgetOpen={() => {
          console.log('Widget opened');
        }}
        onWidgetClose={() => {
          console.log('Widget closed');
        }}
      />
    </div>
  );
};

export default ChatbotWidget; 