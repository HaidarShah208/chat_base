import { useNavigate } from "react-router-dom";

const Chatbot = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[70vh] max-w-5xl container md:p-0 p-4 mx-auto w-full">
      <div className="px-12 mt-6">
        <p className="text-3xl text-black font-semibold">AI Agents</p>
      </div>
      <div className="flex justify-center items-center mt-20">
        <button className="bg-black text-white font-semibold py-1.5 px-4 rounded-lg text-sm shadow-md hover:shadow-xl transition" onClick={() => navigate("/dashboard/create-new-chatbot/files")}>New AI agent</button>
      </div>
    </div>
  );
};

export default Chatbot;
