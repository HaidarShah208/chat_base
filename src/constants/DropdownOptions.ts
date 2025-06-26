import type { Option } from "../types/types"

export const themeOptions = [
    { value: "light", label: "light" },
    { value: "dark", label: "dark" }
  ]
export const directionOptions = [
    { value: "left", label: "left" },
    { value: "right", label: "right" }
  ]
  export const visibilityOptions = [
    { value: "private", label: "private" },
    { value: "public", label: "public" }
  ]
  export const modelOptions = [
    { value: "claude-3.7-sonnet", label: "Claude 3.7 Sonnet", image: "/images/claude.png" },
    { value: "claude-3.5-sonnet", label: "Claude 3.5 Sonnet", image: "/images/claude.png" },
    { value: "claude-3-opus", label: "Claude 3 Opus", image: "/images/claude.png" },
    { value: "claude-3-haiku", label: "Claude 3 Haiku", image: "/images/claude.png" },
    { value: "gemini-1.5-pro", label: "Gemini 1.5 Pro", image: "/images/google.png" },
    { value: "gemini-1.5-flash", label: "Gemini 1.5 Flash", image: "/images/google.png" },
    { value: "gemini-2.0-flash", label: "Gemini 2.0 Flash", image: "/images/google.png" },
    { value: "gemini-2.0-pro", label: "Gemini 2.0 Pro", image: "/images/google.png" },
    { value: "gemini-2.5-flash", label: "Gemini 2.5 Flash", image: "/images/google.png" },
    { value: "gpt-4o-mini", label: "GPT-4o Mini",  image: "/images/gpt.png" },
    { value: "gpt-4", label: "GPT-4", image: "/images/gpt.png" },
    { value: "gpt-3.5", label: "GPT-3.5", image: "/images/gpt.png" },
    { value: "grok-3", label: "Grok 3", image: "/images/grok.png" },
    { value: "grok-3-mini", label: "Grok 3 Mini", image: "/images/grok.png" },
    { value: "deepseek-r1", label: "DeepSeek-R1", image: "/images/deepseek.png" },
    { value: "deepseek-v3", label: "DeepSeek-V3", image: "/images/deepseek.png" },
    { value: "llama-4-maverick", label: "Llama 4 Maverick", image: "/images/meta.png" },
  ]

  export const instructionOptions: Option[] = [
    { isTitle: true, label: "Custom prompt" },
    { value: "custom-prompt", label: "Custom prompt" },
    { isTitle: true, label: "Examples" },
    { value: "ai-agent", label: "AI agent" },
    { value: "customer-support-agent", label: "Customer support agent" },
    { value: "sales-agent", label: "Sales agent" },
    { value: "language-tutor", label: "Language tutor" },
    { value: "coding-expert", label: "Coding expert" },
    { value: "life-coach", label: "Life coach" },
    { value: "futuristic-fashion-advisor", label: "Futuristic fashion advisor" },
  ]

  export const taxTypeOptions = [
    { value: "None", label: "None" },
    { value: "AF_TAX", label: "Afghanistan - AF TAX" },
    { value: "AL_TAX", label: "Albania - AL TAX" },
    { value: "DZ_TAX", label: "Algeria - DZ TAX" },
    { value: "AS_TAX", label: "American Samoa - AS TAX" },
    { value: "AD_TAX", label: "Andorra - AD TAX" },
    { value: "AO_TAX", label: "Angola - AO TAX" },
    { value: "AR_CUIT", label: "Argentina - AR CUIT" },
    { value: "AM_TAX", label: "Armenia - AM TAX" },
    { value: "AU_ABN", label: "Australia - AU ABN" },
    { value: "AT_VAT", label: "Austria - EU VAT" },
    { value: "AZ_TAX", label: "Azerbaijan - AZ TAX" },
    { value: "BS_TIN", label: "Bahamas - BS TIN" },
    { value: "BH_TAX", label: "Bahrain - BH TAX" },
    { value: "BD_TIN", label: "Bangladesh - BD TIN" },
    { value: "BY_UNP", label: "Belarus - BY UNP" },
    { value: "BE_VAT", label: "Belgium - EU VAT" },
    { value: "BZ_TIN", label: "Belize - BZ TIN" },
    { value: "BJ_TAX", label: "Benin - BJ TAX" },
    { value: "BM_TAX", label: "Bermuda - BM TAX" },
    { value: "BT_TAX", label: "Bhutan - BT TAX" },
    { value: "BO_NIT", label: "Bolivia - BO NIT" },
    { value: "BA_TAX", label: "Bosnia and Herzegovina - BA TAX" },
    { value: "BW_TAX", label: "Botswana - BW TAX" },
    { value: "BR_CNPJ", label: "Brazil - BR CNPJ" },
    { value: "BN_TAX", label: "Brunei - BN TAX" },
    { value: "BG_UIC", label: "Bulgaria - BG UIC" },
    { value: "BF_TAX", label: "Burkina Faso - BF TAX" },
    { value: "BI_TAX", label: "Burundi - BI TAX" },
    { value: "CV_TAX", label: "Cabo Verde - CV TAX" },
    { value: "KH_TAX", label: "Cambodia - KH TAX" },
    { value: "CM_TAX", label: "Cameroon - CM TAX" },
    { value: "CA_QST", label: "Canada - CA QST" },
    { value: "CF_TAX", label: "Central African Republic - CF TAX" },
    { value: "TD_TAX", label: "Chad - TD TAX" },
    { value: "CL_TAX", label: "Chile - CL TAX" },
    { value: "US_EIN", label: "United States - US EIN" },
    { value: "UY_RUT", label: "Uruguay - UY RUT" },
    { value: "UZ_INN", label: "Uzbekistan - UZ INN" },
    { value: "VU_TIN", label: "Vanuatu - VU TIN" },
    { value: "VE_RIF", label: "Venezuela - VE RIF" },
    { value: "VN_TAX", label: "Vietnam - VN TAX" },
    { value: "YE_TAX", label: "Yemen - YE TAX" },
    { value: "ZM_TAX", label: "Zambia - ZM TAX" },
    { value: "ZW_TAX", label: "Zimbabwe - ZW TAX" }
  ];

  export const confidenceOptions = [
    { value: "<0.9", label: "<0.9" },
    { value: "<0.8", label: "<0.8" },
    { value: "<0.7", label: "<0.7" },
    { value: "<0.6", label: "<0.6" },
    { value: "<0.5", label: "<0.5" },
    { value: "<0.4", label: "<0.4" },
    { value: "<0.3", label: "<0.3" },
    { value: "<0.2", label: "<0.2" },
    { value: "<0.1", label: "<0.1" },
    { value: "show-all", label: "Show All" },
  ];
  
  export const sourceOptions = [
    { value: "show-all", label: "Show All" },
    { value: "api", label: "API" },
    { value: "whatsapp", label: "Whatsapp" },
    { value: "chatbot", label: "Chatbot" },
    { value: "messenger", label: "Messenger" },
    { value: "instagram", label: "Instagram" },
    { value: "slack", label: "Slack" },
    { value: "chatbase-site", label: "Chatbase Simulator" },
    { value: "playground", label: "Playground" },
    { value: "action-preview", label: "Action Preview" },
    { value: "qna-preview", label: "QnA Preview" },
    { value: "widget-iframe", label: "Widget or Iframe" },
    { value: "unspecified", label: "Unspecified" },
  ];
  
  export const feedbackOptions = [
 
    { value: "contains-thumb-up", label: "Contains thumb up" },
    { value: "contains-thumb-down", label: "Contains thumb down" },
    { value: "show-all", label: "Show All" },
 
  ];

  export const sortByOptions = [
    { value: 'Default', label: 'Default' },
    { value: 'Status', label: 'Status' },
    { value: 'Newest', label: 'Newest' },
    { value: 'Oldest', label: 'Oldest' },
    { value: 'Alphabetical (A-Z)', label: 'Alphabetical (A-Z)' },
    { value: 'Alphabetical (Z-A)', label: 'Alphabetical (Z-A)' },
  ];

  export   const agentOptions = [
    { value: "all-agents", label: "All agents" },
    { value: "deleted-agents", label: "Deleted agents" },
  ]