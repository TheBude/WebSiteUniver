import React, { useState, useEffect, useRef } from 'react';
import { translate } from '../i18n';
import { getChatBotAnswer, quickPromptChips } from '../utils/samduChatEngine';
import './SamduChatBot.css';

export default function SamduChatBot({ language = 'uz', onNavigate }) {
  const t = (key) => translate(key, language);

  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Dastlabki salomlashuv xabari
  const initialBotMessage = {
    id: 'welcome',
    sender: 'bot',
    text: getChatBotAnswer('', language).text,
    suggestions: quickPromptChips[language] || quickPromptChips.uz,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };

  const [messages, setMessages] = useState([initialBotMessage]);

  // Til o'zgarganda dastlabki xabarni yangilash (agar foydalanuvchi hali yozmagan bo'lsa)
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length <= 1) {
        return [{
          id: 'welcome',
          sender: 'bot',
          text: getChatBotAnswer('', language).text,
          suggestions: quickPromptChips[language] || quickPromptChips.uz,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }];
      }
      return prev;
    });
  }, [language]);

  // Xabarlar ro'yxati pastiga avtomatik tushish
  useEffect(() => {
    if (isOpen && typeof messagesEndRef.current?.scrollIntoView === 'function') {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Chat ochilganda inputga fokus qilish
  useEffect(() => {
    if (isOpen) {
      setShowGreeting(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // AI bot javobini qidirish va tabiiy yozish effekti (400ms kechikish)
    setTimeout(() => {
      const answer = getChatBotAnswer(query, language);
      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: answer.text,
        link: answer.link,
        suggestions: answer.suggestions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  const handleDeepLink = (hash) => {
    if (onNavigate) {
      onNavigate(hash);
    } else {
      window.location.hash = hash;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Mobil qurilmada chatni avtomatik kichraytirish
    if (window.innerWidth < 640) {
      setIsOpen(false);
    }
  };

  const handleResetChat = () => {
    setMessages([{
      id: 'welcome-' + Date.now(),
      sender: 'bot',
      text: getChatBotAnswer('', language).text,
      suggestions: quickPromptChips[language] || quickPromptChips.uz,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
  };

  return (
    <>
      {/* 1. Suzuvchi trigger tugmasi va popup */}
      <div className="samdu-chat-trigger-wrap" aria-label={t('SamDU AI Maslahatchi')}>
        {showGreeting && !isOpen && (
          <div
            className="samdu-chat-greeting-bubble"
            onClick={() => setIsOpen(true)}
            role="button"
            tabIndex={0}
          >
            <span>💬 {t('Savolingiz bormi? Yordam beraman!')}</span>
            <button
              type="button"
              className="samdu-chat-greeting-close"
              onClick={(e) => {
                e.stopPropagation();
                setShowGreeting(false);
              }}
              aria-label={t('Menyuni yopish')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}

        <button
          type="button"
          className="samdu-chat-trigger-btn"
          onClick={() => setIsOpen((prev) => !prev)}
          title={isOpen ? t('Chatni yopish') : t('SamDU AI Maslahatchi')}
          aria-label={isOpen ? t('Chatni yopish') : t('SamDU AI Maslahatchi')}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
        >
          {!isOpen && <span className="samdu-chat-badge-pulse" aria-hidden="true" />}
          {isOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="26" height="26">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          )}
        </button>
      </div>

      {/* 2. Asosiy Chat Oynasi */}
      {isOpen && (
        <aside
          className="samdu-chat-window"
          role="dialog"
          aria-modal="true"
          aria-labelledby="samdu-chat-title"
        >
          {/* Header */}
          <div className="samdu-chat-header">
            <div className="samdu-chat-header-info">
              <div className="samdu-chat-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <rect x="3" y="11" width="18" height="10" rx="2" />
                  <circle cx="12" cy="5" r="2" />
                  <path d="M12 7v4M8 16h.01M16 16h.01" />
                </svg>
                <span className="samdu-chat-avatar-status" />
              </div>
              <div className="samdu-chat-title-box">
                <h3 id="samdu-chat-title">{t('SamDU AI Maslahatchi')}</h3>
                <p>{t('Onlayn yordamchi')}</p>
              </div>
            </div>

            <div className="samdu-chat-header-actions">
              <button
                type="button"
                className="samdu-chat-tool-btn"
                onClick={handleResetChat}
                title={t('Yangi suhbat')}
                aria-label={t('Yangi suhbat')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                  <path d="M3 21v-5h5" />
                </svg>
              </button>

              <button
                type="button"
                className="samdu-chat-tool-btn"
                onClick={() => setIsOpen(false)}
                title={t('Chatni yopish')}
                aria-label={t('Chatni yopish')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="14" height="14">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Habarlar maydoni */}
          <div className="samdu-chat-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`samdu-chat-msg ${msg.sender === 'user' ? 'is-user' : 'is-bot'}`}
              >
                <div className="samdu-chat-bubble">
                  {msg.text}
                </div>

                {/* Deep link tugmasi */}
                {msg.link && (
                  <button
                    type="button"
                    className="samdu-chat-deeplink-btn"
                    onClick={() => handleDeepLink(msg.link.hash)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    <span>{msg.link.label || t('Sahifani ochish')}</span>
                  </button>
                )}

                {/* Tavsiya etilgan keyingi savollar chiplari */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="samdu-chat-suggestions-wrap">
                    {msg.suggestions.map((suggestion, sIdx) => (
                      <button
                        key={sIdx}
                        type="button"
                        className="samdu-chat-suggestion-chip"
                        onClick={() => handleSendMessage(suggestion)}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Yozish animatsiyasi indikatori */}
            {isTyping && (
              <div className="samdu-chat-msg is-bot">
                <div className="samdu-chat-typing-bubble" aria-label="AI javob yozmoqda...">
                  <span className="samdu-chat-typing-dot" />
                  <span className="samdu-chat-typing-dot" />
                  <span className="samdu-chat-typing-dot" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Tezkor mavzular paneli (Quick Chips) */}
          <div className="samdu-chat-quick-chips">
            {(quickPromptChips[language] || quickPromptChips.uz).map((chip, idx) => (
              <button
                key={idx}
                type="button"
                className="samdu-chat-suggestion-chip"
                onClick={() => handleSendMessage(chip)}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Kiritish formasi */}
          <form className="samdu-chat-input-form" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              className="samdu-chat-input"
              placeholder={t('Savolingizni yozing...')}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
            />
            <button
              type="submit"
              className="samdu-chat-send-btn"
              disabled={!input.trim() || isTyping}
              title={t('Yuborish')}
              aria-label={t('Yuborish')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="16" height="16">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </aside>
      )}
    </>
  );
}
