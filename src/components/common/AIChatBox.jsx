import React, { useState, useRef, useEffect } from "react";
import "../../assets/css/common/chatbox.css";
import chatBotService from "../../services/chatBotService";
import ReactMarkdown from "react-markdown";

const AIChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const suggestedQuestions = [
    "Bạn là ai?Hãy giới thiệu chatbot ShoeFit và những gì bạn có thể làm",
    "Gợi ý tôi tính năng thử giày của web shoefit",
    "Gợi ý những đôi giày hot nhất tuần này",
    "Gợi ý tôi vài đôi giày đi chơi/đi sự kiện",
    "Hướng dẫn tôi cách đo size chân chính xác & xem bảng quy đổi size giày quốc tế-Việt Nam đầy đủ",
  ];

  const [messages, setMessages] = useState(() => {
    const savedChat = sessionStorage.getItem("shoefit_chat_history");
    if (savedChat) {
      return JSON.parse(savedChat);
    }
    return [
      {
        text: "Chào bạn! Mình là trợ lý ảo của ShoeFit. Bạn cần tư vấn về phối đồ hay tìm size giày chuẩn nhỉ? 👟🔥",
        isBot: true,
      },
    ];
  });

  const chatBodyRef = useRef(null);

  useEffect(() => {
    sessionStorage.setItem("shoefit_chat_history", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isLoading, isOpen, isFull]);

  const handleSend = async (suggestedText = null) => {
    const userMsg = typeof suggestedText === "string" ? suggestedText.trim() : inputValue.trim();
    
    if (!userMsg || isLoading) return;

    setMessages((prev) => [...prev, { text: userMsg, isBot: false }]);
    
    if (typeof suggestedText !== "string") {
      setInputValue("");
    }
    
    setIsLoading(true);

    try {
      const response = await chatBotService.sendMessage(userMsg);

      console.log("Chatbot Response:", response);

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
        { text: "Server đang có lỗi! 🛠️", isBot: true },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const handleClearChat = () => {
    if (window.confirm("Bảnh có chắc muốn xóa lịch sử trò chuyện này không?")) {
      setMessages([
        {
          text: "Chào bạn! Mình là trợ lý ảo của ShoeFit. Bạn cần tư vấn về phối đồ hay tìm size giày chuẩn nhỉ? 👟🔥",
          isBot: true,
        },
      ]);
      sessionStorage.removeItem("shoefit_chat_history");
    }
  };

  return (
    <div
      className={`ai-chat-wrapper ${isOpen ? "active" : ""} ${isFull ? "fullscreen" : ""}`}
    >
      <div className="chat-window">
        <div className="chat-header">
          <div className="header-info">
            <span className="status-dot"></span>
            <p>ShoeFit AI Assistant</p>
          </div>

          <div className="header-actions">
            <button
              className="action-btn"
              onClick={handleClearChat}
              title="Xóa lịch sử trò chuyện"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>

            <button
              className="action-btn"
              onClick={() => setIsFull(!isFull)}
              title={isFull ? "Thu nhỏ" : "Phóng to"}
            >
              {isFull ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 3v5H3M16 3v5h5M8 21v-5H3M16 21v-5h5" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h6v6M9 21H3v-6M21 15v6h-6M3 9V3h6" />
                </svg>
              )}
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                setIsFull(false);
              }}
              className="action-btn close-btn"
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
        </div>

        <div className="chat-body" ref={chatBodyRef}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message-wrapper ${msg.isBot ? "bot-align" : "user-align"}`}
            >
              <div className={msg.isBot ? "ai-msg" : "user-msg"}>
                {msg.isBot ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>

              {msg.isBot && msg.items && msg.items.length > 0 && (
                <div className="product-list-chat">
                  {msg.items.map((item, idx) => {
                    const isArticle =
                      item.Source === "Google Search" || item.Title;

                    if (isArticle) {
                      return (
                        <div key={idx} className="article-card-mini">
                          <div className="article-info-mini">
                            <h6 title={item.Title}>{item.Title}</h6>
                            <p title={item.Description}>{item.Description}</p>
                            <a
                              className="view-btn article-btn"
                              href={item.Url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Đọc bài viết
                            </a>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div key={idx} className="product-card-mini">
                        <div className="product-img-wrap">
                          <img src={item.ImageUrl} alt={item.Name} />
                        </div>
                        <div className="product-info-mini">
                          <h6 title={item.Name}>{item.Name}</h6>
                          <p>
                            {item.Price
                              ? new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(item.Price)
                              : "Đang cập nhật"}
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
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          {!isLoading && messages[messages.length - 1]?.isBot && (
            <div className="suggestions-container">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  className="suggestion-chip"
                  onClick={() => handleSend(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          )}
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
              onClick={() => handleSend()}
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