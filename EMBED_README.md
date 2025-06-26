# Chatbot Widget Embed Documentation

## Overview
This document explains how to create, build, and deploy an embeddable chatbot widget that can be added to any website via a simple script tag, similar to Chatbase.

## Table of Contents
1. [Project Structure](#project-structure)
2. [Step-by-Step Process](#step-by-step-process)
3. [Building the Widget](#building-the-widget)
4. [Deployment Process](#deployment-process)
5. [Usage Instructions](#usage-instructions)
6. [Troubleshooting](#troubleshooting)

## Project Structure

```
chatbase-clone/
├── src/
│   ├── embed/
│   │   └── simple-widget.js          # Pure JS widget (no dependencies)
│   └── pages/
│       └── ChatbotWidget.tsx         # React demo page
├── public/
│   ├── chatbot-widget-simple.js      # Built widget (copied from dist)
│   └── test-simple-widget.html       # Test page
├── dist/
│   └── embed/
│       └── chatbot-widget.iife.js    # Built widget (IIFE format)
├── vite.simple.config.ts             # Build config for simple widget
└── EMBED_README.md                   # This documentation
```

## Step-by-Step Process

### Step 1: Create the Widget Source Code

**Location:** `src/embed/simple-widget.js`

**What it contains:**
- Pure JavaScript widget with no external dependencies
- Self-contained CSS styles
- Event handlers for user interactions
- Configuration options via data attributes or JavaScript

**Key Features:**
- No React or external library dependencies
- Works in any browser environment
- Customizable colors, position, and messages
- Programmatic control methods

### Step 2: Create Build Configuration

**Location:** `vite.simple.config.ts`

**Purpose:**
- Configure Vite to build the widget as an IIFE (Immediately Invoked Function Expression)
- Bundle all code into a single file
- Optimize and minify the output
- Ensure compatibility across different websites

**Configuration includes:**
- Entry point: `src/embed/simple-widget.js`
- Output format: IIFE
- Minification with Terser
- Output directory: `dist/embed/`

### Step 3: Build the Widget

**Command:**
```bash
npm run build:simple
```

**What happens:**
1. Vite reads the `vite.simple.config.ts` configuration
2. Processes the `src/embed/simple-widget.js` file
3. Bundles and minifies the code
4. Creates `dist/embed/chatbot-widget.iife.js`

**Output:**
- Single JavaScript file with all functionality
- Minified for optimal performance
- IIFE format for immediate execution
- No external dependencies

### Step 4: Copy to Public Folder

**Manual Step:**
Copy `dist/embed/chatbot-widget.iife.js` to `public/chatbot-widget-simple.js`

**Why this step:**
- Vercel serves files from the `public/` folder
- Makes the widget accessible at the deployed URL
- Allows direct linking from external websites

**File locations:**
- Source: `dist/embed/chatbot-widget.iife.js`
- Destination: `public/chatbot-widget-simple.js`

### Step 5: Deploy to Vercel

**Command:**
```bash
vercel --prod
```

**What happens:**
1. Vercel builds the entire project
2. Serves static files from `public/` folder
3. Makes `chatbot-widget-simple.js` available at:
   `https://your-domain.vercel.app/chatbot-widget-simple.js`

### Step 6: Test the Widget

**Test locally:**
- Open `public/test-simple-widget.html` in browser
- Verify widget appears and functions correctly

**Test deployed:**
- Visit `https://your-domain.vercel.app/test-simple-widget.html`
- Confirm widget works on live site

## Building the Widget

### Prerequisites
```bash
npm install terser --save-dev
```

### Build Commands

**Add to package.json:**
```json
{
  "scripts": {
    "build:simple": "vite build --config vite.simple.config.ts"
  }
}
```

**Build process:**
1. Run `npm run build:simple`
2. Check `dist/embed/chatbot-widget.iife.js` is created
3. Copy file to `public/chatbot-widget-simple.js`
4. Deploy to Vercel

### Build Configuration Details

**vite.simple.config.ts:**
```typescript
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/embed/simple-widget.js',
      name: 'ChatbotWidget',
      formats: ['iife'],
      fileName: () => 'chatbot-widget.iife.js'
    },
    outDir: 'dist/embed',
    minify: 'terser',
    rollupOptions: {
      output: {
        extend: true,
        globals: {}
      }
    }
  }
});
```

## Deployment Process

### 1. Local Development
```bash
# Build the widget
npm run build:simple

# Copy to public folder
cp dist/embed/chatbot-widget.iife.js public/chatbot-widget-simple.js

# Test locally
npm run dev
```

### 2. Production Deployment
```bash
# Deploy to Vercel
vercel --prod

# Verify deployment
curl https://your-domain.vercel.app/chatbot-widget-simple.js
```

### 3. Post-Deployment Verification
- Check widget loads: `https://your-domain.vercel.app/chatbot-widget-simple.js`
- Test embed functionality on external site
- Verify all configuration options work

## Usage Instructions

### Basic Implementation
```html
<script src="https://your-domain.vercel.app/chatbot-widget-simple.js"></script>
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
<script src="https://your-domain.vercel.app/chatbot-widget-simple.js"></script>
<script>
  ChatbotWidget.init({
    chatbotId: 'custom',
    position: 'bottom-left',
    primaryColor: '#10b981',
    title: 'AI Assistant',
    welcomeMessage: 'Hi! I\'m your AI assistant. How can I help?',
    placeholder: 'Ask me anything...',
    poweredByText: 'Powered by Your Brand'
  });
</script>
```

### Data Attributes Method
```html
<script 
  src="https://your-domain.vercel.app/chatbot-widget-simple.js"
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

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `chatbotId` | string | 'default' | Unique identifier for the chatbot |
| `position` | string | 'bottom-right' | Widget position: 'bottom-right', 'bottom-left', 'top-right', 'top-left' |
| `primaryColor` | string | '#000000' | Primary color for buttons and user messages |
| `title` | string | 'Chat Support' | Header title of the chat widget |
| `welcomeMessage` | string | 'Hi! How can I help you today?' | Initial message shown to users |
| `placeholder` | string | 'Type your message...' | Input placeholder text |
| `poweredByText` | string | 'Powered by ChatBase' | Footer branding text |

## Troubleshooting

### Common Issues

**1. Widget doesn't appear**
- Check script URL is correct
- Verify `ChatbotWidget.init()` is called
- Check browser console for errors

**2. Widget appears but doesn't open**
- Ensure no CSS conflicts with z-index
- Check for JavaScript errors in console
- Verify event listeners are attached

**3. Styling issues**
- Widget uses inline styles to avoid conflicts
- Check for CSS that might override widget styles
- Verify primaryColor is a valid hex code

**4. Build errors**
- Ensure terser is installed: `npm install terser --save-dev`
- Check vite.simple.config.ts syntax
- Verify entry file path is correct

### Debug Steps

1. **Check browser console** for JavaScript errors
2. **Verify script loading** in Network tab
3. **Test with minimal configuration** first
4. **Check for CSS conflicts** with existing site styles
5. **Verify deployment** by accessing script URL directly

### Performance Optimization

- Widget is minified and optimized
- No external dependencies reduce load time
- Inline styles prevent CSS conflicts
- Event delegation for better performance

## File Locations Summary

| File | Purpose | Location |
|------|---------|----------|
| Widget Source | Pure JS implementation | `src/embed/simple-widget.js` |
| Build Config | Vite configuration | `vite.simple.config.ts` |
| Built Widget | Production-ready file | `dist/embed/chatbot-widget.iife.js` |
| Public Widget | Deployed version | `public/chatbot-widget-simple.js` |
| Test Page | Local testing | `public/test-simple-widget.html` |
| Demo Page | React demo | `src/pages/ChatbotWidget.tsx` |

## Quick Start Checklist

- [ ] Create `src/embed/simple-widget.js`
- [ ] Create `vite.simple.config.ts`
- [ ] Add build script to `package.json`
- [ ] Install terser: `npm install terser --save-dev`
- [ ] Build widget: `npm run build:simple`
- [ ] Copy to public: `cp dist/embed/chatbot-widget.iife.js public/chatbot-widget-simple.js`
- [ ] Deploy: `vercel --prod`
- [ ] Test: Visit deployed test page
- [ ] Embed on external site

## Complete Workflow Example

### 1. Development Phase
```bash
# Create the widget source file
touch src/embed/simple-widget.js

# Create build configuration
touch vite.simple.config.ts

# Install dependencies
npm install terser --save-dev

# Add build script to package.json
# "build:simple": "vite build --config vite.simple.config.ts"
```

### 2. Building Phase
```bash
# Build the widget
npm run build:simple

# Verify build output
ls dist/embed/
# Should see: chatbot-widget.iife.js

# Copy to public folder
cp dist/embed/chatbot-widget.iife.js public/chatbot-widget-simple.js
```

### 3. Testing Phase
```bash
# Test locally
npm run dev
# Visit: http://localhost:5173/test-simple-widget.html
```

### 4. Deployment Phase
```bash
# Deploy to Vercel
vercel --prod

# Verify deployment
curl https://your-domain.vercel.app/chatbot-widget-simple.js
```

### 5. Integration Phase
```html
<!-- Add to any website -->
<script src="https://your-domain.vercel.app/chatbot-widget-simple.js"></script>
<script>
  ChatbotWidget.init({
    position: 'bottom-right',
    primaryColor: '#3b82f6',
    title: 'Support Chat'
  });
</script>
```

This documentation provides a complete guide for creating, building, and deploying an embeddable chatbot widget that works reliably across different websites. 