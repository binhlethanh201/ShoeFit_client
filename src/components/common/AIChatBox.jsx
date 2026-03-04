import React, { useState, useRef, useEffect } from "react";
import "../../assets/css/common/chatbox.css";
import chatBotService from "../../services/chatBotService";

const AIChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Chào bạn! Mình là trợ lý ảo của ShoeFit. Bạn cần tư vấn về phối đồ hay tìm size giày chuẩn nhỉ? 👟🔥",
      isBot: true,
    },
  ]);

  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isLoading, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg = inputValue.trim();
    setMessages((prev) => [...prev, { text: userMsg, isBot: false }]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await chatBotService.sendMessage(userMsg);

      if (response && response.Status === 200) {
        setMessages((prev) => [
          ...prev,
          {
            text: response.Message,
            isBot: true,
            items: response.Data?.items || [],
          },
        ]);
      }
    } catch (error) {
      console.error("Lỗi:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Server bận rồi bảnh ơi! 🛠️", isBot: true },
      ]);
    } finally {
      setIsLoading(false);
    }
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
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message-wrapper ${msg.isBot ? "bot-align" : "user-align"}`}
            >
              <div className={msg.isBot ? "ai-msg" : "user-msg"}>
                {msg.text}
              </div>

              {msg.isBot && msg.items && msg.items.length > 0 && (
                <div className="product-list-chat">
                  {msg.items.map((item, idx) => (
                    <div key={idx} className="product-card-mini">
                      <div className="product-img-wrap">
                        <img src={item.ImageUrl} alt={item.Name} />
                      </div>
                      <div className="product-info-mini">
                        <h6 title={item.Name}>{item.Name}</h6>
                        <p>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.Price)}
                        </p>
                        <button
                          className="view-btn"
                          onClick={() =>
                            (window.location.href = `/product/${item.Id}`)
                          }
                        >
                          Xem ngay
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="ai-msg typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>

        <div className="chat-footer">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder={
                isLoading ? "AI đang trả lời..." : "Hỏi ShoeFit AI..."
              }
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
            />
            <button
              className="send-btn"
              onClick={handleSend}
              disabled={isLoading}
            >
              {isLoading ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                ></div>
              ) : (
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
              )}
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
