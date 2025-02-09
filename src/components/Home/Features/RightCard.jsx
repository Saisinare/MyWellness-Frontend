import React from "react";
import { Link } from "react-router-dom";

export default function RightCard() {
  return (
    <div className="w-2/3 h-5/6 bg-white p-14 rounded-xl transition-all duration-300 transform hover:scale-95 hover:shadow-2xl">
      <div className="w-full">
        <h2 className="font-madefor text-3xl font-normal mb-5">ChatBot</h2>
        <p className="font-madefor text-gray-700 text-start text-wrap mb-6">
        Smart chatbot providing personalized fitness tips, progress tracking, and tailored recommendations for achieving your goals.
        </p>
        <Link className="rounded-md underline">Go to the Chatbot</Link>
        <div className="mt-6 w-full h-72 shadow-lg border rounded-lg"></div>
      </div>
    </div>
  );
}
