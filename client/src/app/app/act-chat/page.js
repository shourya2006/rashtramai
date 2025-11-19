"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Send,
  Loader2,
  Scale,
  ArrowLeft,
  Sparkles,
  AlertCircle,
  BarChart3,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { 
  processAct, 
  getActSummary, 
  sendActChatMessage,
  getOrCreateActChat,
  getActChat,
  addMessageToActChat,
  updateActChatSummary,
} from "@/lib/api";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

function ActChatContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [actData, setActData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const [showSummary, setShowSummary] = useState(true);
  const [isCachedSummary, setIsCachedSummary] = useState(false);
  const [isCachedChat, setIsCachedChat] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    
    const actParam = searchParams.get("act");
    if (actParam) {
      try {
        const parsed = JSON.parse(decodeURIComponent(actParam));
        setActData(parsed);
        initializeAct(parsed);
      } catch (err) {
        console.error("Error parsing act data:", err);
        setError("Invalid act data");
        setIsLoading(false);
      }
    } else {
      setError("No act data provided");
      setIsLoading(false);
    }
  }, [searchParams]);

  const initializeAct = async (act) => {
    try {
      setIsLoading(true);
      setError(null);

      // First, try to get existing chat from MongoDB
      try {
        console.log("📥 Checking MongoDB for existing chat...");
        const existingChatResult = await getActChat(act.actId.toString());
        
        if (existingChatResult.success && existingChatResult.chat && existingChatResult.chat.messages.length > 0) {
          console.log("✅ Loaded chat from MongoDB (instant sync)");
          setSummary(existingChatResult.chat.summary);
          setMessages(existingChatResult.chat.messages);
          setIsCachedChat(true);
          setIsLoading(false);
          return;
        } else {
          console.log("📝 No existing chat found, will create new one");
        }
      } catch (dbError) {
        // 404 or other errors - chat doesn't exist yet or DB unavailable
        if (dbError.message.includes('404')) {
          console.log("📝 Chat not found in MongoDB, creating new one");
        } else {
          console.warn("MongoDB error, will fetch fresh data:", dbError.message);
        }
      }

      // First, process the act to ensure it's in the vector DB
      console.log("Processing act...");
      const processResult = await processAct(
        act.actId.toString(),
        act.pdfUrl,
        act.title
      );

      // Get the summary
      console.log("Fetching summary...");
      const summaryResult = await getActSummary(act.actId.toString());
      console.log("Summary result:", summaryResult);

      if (summaryResult && summaryResult.summary) {
        console.log("✅ Summary received:", summaryResult.summary.substring(0, 100) + "...");
        setSummary(summaryResult.summary);
        setIsCachedSummary(false);
        
        // Add welcome message
        const initialMessages = [
          {
            text: `I've analyzed **${act.title}**. Feel free to ask me any questions about this act!`,
            sender: "assistant",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ];
        setMessages(initialMessages);
        
        // Save to MongoDB
        try {
          console.log("💾 Saving chat to MongoDB...");
          const chatResult = await getOrCreateActChat(
            act.actId.toString(),
            act.title,
            act.status,
            act.pdfUrl,
            summaryResult.summary
          );
          
          // Add initial message to MongoDB
          if (chatResult.chat && chatResult.chat.messages.length === 0) {
            await addMessageToActChat(act.actId.toString(), initialMessages[0]);
          }
          
          console.log("✅ Chat saved to MongoDB");
        } catch (dbError) {
          console.warn("Failed to save to MongoDB:", dbError.message);
        }
        
      } else {
        console.log("⚠️ No summary available in response:", summaryResult);
        const fallbackMessages = [
          {
            text: `I'm ready to discuss **${act.title}**. What would you like to know?`,
            sender: "assistant",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ];
        setMessages(fallbackMessages);
        
        // Save fallback to MongoDB
        try {
          await getOrCreateActChat(
            act.actId.toString(),
            act.title,
            act.status,
            act.pdfUrl,
            null
          );
          await addMessageToActChat(act.actId.toString(), fallbackMessages[0]);
        } catch (dbError) {
          console.warn("Failed to save to MongoDB:", dbError.message);
        }
      }
    } catch (err) {
      console.error("Error initializing act:", err);
      setError(err.message || "Failed to load act data");
      setMessages([
        {
          id: 1,
          text: `I'm having trouble loading this act. However, I can try to answer your questions about **${act.title}** based on available information.`,
          sender: "assistant",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isSending || !actData) return;

    const userMessage = {
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updatedMessagesWithUser = [...messages, userMessage];
    setMessages(updatedMessagesWithUser);
    const currentInput = inputMessage;
    setInputMessage("");
    setIsSending(true);

    // Create a placeholder for the assistant's message
    const assistantMessageId = Date.now();
    const initialAssistantMessage = {
      id: assistantMessageId,
      text: "",
      sender: "assistant",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isStreaming: true,
    };

    setMessages((prev) => [...prev, initialAssistantMessage]);

    try {
      // Save user message to MongoDB
      try {
        await addMessageToActChat(actData.actId.toString(), userMessage);
        console.log("💾 User message saved to MongoDB");
      } catch (dbError) {
        console.warn("Failed to save user message to MongoDB:", dbError.message);
      }

      // Stream AI response
      await sendActChatMessage(
        currentInput,
        actData.actId.toString(),
        (chunk) => {
          setMessages((prev) => 
            prev.map((msg) => 
              msg.id === assistantMessageId 
                ? { ...msg, text: msg.text + chunk } 
                : msg
            )
          );
        },
        async (result) => {
          // On complete
          const finalAssistantMessage = {
            ...initialAssistantMessage,
            text: result.response,
            sources: result.sources,
            isStreaming: false,
          };

          setMessages((prev) => 
            prev.map((msg) => 
              msg.id === assistantMessageId 
                ? finalAssistantMessage
                : msg
            )
          );

          // Save assistant message to MongoDB
          try {
            await addMessageToActChat(actData.actId.toString(), finalAssistantMessage);
            console.log("💾 Assistant message saved to MongoDB");
          } catch (dbError) {
            console.warn("Failed to save assistant message to MongoDB:", dbError.message);
          }
          setIsSending(false);
        },
        (error) => {
          // On error
          console.error("Error sending message:", error);
          const errorMessage = {
            text: "Sorry, I encountered an error. Please try again.",
            sender: "assistant",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            isError: true,
          };
          
          setMessages((prev) => prev.filter(msg => msg.id !== assistantMessageId).concat(errorMessage));
          
          // Save error message to MongoDB
          try {
            addMessageToActChat(actData.actId.toString(), errorMessage);
          } catch (dbError) {
            console.warn("Failed to save error message to MongoDB:", dbError.message);
          }
          setIsSending(false);
        }
      );
      
    } catch (err) {
      console.error("Error initiating chat:", err);
      setIsSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!actData && !isLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            No Act Selected
          </h2>
          <p className="text-gray-600 mb-4">
            Please select an act from the acts page to start chatting.
          </p>
          <button
            onClick={() => router.push("/app")}
            className="px-4 py-2 bg-[#B20F38] text-white rounded-lg hover:bg-[#8A0C2D] transition-colors"
          >
            Go to Acts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Chat Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  // Check if opened in new tab, close it; otherwise go back
                  if (window.history.length <= 1 || window.opener) {
                    window.close();
                  } else {
                    router.back();
                  }
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Close"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-2">
                <Scale className="w-5 h-5 text-[#B20F38]" />
                <div>
                  <h1 className="text-lg font-semibold text-gray-800 line-clamp-1">
                    {actData?.title || "Loading..."}
                  </h1>
                  {actData?.status && (
                    <p className="text-xs text-gray-500">{actData.status}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {actData?.pdfUrl && (
                <button
                  onClick={() => window.open(actData.pdfUrl, "_blank")}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm">View PDF</span>
                </button>
              )}
              <button
                onClick={() => setShowSummary(!showSummary)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  showSummary
                    ? "bg-[#B20D38] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <BarChart3 size={18} />
                <span className="hidden sm:inline text-sm">Summary</span>
              </button>
            </div>
          </div>
        </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Loader2 className="w-8 h-8 text-[#B20F38] animate-spin mx-auto mb-2" />
              <p className="text-gray-600">Loading act data...</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                key={message._id || `message-${index}-${message.timestamp}`}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-3 ${
                    message.sender === "user"
                      ? "bg-[#B20F38] text-white"
                      : message.isError
                      ? "bg-red-50 text-red-800 border border-red-200"
                      : "bg-white text-gray-800 border border-gray-200"
                  }`}
                >
                  <div className={`chat-markdown ${message.sender === "user" ? "user-message" : ""}`}>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {message.text}
                    </ReactMarkdown>
                  </div>
                  <div
                    className={`text-xs mt-2 ${
                      message.sender === "user"
                        ? "text-white/70"
                        : "text-gray-500"
                    }`}
                  >
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}
            {isSending && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 border border-gray-200 rounded-lg px-4 py-3">
                  <Loader2 className="w-5 h-5 animate-spin text-[#B20F38]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex items-end space-x-3">
            <textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything about this act..."
              disabled={isLoading || isSending}
              className="flex-1 resize-none border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#B20F38] focus:ring-1 focus:ring-[#B20F38] disabled:bg-gray-100 disabled:cursor-not-allowed"
              rows={2}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading || isSending}
              className="px-6 py-3 bg-[#B20F38] text-white rounded-lg hover:bg-[#8A0C2D] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Panel */}
      {showSummary && (
        <div className="fixed md:static right-0 top-0 w-80 md:w-96 h-full bg-white border-l border-gray-200 flex flex-col z-20 shadow-lg animate-slide-in">
          <div className="px-6 py-4 bg-[#B20F38] flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <BarChart3 size={20} className="text-white" />
              <h3 className="text-lg font-semibold text-white">Act Summary</h3>
            </div>
            <button
              onClick={() => setShowSummary(false)}
              className="text-white hover:text-gray-200 transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-center">
                  <Loader2 className="w-6 h-6 text-[#B20F38] animate-spin mx-auto mb-2" />
                  <p className="text-xs text-gray-500">Loading summary...</p>
                </div>
              </div>
            ) : summary ? (
              <>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-red-100">
                  <div className="chat-markdown">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {summary}
                    </ReactMarkdown>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <Scale className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">Act summary will appear here once processed.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ActChatPage() {
  return (
    <ProtectedRoute>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-red-800 mx-auto mb-4" />
              <p className="text-gray-600">Loading act chat...</p>
            </div>
          </div>
        }
      >
        <ActChatContent />
      </Suspense>
      <style jsx global>{`
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
    </ProtectedRoute>
  );
}
