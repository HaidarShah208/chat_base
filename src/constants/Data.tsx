import { Globe,    Text, Settings, Users, Inbox, Code, Layers, Sparkles, Brush, Shield, Bell, Network, Globe2, CreditCard, Zap, Puzzle, FileText, Upload } from "lucide-react";
import type { NavLinkItem, PricingTier } from "../types/types";
import { Bold, Italic, Underline, Link, Undo, Redo, AlignLeft, AlignCenter, AlignRight } from "lucide-react"
import QnAIcon from "../../public/icons/svg/QnAIcon";
import NotionIcon from "../../public/icons/svg/Notion";
import PlansIcon from "../../public/icons/svg/PlansIcon";



  export const sidebarTabs = [
    { label: "Files", icon: <FileText className="w-5 h-5" />, route: "files" },
    { label: "Text", icon: <Text className="w-5 h-5" />, route: "text" },
    { label: "Website", icon: <Globe className="w-5 h-5" />, route: "website" },
    { label: "Q&A", icon: <QnAIcon className="w-5 h-5" />, route: "qna" },
    { label: "Notion", icon: <NotionIcon className="w-5 h-5" />, route: "notion" },
  ];

  export const settingsSidebarTabs = [
    { label: "General", icon: <Settings className="w-5 h-5" />, route: "general" },
    { label: "Members", icon: <Users className="w-5 h-5" />, route: "members" },
    { label: "Plans", icon: <PlansIcon />, route: "plans" },
    { label: "Billing", icon: <CreditCard className="w-5 h-5" />, route: "billing" },

  ];
  export const ChatbotSettingSidebarTabs = [
    { label: "General", icon: <Settings className="w-5 h-5" />, route: "general" },
    { label: "AI", icon: <Sparkles className="w-5 h-5" />, route: "ai" },
    { label: "Chat Interface", icon: <Brush className="w-5 h-5" />, route: "chat-interface" },
    { label: "Security", icon: <Shield className="w-5 h-5" />, route: "security" },
    { label: "Leads", icon: <Users className="w-5 h-5" />, route: "leads" },
    { label: "Notifications", icon: <Bell className="w-5 h-5" />, route: "notifications" },
    { label: "Webhooks", icon: <Network className="w-5 h-5" />, route: "webhooks" },
    { label: "Custom Domains", icon: <Globe2 className="w-5 h-5" />, route: "custom-domains" },
  ];

  export const connectSidebarTabs = [
    { label: "Embed", icon: <Code className="w-5 h-5" />, route: "embed" },
    { label: "Share", icon: <Upload className="w-5 h-5" />, route: "share" },
    { label: "Integrations", icon: <Layers className="w-5 h-5" />, route: "integrations" },
  ];

  export const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ]
  };
  
  export const formats = [
    'header',
    'bold', 'italic', 'strike',
    'list', 'bullet',
    'link', 'image'
  ];

  export const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ]

  export const agentNavLinks: NavLinkItem[] = [
    { 
      name: "Playground", 
      to: "/dashboard/chatbot/:id", 
      customActive: (pathname) => {
 
        const chatbotIdPattern = /^\/dashboard\/chatbot\/[^\/]+$/;
        return chatbotIdPattern.test(pathname);
      }
    },
    { 
      name: "Activity", 
      to: "/dashboard/chatbot/:id/activity", 
      customActive: (pathname) => pathname.includes("/activity") 
    },
    // { name: "Analytics", to: "/dashboard/chatbot/:id/analytics", customActive: (pathname) => pathname.includes("/analytics") },
    { 
      name: "Sources", 
      to: "/dashboard/chatbot/:id/sources/files", 
      customActive: (pathname) => pathname.includes("/sources") 
    },
    { 
      name: "Actions", 
      to: "/dashboard/chatbot/:id/actions", 
      customActive: (pathname) => pathname.includes("/actions") 
    },
    { 
      name: "Contacts", 
      to: "/dashboard/chatbot/:id/contacts", 
      customActive: (pathname) => pathname.includes("/contacts") 
    },
    { 
      name: "Connect", 
      to: "/dashboard/chatbot/:id/connect/embed", 
      customActive: (pathname) => pathname.includes("/connect") 
    },
    { 
      name: "Settings", 
      to: "/dashboard/chatbot/:id/settings/general", 
      customActive: (pathname) => pathname.includes("/settings") 
    },
  ];

  export const activityTabs = [
    { label: "Chat Logs", route: "chat-logs", icon: <Inbox className="w-5 h-5" /> },
    { label: "Leads", route: "leads", icon: <Users className="w-5 h-5" /> },
  ];
  export const integrationsPopoverList = [
    "Zapier",
    "Slack",
    "Wordpress",
    "WhatsApp",
    "Messenger",
    "Instagram",
  ];
  export const chatLogs = [
    {
      id: 1,
      message: "It seems like your message got cut ...",
      time: "3 hours ago",
      subtitle: "ad",
    },
    {
      id: 2,
      message: "It seems like your message might h...",
      time: "3 hours ago",
      subtitle: "asdfa",
    },
    {
      id: 3,
      message: "It seems like your message might h...",
      time: "6 hours ago",
      subtitle: "fasdfa",
    },
    {
      id: 4,
      message: 'The title of the "most expensive thi...',
      time: "7 hours ago",
      subtitle: "what is world expensive thing",
    },
  ];


  export const advancedModels = [
    "GPT-4.1",
    "GPT-4.1 Mini",
    "GPT-4.1 Nano",
    "GPT-4o",
    "o4 Mini",
    "o3",
    "o3 Mini",
    "GPT-4.5",
    "GPT-4 Turbo",
    "GPT-4",
    "Claude 4 Sonnet",
    "Claude 4 Opus",
    "Claude 3.7 Sonnet",
    "Claude 3.5 Sonnet",
    "Claude 3 Opus",
    "Gemini 1.5 Pro",
    "Gemini 2.0 Pro",
    "Gemini 2.5 Flash",
    "Grok 3",
    "Grok 3 Mini",
    "Command A",
    "Command R+",
    "Llama 4 Scout",
    "Llama 4 Maverick",
    "DeepSeek-V3",
    "DeepSeek-R1",
    
  ];
  export const pricingTiers: PricingTier[] = [
    {
      name: "Hobby",
      monthlyPrice: 40,
      yearlyPrice: 32,
      features: [
        { text: "Everything in Free +" },
        { text: "Access to advanced models", isLink: true },
        { text: "2,000 message credits/month" },
        { text: "1 AI agent" },
        { text: "5 AI Actions per AI agent" },
        { text: "33 MB per AI agent" },
        { text: "Unlimited links to train on" },
        { text: "API access" },
        { text: "Integrations", isLink: true },
        { text: "Basic analytics" },
      ],
    },
    {
      name: "Standard",
      monthlyPrice: 150,
      yearlyPrice: 120,
      isPopular: true,
      features: [
        { text: "Everything in Hobby +" },
        { text: "12,000 message credits/month" },
        { text: "10 AI Actions per AI agent" },
        { text: "3 team members" },
        { text: "2 AI agents" },
      ],
    },
    {
      name: "Pro",
      monthlyPrice: 500,
      yearlyPrice: 400,
      features: [
        { text: "Everything in Standard +" },
        { text: "40,000 message credits/month" },
        { text: "15 AI Actions per AI agent" },
        { text: "5+ team members", isLink: true },
        { text: "3 AI agents" },
        { text: "Advanced analytics", isLink: true },
      ],
    },
  ]
  

  export const formatButtons = [
    {
      icon: Bold,
      command: "bold",
      title: "Bold",
      shortcut: "Ctrl+B",
    },
    {
      icon: Italic,
      command: "italic",
      title: "Italic",
      shortcut: "Ctrl+I",
    },
    {
      icon: Underline,
      command: "underline",
      title: "Underline",
      shortcut: "Ctrl+U",
    },
    {
      icon: Link,
      command: "link",
      title: "Insert Link",
      shortcut: "Ctrl+K",
    },

    {
      icon: AlignLeft,
      command: "justifyLeft",
      title: "Align Left",
    },
    {
      icon: AlignCenter,
      command: "justifyCenter",
      title: "Align Center",
    },
    {
      icon: AlignRight,
      command: "justifyRight",
      title: "Align Right",
    },
    {
        icon: Undo,
        command: "undo",
        title: "Undo",
        shortcut: "Ctrl+Z",
      },
      {
        icon: Redo,
        command: "redo",
        title: "Redo",
        shortcut: "Ctrl+Y",
      },
  ]

  export const actionTabs = [
    { label: "Actions", icon: <Zap className="w-5 h-5" />, route: "actions" },
    { label: "Integrations", icon: <Puzzle className="w-5 h-5" />, route: "integrations" },
  ];

  export const integrations = [
    {
      imageUrl: "/images/slack.png",
      title: "Slack",
      description: "Manage your Slack conversations."
    },
    {
      imageUrl: "/images/stripe.png",
      title: "Stripe",
      description: "Manage payments & billing."
    },
    {
      imageUrl: "/images/calendly.png",
      title: "Calendly",
      description: "Manage your Calendly events."
    },
    {
      imageUrl: "/images/zendesk.png",
      title: "Zendesk",
      description: "Create Zendesk tickets."
    },
    {
      title: "Sunshine",
      description: "Integrate with Sunshine.",
      customIcon: (
        <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center">
          <div className="w-8 h-8 bg-yellow-300 rounded-full"></div>
        </div>
      )
    }
  ];

  export const defaultLinks: NavLinkItem[] = [
    { name: "Agents", to: "/dashboard/chatbot" },
    { name: "Usage", to: "/dashboard/usage" },
    {
      name: "Settings",
      to: "/dashboard/setting/general",
      customActive: (pathname: string) => pathname.startsWith("/dashboard/setting"),
    },
  ];

export const ANIMATION_DURATION = 100 