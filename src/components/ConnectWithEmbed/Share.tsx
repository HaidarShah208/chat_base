import React, { useState } from 'react';
import { IFRAME_URL } from '../../constants/WebsiteCredientials';
import {  ArrowUpRightFromSquare, Copy } from 'lucide-react';

const Share: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(IFRAME_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full mx-auto  p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4">Share</h2>
      <div className="mb-2 font-medium text-md">www.chatbase.co</div>
      <div className="text-gray-400 text-xs mb-6">
        To add the agent any where on your website, add this iframe to your html code
      </div>
      <div className="mb-4">
        <div className="bg-gray-100 rounded-md px-4 py-1 text-center text-sm font-mono text-gray-700 overflow-x-auto select-all">
          {IFRAME_URL}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
        <button
          onClick={handleCopy}
          className="flex items-center gap-3 justify-center px-4 py-1.5 hover:bg-gray-200 rounded-md border border-gray-300 text-sm font-medium transition"
        >
          {copied ? 'Copied!' : 'Copy'}
          <Copy className="w-4 h-4" />
        </button>
        <a
          href={IFRAME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex rounded-xl gap-3 items-center justify-center px-4 py-2 bg-white hover:bg-gray-100   border border-gray-300 text-xs font-medium transition"
        >
          Visit
          <ArrowUpRightFromSquare className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default Share;
