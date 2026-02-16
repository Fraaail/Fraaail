import React, { useState, useRef, useEffect } from 'react';
import { WindowFrame } from '../Layout/WindowFrame';
import { ChatMessage } from '../../types';
import { streamChatResponse } from '../../services/geminiService';
import { Send, Bot, User, Trash2 } from 'lucide-react';

export const AiChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Greetings. I am the system AI. Ask me anything about @Fraaail's projects, skills, or configuration.", timestamp: Date.now() }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
        // Create a placeholder for the bot response
        const botMsgPlaceholder: ChatMessage = { role: 'model', text: '', timestamp: Date.now() };
        setMessages(prev => [...prev, botMsgPlaceholder]);

        const stream = await streamChatResponse(
            userMsg.text, 
            messages.map(m => ({ role: m.role, text: m.text }))
        );

        let fullText = "";
        for await (const chunk of stream) {
            fullText += chunk;
            setMessages(prev => {
                const newHistory = [...prev];
                const lastMsg = newHistory[newHistory.length - 1];
                if (lastMsg.role === 'model') {
                    lastMsg.text = fullText;
                }
                return newHistory;
            });
        }
    } catch (err) {
        console.error(err);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="p-4 h-full max-w-4xl mx-auto">
      <WindowFrame title="gemini-cli" isActive={true} className="h-full flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
               
               {msg.role === 'model' && (
                 <div className="w-8 h-8 rounded-sm bg-neutral-800 flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-green-400" />
                 </div>
               )}

               <div className={`
                 max-w-[80%] p-3 rounded-sm leading-relaxed border
                 ${msg.role === 'user' 
                   ? 'bg-neutral-900 border-neutral-700 text-neutral-200' 
                   : 'bg-black border-neutral-800 text-neutral-300'}
               `}>
                 <p className="whitespace-pre-wrap">{msg.text}</p>
                 {msg.role === 'model' && msg.text.length === 0 && (
                     <span className="inline-block w-2 h-4 bg-green-500 animate-pulse ml-1 align-middle"></span>
                 )}
               </div>

               {msg.role === 'user' && (
                 <div className="w-8 h-8 rounded-sm bg-white flex items-center justify-center flex-shrink-0">
                    <User size={16} className="text-black" />
                 </div>
               )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800">
           <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
              <span className="text-green-400 font-bold">➜</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter command..."
                className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder-neutral-600 h-10"
                autoFocus
              />
              {isLoading ? (
                  <div className="animate-spin w-4 h-4 border-2 border-neutral-600 border-t-white rounded-full"></div>
              ) : (
                  <button type="submit" disabled={!input.trim()} className="text-neutral-500 hover:text-white disabled:opacity-50">
                     <Send size={16} />
                  </button>
              )}
           </form>
           <div className="absolute top-2 right-4">
              <button 
                onClick={() => setMessages([])} 
                className="text-xs text-neutral-600 hover:text-red-400 flex items-center gap-1 transition-colors"
                title="Clear History"
              >
                  <Trash2 size={12} /> clear
              </button>
           </div>
        </div>
      </WindowFrame>
    </div>
  );
};
