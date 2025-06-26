# 🚀 Chatbot Widget Deployment Guide

This guide will help you deploy your embeddable chatbot widget so it can be used on other websites.

## 📦 What You Have

After running `npm run build:embed`, you have:

- `dist/embed/chatbot-widget.iife.js` - The main widget script (9.3KB)
- `test-embed.html` - Test page to verify the widget works

## 🌐 Deployment Options

### Option 1: Local Testing

1. **Serve the files locally:**
   ```bash
   npx serve dist/embed
   ```

2. **Open the test page:**
   ```
   http://localhost:3000/test-embed.html
   ```

### Option 2: GitHub Pages (Free)

1. **Create a new repository** for your widget
2. **Upload the files:**
   - `dist/embed/chatbot-widget.iife.js`
   - `test-embed.html` (rename to `index.html`)
3. **Enable GitHub Pages** in repository settings
4. **Your widget will be available at:**
   ```
   https://yourusername.github.io/repository-name/
   ```

### Option 3: Netlify (Free)

1. **Drag and drop** the `dist/embed` folder to [netlify.com](https://netlify.com)
2. **Your widget will be available at:**
   ```
   https://random-name.netlify.app
   ```

### Option 4: Vercel (Free)

1. **Create a new project** on [vercel.com](https://vercel.com)
2. **Upload the `dist/embed` folder**
3. **Your widget will be available at:**
   ```
   https://your-project.vercel.app
   ```

### Option 5: Your Own Server

1. **Upload `dist/embed/chatbot-widget.iife.js`** to your web server
2. **Make it accessible at:**
   ```
   https://yourdomain.com/chatbot-widget.iife.js
   ```

## 🔧 How to Use the Widget

### Basic Implementation

Add this to any website:

```html
<script src="https://your-domain.com/chatbot-widget.iife.js"></script>
<script>
  ChatbotWidget.init({
    chatbotId: 'demo',
    position: 'bottom-right',
    primaryColor: '#3b82f6',
    title: 'Support Chat',
    welcomeMessage: 'Hello! How can I help you today?'
  });
</script>
```

### Advanced Configuration

```html
<script src="https://your-domain.com/chatbot-widget.iife.js"></script>
<script>
  ChatbotWidget.init({
    chatbotId: 'custom',
    position: 'bottom-left',
    primaryColor: '#10b981',
    title: 'AI Assistant',
    welcomeMessage: 'Hi there! I\'m your AI assistant.',
    placeholder: 'Ask me anything...',
    poweredByText: 'Powered by Your Brand',
    onMessageSend: (message) => {
      console.log('User sent:', message);
      // Connect to your backend API here
    }
  });
</script>
```

### Data Attributes Method

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

## 🎯 Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `chatbotId` | string | `'default'` | Unique identifier for the chatbot |
| `position` | string | `'bottom-right'` | Widget position: `'bottom-right'`, `'bottom-left'`, `'top-right'`, `'top-left'` |
| `primaryColor` | string | `'#000000'` | Primary color for the widget |
| `title` | string | `'Chat Support'` | Title displayed in the widget header |
| `welcomeMessage` | string | `'Hi! How can I help you today?'` | Initial message shown to users |
| `placeholder` | string | `'Type your message...'` | Input placeholder text |
| `poweredByText` | string | `'Powered by ChatBase'` | Text shown in the footer |

## 🔌 API Integration

To connect to your backend:

```javascript
ChatbotWidget.init({
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

## 🧪 Testing

1. **Test locally first:**
   ```bash
   npm run build:embed
   npx serve dist/embed
   open http://localhost:3000/test-embed.html
   ```

2. **Test on different devices:**
   - Desktop
   - Tablet
   - Mobile

3. **Test on different browsers:**
   - Chrome
   - Firefox
   - Safari
   - Edge

## 📊 Analytics

Track widget usage:

```javascript
ChatbotWidget.init({
  onWidgetOpen: () => {
    // Google Analytics
    gtag('event', 'chatbot_open', {
      chatbot_id: 'your-chatbot-id'
    });
  },
  onMessageSend: (message) => {
    gtag('event', 'chatbot_message_sent', {
      chatbot_id: 'your-chatbot-id',
      message_length: message.length
    });
  }
});
```

## 🔒 Security

1. **Use HTTPS** for production deployment
2. **Implement CORS** on your backend
3. **Validate API keys** server-side
4. **Rate limit** API requests

## 🚀 Performance

1. **Enable compression** (gzip) on your server
2. **Set cache headers:**
   ```
   Cache-Control: public, max-age=31536000
   ```
3. **Use a CDN** for better global performance

## 📝 Example Websites

Here are some example websites where you can test your widget:

1. **Simple HTML page**
2. **WordPress site**
3. **React app**
4. **Vue.js app**
5. **Static site**

## 🆘 Troubleshooting

### Widget not appearing
- Check if the script is loaded correctly
- Check browser console for errors
- Verify the script URL is accessible

### Styling conflicts
- The widget uses inline styles to avoid conflicts
- Check for CSS conflicts with your website

### API errors
- Check network tab for failed requests
- Verify CORS configuration
- Check API endpoint and authentication

## 📞 Support

If you need help:
1. Check the browser console for errors
2. Test with the provided examples
3. Verify your deployment URL is accessible
4. Check that all files are uploaded correctly

---

**Happy deploying! 🚀** 