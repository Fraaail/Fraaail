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
      <WindowFrame title="gemini-cli" isActive={true} className="h-full flex flex-col border-purple-500">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm bg-black/95 scrollbar-hide">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
               
               {msg.role === 'model' && (
                 <div className="w-8 h-8 rounded bg-[#1a0b2e] border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-purple-400" />
                 </div>
               )}

               <div className={`
                 max-w-[80%] p-3 rounded-lg leading-relaxed border shadow-sm
                 ${msg.role === 'user' 
                   ? 'bg-purple-900/20 border-purple-500/50 text-purple-100 rounded-tr-none' 
                   : 'bg-[#111] border-neutral-800 text-neutral-300 rounded-tl-none'}
               `}>
                 <p className="whitespace-pre-wrap">{msg.text}</p>
                 {msg.role === 'model' && msg.text.length === 0 && (
                     <span className="inline-block w-2 h-4 bg-purple-500 animate-pulse ml-1 align-middle"></span>
                 )}
               </div>

               {msg.role === 'user' && (
                 <div className="w-8 h-8 rounded bg-white flex items-center justify-center flex-shrink-0">
                    <User size={16} className="text-black" />
                 </div>
               )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-[#0a0a0a] border-t border-purple-900/30">
           <form onSubmit={handleSubmit} className="relative flex items-center gap-3">
              <span className="text-purple-500 font-bold">➜</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask the AI..."
                className="flex-1 bg-neutral-900/50 border border-neutral-800 focus:border-purple-500 rounded px-3 h-10 outline-none text-white font-mono placeholder-neutral-600 transition-colors"
                autoFocus
              />
              {isLoading ? (
                  <div className="animate-spin w-5 h-5 border-2 border-neutral-600 border-t-purple-500 rounded-full"></div>
              ) : (
                  <button type="submit" disabled={!input.trim()} className="text-neutral-500 hover:text-purple-400 disabled:opacity-30 transition-colors">
                     <Send size={18} />
                  </button>
              )}
           </form>
           <div className="absolute top-2 right-4">
              <button 
                onClick={() => setMessages([])} 
                className="text-[10px] text-neutral-700 hover:text-red-400 flex items-center gap-1 transition-colors uppercase tracking-widest"
                title="Clear History"
              >
                  <Trash2 size={10} /> clear
              </button>
           </div>
        </div>
      </WindowFrame>
    </div>
  );
};
