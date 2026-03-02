import React, { useState, useRef, useEffect } from "react";
import "../../assets/css/common/chatbox.css";

const AIChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    console.log("User hỏi:", inputValue);
    setInputValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className={`ai-chat-wrapper ${isOpen ? "active" : ""}`}>
      <div className="chat-window">
        <div className="chat-header">
          <div className="header-info">
            <span className="status-dot"></span>
            <p>ShoeFit AI Assistant</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="close-btn"
            aria-label="Close chat"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="chat-body" ref={chatBodyRef}>
          <div className="ai-msg">
            Chào bạn! Mình là trợ lý ảo của ShoeFit. Bạn cần tư vấn về phối đồ
            hay tìm size giày chuẩn nhỉ? 👟🔥
          </div>
        </div>

        <div className="chat-footer">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Hỏi ShoeFit AI..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button className="send-btn" onClick={handleSend}>
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <button
        className={`chat-trigger ${isOpen ? "hidden" : "show"}`}
        onClick={() => setIsOpen(true)}
        title="Trò chuyện với AI"
      >
        <span className="pulse-ring"></span>

        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          <path d="M8 9h8"></path>
          <path d="M8 13h6"></path>
        </svg>
      </button>
    </div>
  );
};

export default AIChatBox;
