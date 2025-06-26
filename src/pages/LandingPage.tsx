import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="  font-sans">
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Elevate Your Workflow with Smart AI Agents
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl">
          Automate tasks, streamline operations, and unlock intelligence in your
          systems with our advanced AI solutions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="bg-white text-black font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-100 transition"
            onClick={() => navigate("/dashboard/chatbot")}
          >
            Get Started
          </button>
        </div>
      </section>

 
    </div>
  );
};

export default LandingPage;
