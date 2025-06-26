import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { sidebarTabs } from "../constants/Data";
import FilesTab from "../components/Agents/FilesTab";
import TextTab from "../components/Agents/TextTab";
import WebsiteTab from "../components/Agents/WebsiteTab";
import QnATab from "../components/Agents/QnATab";
import NotionTab from "../components/Agents/NotionTab";
import type { FileItem } from "../types/types";
import SourcesSummary from "../components/SourcesSummary";
import formatFileSize from "../constants/FileSize";

const ChatbotSources = () => {
  const { id, tab } = useParams();
  const navigate = useNavigate();
  const activeTab = tab || "files";
  const [websiteSubTab, setWebsiteSubTab] = useState("crawl");
  const [allFiles, setAllFiles] = useState<FileItem[]>([]);

  useEffect(() => {
    if (activeTab === "website") {
      setWebsiteSubTab("crawl");
    }
  }, [activeTab]);

  const handleFilesChange = (files: FileItem[]) => {
    setAllFiles(files);
  };

 

  const getTotalSize = () => {
    return allFiles.reduce((total, fileItem) => total + fileItem.file.size, 0);
  };

  const totalSize = getTotalSize();
  const fileCount = allFiles.length;
  const maxSize = 400 * 1024;

  return (
    <div className="w-full container md:p-0 p-4 mx-auto md:px-8 lg:px-12">
      <h1 className="text-3xl font-semibold mb-6 mt-4 md:mt-8">Sources</h1>
      <div className="flex flex-col lg:flex-row w-full  gap-6 max-w-[1400px] mx-auto">
        <Sidebar
          tabs={sidebarTabs}
          activeTab={activeTab}
          onTabClick={(route) => navigate(`/dashboard/chatbot/${id}/sources/${route}`)}
        />
        <div className="flex-1">
          {activeTab === "files" && <FilesTab onFilesChange={handleFilesChange} />}
          {activeTab === "text" && <TextTab />}
          {activeTab === "website" && <WebsiteTab websiteSubTab={websiteSubTab} setWebsiteSubTab={setWebsiteSubTab} />}
          {activeTab === "qna" && <QnATab />}
          {activeTab === "notion" && <NotionTab />}
        </div>
        <div className="w-full lg:w-80 bg-white rounded-xl border p-6 shadow-sm h-fit flex flex-col gap-4">
          <div>
            <div className="text-xs font-semibold text-gray-500 tracking-widest mb-2">SOURCES</div>
            <SourcesSummary
              count={fileCount}
              totalSize={totalSize}
              maxSize={maxSize}
              formatFileSize={formatFileSize}
            />
             <button
            className={`font-semibold w-full py-1.5 rounded-lg text-sm mt-6 transition bg-black text-white hover:bg-gray-900`}
          >
            Retrain agent
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotSources; 