import { InfoIcon } from "lucide-react";
import ChatBot from "../components/ChatBot/ChatBot";

const Playground = () => {
  return (
    <div className="h-screen max-w-5xl px-10 mt-4 mx-auto flex flex-col justify-center items-center bg-white">
      <header className="bg-white py-3 lg:-mb-10 w-full flex justify-between items-center">
        <div className="flex items-center gap-1">
          <h1 className="text-3xl font-semibold text-black">Playground</h1>
          <div className="w-4 h-4 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold"> <InfoIcon className="w-4 h-4 text-black" /> </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className=" text-sm border font-medium text-gray-700 cursor-pointer bg-transparent shadow-xs px-5 py-2 rounded-md hover:bg-gray-200">
            Compare
          </button>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="h-5 w-5 text-zinc-600" data-sentry-element="LightBulbIcon" data-sentry-source-file="PlaygroundTip.tsx"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"></path></svg>
        </div>
      </header>
      <div className="flex-1 w-full flex justify-center items-center">
        <div
          className="flex-1 bg-[#F7F7F7] rounded-md relative"
          style={{
            backgroundImage: `radial-gradient(circle, #CECECE 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        >
          <ChatBot />
        </div>
      </div>
    </div>
  );
};

export default Playground; 