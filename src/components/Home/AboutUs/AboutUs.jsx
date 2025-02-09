import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

export default function AboutUs() {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col bg-gray-50">
      <div className="flex items-center justify-center w-full h-24">
        <h1 className="font-madefor font-medium text-3xl text-black">Meet Our Team</h1>
      </div>
      <div className="h-1/2 w-full flex flex-col md:flex-row">
        {/* Team Member 1: Sai Sinare */}
        <div className="h-full w-full md:w-1/2 border border-t-0 border-black pt-10 px-5">
          <h2 className="font-madefor font-medium text-2xl mb-4">Sai Sinare</h2>
          <p className="text-lg text-gray-600 mb-4">
            Frontend Developer, specializing in React.js and UI/UX design. Passionate about clean and responsive design.
          </p>
          <div className="flex justify-start space-x-4">
            <a href="https://github.com/saicinare" target="_blank" rel="noopener noreferrer">
              <FaGithub size={24} />
            </a>
            <a href="https://www.linkedin.com/in/saicinare/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} />
            </a>
            <a href="mailto:saicinare@example.com">
              <FaEnvelope size={24} />
            </a>
            <a href="tel:+1234567890">
              <FaPhoneAlt size={24} />
            </a>
          </div>
        </div>

        {/* Team Member 2: Sahil Dhawane */}
        <div className="h-full w-full md:w-1/2 border border-t-0 border-black pt-10 px-5">
          <h2 className="font-madefor font-medium text-2xl mb-4">Sahil Dhawane</h2>
          <p className="text-lg text-gray-600 mb-4">
            Backend Engineer with expertise in Node.js and database management. Focused on building scalable systems.
          </p>
          <div className="flex justify-start space-x-4">
            <a href="https://github.com/sahildhawane" target="_blank" rel="noopener noreferrer">
              <FaGithub size={24} />
            </a>
            <a href="https://www.linkedin.com/in/sahildhawane/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} />
            </a>
            <a href="mailto:sahildhawane@example.com">
              <FaEnvelope size={24} />
            </a>
            <a href="tel:+1234567890">
              <FaPhoneAlt size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="h-1/2 w-full flex flex-col md:flex-row">
        {/* Team Member 3: Vedant Chandore */}
        <div className="h-full w-full md:w-1/2 border border-black border-b-0 pt-10 px-5">
          <h2 className="font-madefor font-medium text-2xl mb-4">Vedant Chandore</h2>
          <p className="text-lg text-gray-600 mb-4">
            GENAI Engineer skilled in generative AI models, working on next-gen AI-driven solutions.
          </p>
          <div className="flex justify-start space-x-4">
            <a href="https://github.com/vedantchandore" target="_blank" rel="noopener noreferrer">
              <FaGithub size={24} />
            </a>
            <a href="https://www.linkedin.com/in/vedantchandore/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} />
            </a>
            <a href="mailto:vedantchandore@example.com">
              <FaEnvelope size={24} />
            </a>
            <a href="tel:+1234567890">
              <FaPhoneAlt size={24} />
            </a>
          </div>
        </div>

        {/* Team Member 4: Manish Pingale */}
        <div className="h-full w-full md:w-1/2 border border-black border-b-0 pt-10 px-5">
          <h2 className="font-madefor font-medium text-2xl mb-4">Manish Pingale</h2>
          <p className="text-lg text-gray-600 mb-4">
            ML Engineer with expertise in machine learning algorithms, data analysis, and predictive modeling.
          </p>
          <div className="flex justify-start space-x-4">
            <a href="https://github.com/manishpingale" target="_blank" rel="noopener noreferrer">
              <FaGithub size={24} />
            </a>
            <a href="https://www.linkedin.com/in/manishpingale/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} />
            </a>
            <a href="mailto:manishpingale@example.com">
              <FaEnvelope size={24} />
            </a>
            <a href="tel:+1234567890">
              <FaPhoneAlt size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
