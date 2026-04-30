import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Bot, User, Key, ShieldCheck, Volume2, Mic, Languages } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const Assistant = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Namaste! I am your Election Guide. How can I help you today regarding the Indian Election process?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [language, setLanguage] = useState('English');
  const scrollRef = useRef(null);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'Hindi' ? 'hi-IN' : 'en-IN';
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Browser does not support Speech Recognition.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = language === 'Hindi' ? 'hi-IN' : 'en-IN';
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.start();
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    if (!apiKey) {
      setTimeout(() => {
        const text = language === 'Hindi' 
          ? 'कृपया वास्तविक समय एआई प्रतिक्रियाओं को सक्षम करने के लिए सेटिंग्स में एक जेमिनी एपीआई कुंजी प्रदान करें।' 
          : 'Please provide a Gemini API Key in the settings to enable real-time AI responses.';
        setMessages(prev => [...prev, { role: 'bot', text }]);
        setIsTyping(false);
      }, 1000);
      return;
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: `You are a neutral, helpful Election Commission guide for India. Respond in ${language}. Your goal is to educate citizens about the election process. Only answer questions related to elections and democracy in India. Keep responses concise and accurate.`
      });

      const chat = model.startChat({
        history: messages.map(m => ({
          role: m.role === 'bot' ? 'model' : 'user',
          parts: [{ text: m.text }],
        })),
      });

      const result = await chat.sendMessage(input);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'bot', text }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "I encountered an error connecting to the Gemini API." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="glass-card" style={{ height: '600px', maxWidth: '700px', margin: '2rem auto', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '1rem', background: 'var(--color-navy)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Bot size={20} />
          <h3 style={{ fontSize: '1rem' }}>ECI AI Assistant</h3>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button 
            onClick={() => setLanguage(prev => prev === 'English' ? 'Hindi' : 'English')}
            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '0.4rem 0.75rem', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}
          >
            <Languages size={14} /> {language}
          </button>
          <button 
            onClick={() => setShowKeyInput(!showKeyInput)}
            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '0.4rem', borderRadius: '0.5rem', cursor: 'pointer' }}
            title="API Settings"
          >
            <Key size={18} />
          </button>
        </div>
      </div>

      {showKeyInput && (
        <div style={{ padding: '1rem', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <ShieldCheck size={18} color="#64748b" />
          <input 
            type="password" 
            placeholder="Enter Gemini API Key..." 
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            style={{ flex: 1, padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
          />
          <button 
            onClick={() => setShowKeyInput(false)}
            className="btn-primary" 
            style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}
          >
            Save
          </button>
        </div>
      )}

      <div ref={scrollRef} style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ 
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '85%',
            display: 'flex',
            gap: '0.5rem',
            flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
          }}>
            <div style={{ 
              padding: '0.75rem 1rem', 
              borderRadius: '1rem',
              background: msg.role === 'user' ? 'var(--color-navy)' : '#f1f5f9',
              color: msg.role === 'user' ? 'white' : 'inherit',
              boxShadow: 'var(--shadow-sm)',
              fontSize: '0.9375rem',
              lineHeight: '1.5',
              position: 'relative'
            }}>
              {msg.text}
              {msg.role === 'bot' && (
                <button 
                  onClick={() => speak(msg.text)}
                  style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '2px', marginLeft: '8px', verticalAlign: 'middle' }}
                  title="Listen"
                >
                  <Volume2 size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div style={{ color: '#64748b', fontSize: '0.875rem' }}>Assistant is thinking...</div>
        )}
      </div>

      <div style={{ padding: '1rem', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '0.5rem' }}>
        <button 
          onClick={startListening}
          style={{ background: '#f1f5f9', border: 'none', color: '#64748b', padding: '0.75rem', borderRadius: '0.5rem', cursor: 'pointer' }}
          title="Voice Input"
        >
          <Mic size={18} />
        </button>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder={language === 'Hindi' ? "पंजीकरण के बारे में पूछें..." : "Ask about registration..."}
          style={{ 
            flex: 1, 
            padding: '0.75rem', 
            borderRadius: '0.5rem', 
            border: '1px solid #e2e8f0',
            outline: 'none'
          }}
        />
        <button 
          onClick={handleSend}
          disabled={isTyping}
          className="btn-primary" 
          style={{ padding: '0.75rem' }}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default Assistant;
