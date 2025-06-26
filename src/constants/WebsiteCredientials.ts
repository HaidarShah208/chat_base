export const webName = import.meta.env.VITE_WEBSITE_NAME || "Your Default Name";

export const SECRET_KEY = import.meta.env.VITE_SECRET_KEY || "undefined";
export const SCRIPT_CODE = `<script>\n(function(){if(!window.chatbase||window.chatbase(\"getState\")!==\"initialized\"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[];}window.chatbase.q.push(arguments)}}})();\n</script>`;

export const IFRAME_URL = 'https://www.chatbase.co/chatbot-iframe/undefined';
