import { RefreshCw, Signal, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { chatLogs } from "../../constants/Data";
import DateRangePicker from "../Usage/DateRangePicker";
import Dropdown from "../Dropdown";
import { confidenceOptions, sourceOptions, feedbackOptions } from "../../constants/DropdownOptions";
import ExportButton from "../ExportButton";


const ActivityChatLogs = () => {
 
  const [selected, setSelected] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [confidence, setConfidence] = useState("");
  const [source, setSource] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);


  const messages = [
    { from: "bot", text: "Hi! What can I help you with?" },
    { from: "user", text: chatLogs[selected].subtitle },
    {
      from: "bot",
      text:
        "It seems like your message got cut off. Could you please provide more details or clarify what you need assistance with? I'm here to help!",
      score: 0.007,
    },
  ];

  return (
    <div className="bg-white border rounded-md min-h-screen">
     
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900">Chat logs</h1>
        <div className="flex items-center gap-3">
          <button 
            className="flex items-center gap-2 px-4 py-1 text-black border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => {
              setIsRefreshing(true);
              setTimeout(() => setIsRefreshing(false), 500);  
            }}
          >
           <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin-once' : ''}`} />
            <span className="hidden md:inline">Refresh</span>
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-1 text-black border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => setShowFilters(!showFilters)}
          >
        <SlidersHorizontal className="w-5 h-4 text-black" />
            <span className="hidden md:inline">Filter</span>
          </button>
          <ExportButton />
        </div>
      </div>
      {showFilters && (
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex flex-wrap items-center gap-4">
            <DateRangePicker />
            <Dropdown
              options={confidenceOptions}
              value={confidence}
              onChange={setConfidence}
              placeholder="Confidence score"
              dropdownWidth="w-40"
            />
            <Dropdown
              options={sourceOptions}
              value={source}
              onChange={setSource}
              placeholder="Source"
              dropdownWidth="w-42"
            />
            <Dropdown
              options={feedbackOptions}
              value={feedback}
              onChange={setFeedback}
              placeholder="Feedback"
              dropdownWidth="w-48"
            />
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row h-[calc(100vh-89px)]">
       
        <div className="w-full md:w-96 border-r border-gray-200">
          <div>
            {chatLogs.map((log, idx) => (
              <div
                key={log.id}
                className={`p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors ${selected === idx ? 'bg-white' : ''}`}
                onClick={() => setSelected(idx)}
              >
                <div className="flex justify-between items-start mb-1">
                  <p className="text-sm text-gray-900 font-medium truncate pr-2">{log.message}</p>
                  <span className="text-xs text-gray-500 whitespace-nowrap">{log.time}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{log.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

       
        <div className="flex-1 md:mt-0   mt-80 flex flex-col relative">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Source:</span>
              <span className="text-sm font-medium text-gray-900">Playground</span>
            </div>
            <button className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 p-6 space-y-4 overflow-y-auto">
           
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-bl-none rounded-2xl px-4 py-3 max-w-xs lg:max-w-md">
                <p className="text-sm text-gray-900">{messages[0].text}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-black rounded-2xl rounded-br-none px-4 py-3 max-w-xs lg:max-w-md">
                <p className="text-sm text-white">{messages[1].text}</p>
              </div>
            </div>
            <div className="flex absolute justify-start">
              <div className="bg-gray-200 rounded-bl-none rounded-2xl px-4 pt-3 max-w-xs lg:max-w-md">
                <p className="text-sm text-gray-900 ">
                  {messages[2].text}
                </p>
               
                <div className="flex relative top-3 items-center gap-2 ">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-600 text-white">
                   <Signal className="w-3 h-3 mr-1" />
                    0.007
                  </span>
                  <button className="text-xs px-3 py-1 border border-gray-300 rounded-md bg-white text-black hover:bg-gray-100 transition-colors">
                    Improve answer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityChatLogs;
