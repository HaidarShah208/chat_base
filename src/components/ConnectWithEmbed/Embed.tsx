import React, { useState } from "react";
import { SCRIPT_CODE, SECRET_KEY } from "../../constants/WebsiteCredientials";
import { Check, Copy, InfoIcon } from "lucide-react";

const EmbedPublic: React.FC = () => {
    const [selected, setSelected] = useState<'bubble' | 'iframe'>('bubble');
    const [copiedScript, setCopiedScript] = useState(false);
    const [copiedSecret, setCopiedSecret] = useState(false);

    const handleCopyScript = () => {
        navigator.clipboard.writeText(SCRIPT_CODE.replace(/\\n/g, '\n'));
        setCopiedScript(true);
        setTimeout(() => setCopiedScript(false), 1500);
    };

    const handleCopySecret = () => {
        navigator.clipboard.writeText(SECRET_KEY);
        setCopiedSecret(true);
        setTimeout(() => setCopiedSecret(false), 1500);
    };
    return (
        <div className="mb-6 mx-auto">

            <div className="p-4 md:p-6 rounded-xl border mx-auto border-gray-200 bg-white ">
                <h2 className="text-2xl font-semibold mb-4">Embed</h2>
                <div className="flex flex-col md:flex-row gap-4">
                    <div
                        className={`flex-1 border rounded-xl py-4 px-3 cursor-pointer transition-all duration-150 ${selected === 'bubble'
                                ? 'border-gray-900 shadow-sm '
                                : 'border-gray-200 bg-white'
                            }`}
                        onClick={() => setSelected('bubble')}
                    >
                        <div className="flex gap-2 items-center mb-1">
                            <input
                                type="radio"
                                checked={selected === 'bubble'}
                                onChange={() => setSelected('bubble')}
                                className="accent-black mr-2"
                                name="embed-option"
                                aria-label="Embed a chat bubble"
                            />
                            <div>
                                <span className="font-medium text-md">Embed a chat bubble</span>

                                <span className="ml-2 px-2 py-0.5 text-xs rounded-xl bg-gray-100 text-gray-700 font-semibold">Recommended</span>
                                <p className="text-gray-500 text-sm pt-1">
                                    Embed a chat bubble on your website. Allows you to use all the advanced features of the agent. Explore the{' '}
                                    <a href="#" className="underline font-semibold text-black">docs.</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`flex-1 border rounded-xl p-5 cursor-pointer transition-all duration-150 ${selected === 'iframe'
                                ? 'border-gray-900 shadow-sm'
                                : 'border-gray-200 bg-white'
                            }`}
                        onClick={() => setSelected('iframe')}
                    >
                        <div className="flex gap-2 items-center mb-1">
                            <input
                                type="radio"
                                checked={selected === 'iframe'}
                                onChange={() => setSelected('iframe')}
                                className="accent-black mr-2"
                                name="embed-option"
                                aria-label="Embed the iframe directly"
                            />
                            <div>

                                <span className="font-medium text-md">Embed the iframe directly</span>
                                <p className="text-gray-500 text-sm pt-1">
                                    Add the agent anywhere on your website
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {selected !== 'iframe' && (
                <div className="mt-6 border-gray-200 p-4 md:p-6 rounded-xl border mx-auto bg-white">
                    <h2 className="text-2xl font-semibold mb-6">Configuration</h2>
                    <div className="mb-8">
                        <div className="mb-2 text-base font-medium">On the site</div>
                        <div className="mb-2 text-gray-700 text-sm font-medium">www.chatbase.co</div>
                        <div className="relative max-w-4xl mx-auto bg-gray-50 border rounded-lg overflow-x-auto">
                            <pre className="text-xs p-3 whitespace-pre overflow-x-auto "><code>{SCRIPT_CODE.replace(/\n/g, '\n')}</code></pre>
                            <button
                                onClick={handleCopyScript}
                                className="absolute top-2 right-2 bg-white border border-gray-200 rounded px-3 py-1 text-xs font-medium shadow hover:bg-gray-100 transition"
                            >
                                {copiedScript ? "Copied" : "Copy"}
                            </button>
                        </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-3 mt-8">For identity verification</h3>
                    <div className="mb-3 text-lg font-semibold">On the server</div>
                    <div className="mb-2 text-sm font-semibold">Secret key</div>
                    <div className="relative w-full  mb-4 md:mb-8">
                        <input
                            type="password"
                            value={"••••••••" + SECRET_KEY}
                            readOnly
                            className="w-full border   px-3 py-2 pr-16 text-sm shadow-sm rounded-md font-mono tracking-wider"
                        />
                        <button
                            onClick={handleCopySecret}
                            className="absolute top-1/2 right-2 -translate-y-1/2 bg-transparent rounded px-3 py-1 text-xs font-medium shadow hover:bg-gray-100 transition"
                        >
                            {copiedSecret ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                        You'll need to generate an HMAC on your server for each logged-in user and send it to Chatbase.
                    </p>
                    <p className="text-sm text-gray-500">
                        You'll need your secret key to add identity verification to your site or app.
                    </p>
                    <div className="flex items-start gap-3 bg-[#FFFBEB]   rounded-md px-4 py-3 mt-4">
                        <span className="text-orange-500 text-xl mt-0.5"><InfoIcon className="w-4 h-4 text-orange-800" /></span>
                        <div className="text-orange-800 text-sm font-medium">
                            Keep your secret key safe! Never commit it directly to your repository, client-side code, or anywhere a third party can find it.
                        </div>
                    </div>
                    <div className="relative bg-gray-50 border rounded-lg overflow-x-auto mt-8">
                        <pre className="text-xs p-3 whitespace-pre overflow-x-auto"><code>{`const crypto = require('crypto');

const secret = '••••••••'; // Your verification secret key
const userId = current_user.id // A string UUID to identify your user

const hash = crypto.createHmac('sha256', secret).update(userId).digest('hex');`}</code></pre>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(`const crypto = require('crypto');\n\nconst secret = '••••••••'; // Your verification secret key\nconst userId = current_user.id // A string UUID to identify your user\n\nconst hash = crypto.createHmac('sha256', secret).update(userId).digest('hex');`);
                            }}
                            className="absolute top-2 right-2 bg-white border border-gray-200 rounded px-3 py-1 text-xs font-medium shadow hover:bg-gray-100 transition"
                        >
                            Copy
                        </button>
                    </div>
                </div>
            )}

            {selected === 'iframe' && (
                <div className="p-4 md:p-6 rounded-xl border mx-auto border-gray-200 bg-white mt-8">
                    <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-2xl font-semibold">Integration</h2>
                        <InfoIcon className="w-4 h-4 text-yellow-500" />
                    </div>
                    <div className="mb-2 text-gray-700 text-sm font-medium">www.chatbase.co</div>
                    <div className="relative bg-gray-50 border rounded-lg overflow-x-auto">
                        <pre className="text-xs p-3 whitespace-pre overflow-x-auto">
                            <code>
                                {`<iframe\n  src="https://www.chatbase.co/chatbot-iframe/undefined"\n  `}
                                <span className="text-red-500">{`width="100%"`}</span>
                                {`\n  `}
                                <span className="text-red-500">{`style="height: 100%; min-height: 700px"`}</span>
                                {`\n  `}
                                <span className="text-red-500">{`frameborder="0"`}</span>
                                {`\n></iframe>`}
                            </code>
                        </pre>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(`<iframe\n  src="https://www.chatbase.co/chatbot-iframe/undefined"\n  width="100%"\n  style="height: 100%; min-height: 700px"\n  frameborder="0"\n></iframe>`);
                            }}
                            className="absolute top-2 right-2 bg-white border border-gray-200 rounded px-3 py-1 text-xs font-medium shadow hover:bg-gray-100 transition"
                        >
                            Copy
                        </button>
                    </div>
                </div>
            )}

        </div>

    );
};

export default EmbedPublic;
