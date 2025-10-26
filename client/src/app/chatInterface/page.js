"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Plus,
  Clock,
  FileText,
  Send,
  ChevronRight,
  BarChart3,
  Scale,
  Menu,
  X,
  MoreHorizontal,
  Trash,
  Pin,
} from "lucide-react";

export default function ChatInterface() {
  // 🚫 Do NOT read from localStorage during SSR
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const menuRef = useRef(null);

  // 🧩 Load conversations only after client mounts
  useEffect(() => {
    const saved = localStorage.getItem("rashtram_conversations");
    if (saved) {
      const parsed = JSON.parse(saved);
      setConversations(parsed);
      setActiveConversationId(parsed[0]?.id || null);
    } else {
      const defaultConv = {
        id: 1,
        title: "Farm Bills Analysis 2020",
        preview: "Analysis of the three agricultural reform bills...",
        timestamp: "2 hours ago",
        messages: [
          {
            id: 1,
            text: "Welcome to Rashtram AI! I specialize in analyzing parliamentary bills and legislation. How can I help you understand Indian parliamentary bills today?",
            sender: "assistant",
            timestamp: "10:00 AM",
          },
        ],
      };
      setConversations([defaultConv]);
      setActiveConversationId(defaultConv.id);
    }
    setMounted(true);
  }, []);

  // 🧩 Persist chats to localStorage
  useEffect(() => {
    if (mounted && conversations.length > 0) {
      localStorage.setItem(
        "rashtram_conversations",
        JSON.stringify(conversations)
      );
    }
  }, [conversations, mounted]);

  const activeConversation = conversations.find(
    (conv) => conv.id === activeConversationId
  );

  // 🧩 Smooth scroll on message update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages]);

  // 🧩 New chat
  const handleNewChat = () => {
    const newConversation = {
      id: Date.now(),
      title: "New Bill Analysis",
      preview: "Start analyzing a new bill...",
      timestamp: "Just now",
      messages: [
        {
          id: 1,
          text: "Welcome to Rashtram AI! I specialize in analyzing parliamentary bills and legislation. Which bill would you like me to analyze today?",
          sender: "assistant",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ],
    };
    setConversations((prev) => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
    setShowSummary(false);
  };

  // 🧩 Send message
  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;
    const text = inputMessage.trim();

    const userMessage = {
      id: Date.now(),
      text,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversationId
          ? {
              ...c,
              messages: [...c.messages, userMessage],
              preview: text.substring(0, 50) + "...",
              timestamp: "Just now",
            }
          : c
      )
    );
    setInputMessage("");
    setIsTyping(true);

    // Simulated AI reply
    setTimeout(() => {
      const responses = [
        "That's an excellent question about this parliamentary bill. Let me analyze its key provisions, implications, and the legislative context for you.",
        "I'll break down this bill's provisions, examining its constitutional validity, potential impact, and the parliamentary debates surrounding it.",
        "Let me provide a comprehensive analysis of this legislation, including its objectives, stakeholder impacts, and alignment with existing laws.",
      ];

      const aiMessage = {
        id: Date.now(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "assistant",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConversationId
            ? { ...c, messages: [...c.messages, aiMessage] }
            : c
        )
      );
      setIsTyping(false);
    }, 1500);
  };

  const handlePinConversation = (e, id) => {
    e.stopPropagation(); // Prevent the button from triggering the conversation selection

    setConversations((prevConversations) => {
      // Find the conversation to pin
      const updatedConversations = prevConversations.map((conv) => {
        if (conv.id === id) {
          return { ...conv, pinned: true }; // Add a pinned flag
        }
        return conv;
      });

      // Sort the conversations: pinned ones should come first
      updatedConversations.sort(
        (a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)
      );

      return updatedConversations;
    });
  };

  // Delete a conversation
  const handleDeleteConversation = (e, id) => {
    e.stopPropagation(); // Prevent the button from triggering the conversation selection

    if (window.confirm("Are you sure you want to delete this conversation?")) {
      setConversations((prevConversations) =>
        prevConversations.filter((conv) => conv.id !== id)
      );
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const TypingIndicator = () => (
    <div className="px-6 py-4">
      <div className="max-w-4xl mx-auto flex justify-start space-x-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-100 to-red-100 border-2 border-red-200 flex items-center justify-center flex-shrink-0">
          <Scale size={16} className="text-red-700" />
        </div>
        <div className="bg-gray-100 rounded-2xl px-4 py-3 flex items-center space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.15s" }}
          />
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.3s" }}
          />
        </div>
      </div>
    </div>
  );

  const generateSummary = () => {
    if (!activeConversation) return "No conversation selected";
    const userMessages = activeConversation.messages.filter(
      (m) => m.sender === "user"
    );
    const aiMessages = activeConversation.messages.filter(
      (m) => m.sender === "assistant"
    );

    return `Bill Analysis: ${activeConversation.title}

Total Messages: ${activeConversation.messages.length}
Your Questions: ${userMessages.length}
AI Responses: ${aiMessages.length}

Focus:
• Legislative provisions
• Constitutional implications
• Stakeholder impact
• Debate summary

Last Activity: ${activeConversation.timestamp}`;
  };

  // 🧩 Prevent hydration mismatch: render placeholder until mounted
  if (!mounted) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Loading Rashtram AI...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white font-sans overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-gray-50 border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center space-x-2 bg-[#B20D38] hover:bg-[#8A0A2A] text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 shadow-sm"
          >
            <Plus size={18} />
            <span>New Analysis</span>
          </button>
          <button
            className="md:hidden text-gray-500 ml-2"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => {
                setActiveConversationId(conv.id);
                setShowSummary(false);
                setSidebarOpen(false);
              }}
              className={`w-full text-left p-3 rounded-xl transition-all duration-200 relative group ${
                conv.id === activeConversationId
                  ? "bg-gradient-to-r from-red-50 to-pink-50 shadow-md border-2 border-red-300"
                  : "hover:bg-gray-50 hover:shadow-sm border-2 border-transparent"
              }`}
            >
              <div className="flex items-start space-x-3">
                <FileText
                  size={18}
                  className={`mt-1 flex-shrink-0 ${
                    conv.id === activeConversationId
                      ? "text-red-600"
                      : "text-gray-400"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3
                      className={`text-sm font-medium truncate ${
                        conv.id === activeConversationId
                          ? "text-red-700"
                          : "text-gray-700"
                      }`}
                    >
                      {conv.title}
                    </h3>
                    {conv.pinned && (
                      <Pin
                        size={12}
                        className="text-red-500 flex-shrink-0 fill-current"
                      />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-1">
                    {conv.preview}
                  </p>
                  <div className="flex items-center space-x-1 mt-2">
                    <Clock size={10} className="text-gray-400" />
                    <span className="text-xs text-gray-400">
                      {conv.timestamp}
                    </span>
                  </div>
                </div>

                {/* More Options Button (Replaced <button> with <div>) */}
                <div
                  className="relative"
                  ref={openMenuId === conv.id ? menuRef : null}
                >
                  <div
                    className={`p-1.5 rounded-lg transition-colors ${
                      openMenuId === conv.id
                        ? "bg-gray-200 text-gray-700"
                        : "text-gray-400 hover:bg-gray-100 hover:text-gray-600 opacity-0 group-hover:opacity-100"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === conv.id ? null : conv.id);
                    }}
                  >
                    <MoreHorizontal size={16} />
                  </div>

                  {openMenuId === conv.id && (
                    <div className="absolute right-0 top-full mt-1 w-48 bg-white shadow-xl rounded-lg border border-gray-200 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <button
                        onClick={(e) => handlePinConversation(e, conv.id)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-sm text-gray-700 flex items-center gap-2"
                      >
                        <Pin
                          size={14}
                          className={conv.pinned ? "fill-current" : ""}
                        />
                        {conv.pinned ? "Unpin" : "Pin"} Conversation
                      </button>
                      <button
                        onClick={(e) => handleDeleteConversation(e, conv.id)}
                        className="w-full text-left px-4 py-2 hover:bg-red-50 transition-colors text-sm text-red-600 flex items-center gap-2"
                      >
                        <Trash size={14} />
                        Delete Conversation
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200 text-xs text-gray-500 flex items-center space-x-2">
          <Scale size={14} className="text-[#B20D38]" />
          <span>Parliamentary Analysis</span>
        </div>
      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col h-full">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <button
              className="md:hidden text-gray-600"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#B20D38]">
              <Scale size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-semibold text-gray-800">
                Rashtram AI
              </h1>
              <p className="text-xs md:text-sm text-gray-500">
                Parliamentary Bill Analysis
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowSummary(!showSummary)}
            className={`flex items-center space-x-2 px-3 md:px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              showSummary
                ? "bg-[#B20D38] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <BarChart3 size={18} />
            <span className="hidden sm:inline">Summary</span>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-white to-gray-50">
          {activeConversation?.messages.map((msg) => (
            <div
              key={msg.id}
              className={`px-4 py-3 md:px-6 ${
                msg.sender === "user" ? "bg-gray-50" : "bg-gray-50"
              }`}
            >
              <div
                className={`max-w-4xl mx-auto flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "assistant" && (
                  <div className="w-8 h-8 mr-2 rounded-full bg-gradient-to-br from-orange-100 to-red-100 border-2 border-red-200 flex items-center justify-center">
                    <Scale size={16} className="text-red-700" />
                  </div>
                )}
                <div className="max-w-[85%] md:max-w-2xl">
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[#B20D38] text-white rounded-br-sm"
                        : "bg-white border border-gray-200 text-gray-800 rounded-tl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <p
                    className={`mt-1 text-xs text-gray-400 ${
                      msg.sender === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-white border-t border-gray-200 px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-end space-x-2 md:space-x-3">
            <textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about any parliamentary bill..."
              rows={1}
              className="flex-1 px-4 py-3 text-sm md:text-base border border-gray-300 rounded-2xl resize-none focus:border-[#B20D38] focus:ring-2 focus:ring-red-100 transition-all"
              style={{ maxHeight: "120px" }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className={`p-3 rounded-xl transition-all duration-200 ${
                inputMessage.trim()
                  ? "bg-[#B20D38] text-white hover:bg-[#8A0A2A]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Press Enter to send • Shift + Enter for new line
          </p>
        </div>
      </div>

      {/* Summary */}
      {showSummary && (
        <div className="fixed md:static right-0 top-0 w-80 h-full bg-white border-l border-gray-200 flex flex-col z-20 animate-slide-in">
          <div className="px-6 py-4 bg-[#B20D38] flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <BarChart3 size={20} className="text-white" />
              <h3 className="text-lg font-semibold text-white">Summary</h3>
            </div>
            <button
              onClick={() => setShowSummary(false)}
              className="text-white hover:text-gray-200 transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-red-100 mb-4">
              <pre className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-sans">
                {generateSummary()}
              </pre>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
