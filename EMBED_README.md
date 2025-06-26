# 🤖 Chatbot Widget Embed

This is the embeddable chatbot widget for your ChatBase clone. It allows you to easily add a chatbot to any website with just a few lines of code.

## 🚀 Quick Start

### 1. Build the Widget

First, build the embeddable widget:

```bash
npm run build:embed
```

This will create the widget files in the `dist/embed/` directory.

### 2. Host the Files

Upload the following files to your web server:
- `dist/embed/chatbot-widget.iife.js` - The main widget script
- `dist/embed/chatbot-widget.es.js` - ES module version (optional)

### 3. Embed in Your Website

Add this script tag to your HTML:

```html
<script src="https://your-domain.com/chatbot-widget.iife.js"></script>
<script>
  ChatbotWidget.init({
    chatbotId: 'your-chatbot-id',
    position: 'bottom-right',
    primaryColor: '#3b82f6',
    title: 'Support Chat',
    welcomeMessage: 'Hello! How can I help you today?'
  });
</script>
```

## 📋 Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `chatbotId` | string | `'default'` | Unique identifier for the chatbot |
| `position` | string | `'bottom-right'` | Widget position: `'bottom-right'`, `'bottom-left'`, `'top-right'`, `'top-left'` |
| `primaryColor` | string | `'#000000'` | Primary color for the widget (hex, rgb, or named color) |
| `title` | string | `'Chat Support'` | Title displayed in the widget header |
| `welcomeMessage` | string | `'Hi! How can I help you today?'` | Initial message shown to users |
| `placeholder` | string | `'Type your message...'` | Input placeholder text |
| `poweredByText` | string | `'Powered by ChatBase'` | Text shown in the footer |
| `apiEndpoint` | string | `undefined` | Your API endpoint for handling messages |
| `apiKey` | string | `undefined` | API key for authentication |

## 🔧 Advanced Usage

### Data Attributes Method

You can also configure the widget using data attributes on the script tag:

```html
<script 
  src="https://your-domain.com/chatbot-widget.iife.js"
  data-chatbot-id="demo"
  data-position="bottom-right"
  data-primary-color="#8b5cf6"
  data-title="Help Desk"
  data-welcome-message="Welcome! How can I assist you?"
  data-placeholder="Type your question..."
  data-powered-by="Your Company"
></script>
```

### Programmatic Control

Control the widget programmatically:

```javascript
// Open the widget
ChatbotWidget.open();

// Close the widget
ChatbotWidget.close();

// Send a message programmatically
ChatbotWidget.sendMessage('Hello from JavaScript!');

// Destroy the widget
ChatbotWidget.destroy();
```

### Custom Event Handlers

```javascript
ChatbotWidget.init({
  chatbotId: 'demo',
  onMessageSend: (message) => {
    console.log('User sent:', message);
    // Handle the message with your backend
  },
  onWidgetOpen: () => {
    console.log('Widget opened');
    // Track widget open event
  },
  onWidgetClose: () => {
    console.log('Widget closed');
    // Track widget close event
  }
});
```

## 🎨 Customization

### Styling

The widget uses inline styles to avoid conflicts with your website's CSS. You can customize the appearance by modifying the `primaryColor` and other configuration options.

### Custom CSS (Advanced)

If you need more advanced styling, you can override the widget styles:

```css
/* Custom styles for the chatbot widget */
#chatbot-widget {
  /* Your custom styles */
}

#chatbot-toggle {
  /* Custom toggle button styles */
}
```

## 🔌 API Integration

### Backend Integration

To connect the widget to your backend API:

```javascript
ChatbotWidget.init({
  apiEndpoint: 'https://your-api.com/chat',
  apiKey: 'your-api-key',
  onMessageSend: async (message) => {
    try {
      const response = await fetch('https://your-api.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          message,
          chatbotId: 'your-chatbot-id',
          userId: 'user-session-id'
        })
      });
      
      const data = await response.json();
      // Handle the response
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
});
```

### Message Format

The widget expects messages in this format:

```javascript
{
  id: number,
  text: string,
  isUser: boolean,
  timestamp: Date
}
```

## 📱 Responsive Design

The widget is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🔒 Security

### API Key Security

Never expose your API keys in client-side code. Use server-side authentication:

```javascript
// Server-side (Node.js example)
app.post('/chat', async (req, res) => {
  const { message, chatbotId, userId } = req.body;
  const apiKey = req.headers.authorization?.split(' ')[1];
  
  // Verify API key
  if (!isValidApiKey(apiKey)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  // Process message
  const response = await processMessage(message, chatbotId, userId);
  res.json(response);
});
```

### CORS Configuration

Configure your server to allow requests from your domain:

```javascript
// CORS configuration
app.use(cors({
  origin: ['https://your-domain.com', 'https://www.your-domain.com'],
  credentials: true
}));
```

## 🚀 Deployment

### CDN Deployment

For better performance, deploy the widget to a CDN:

1. Upload files to your CDN (Cloudflare, AWS CloudFront, etc.)
2. Update the script src to use the CDN URL
3. Enable compression and caching

### Self-Hosted

For self-hosted deployment:

1. Build the widget: `npm run build:embed`
2. Upload `dist/embed/chatbot-widget.iife.js` to your server
3. Serve with proper caching headers

## 🧪 Testing

### Local Testing

Test the widget locally:

1. Build the widget: `npm run build:embed`
2. Serve the files: `npx serve dist/embed`
3. Open `embed-demo.html` in your browser

### Integration Testing

Test the widget on your website:

1. Add the script tag to your HTML
2. Configure with test settings
3. Test all functionality (open, close, send messages)
4. Test on different devices and browsers

## 📊 Analytics

### Event Tracking

Track widget usage with analytics:

```javascript
ChatbotWidget.init({
  onWidgetOpen: () => {
    // Google Analytics
    gtag('event', 'chatbot_open', {
      chatbot_id: 'your-chatbot-id'
    });
  },
  onMessageSend: (message) => {
    // Track message sent
    gtag('event', 'chatbot_message_sent', {
      chatbot_id: 'your-chatbot-id',
      message_length: message.length
    });
  }
});
```

## 🐛 Troubleshooting

### Common Issues

1. **Widget not appearing**: Check if the script is loaded correctly
2. **Styling conflicts**: Ensure no CSS conflicts with your website
3. **API errors**: Check network tab for failed requests
4. **Mobile issues**: Test on actual mobile devices

### Debug Mode

Enable debug mode for troubleshooting:

```javascript
// Add this before initializing the widget
window.CHATBOT_DEBUG = true;

ChatbotWidget.init({
  // your config
});
```

## 📝 License

This embeddable widget is part of your ChatBase clone project. Make sure to comply with any licensing requirements for the libraries used.

## 🤝 Support

For support and questions:
1. Check the demo file: `embed-demo.html`
2. Review the configuration options
3. Test with the provided examples
4. Check the browser console for errors

---

**Happy embedding! 🚀** 