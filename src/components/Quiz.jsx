import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, RotateCcw, CheckCircle, XCircle, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

const QUESTIONS = [
  {
    question: "What is the minimum age to vote in Indian General Elections?",
    options: ["16 years", "18 years", "21 years", "25 years"],
    correct: 1
  },
  {
    question: "What does VVPAT stand for?",
    options: [
      "Voter Verified Paper Audit Trail",
      "Voter Valued Paper Account Track",
      "Voter Verified Print Audit Test",
      "Verified Voter Paper Audit Tool"
    ],
    correct: 0
  },
  {
    question: "Can an Indian citizen living abroad (NRI) vote in elections?",
    options: ["Yes, online", "No, they cannot vote", "Yes, but they must be present at the booth", "Yes, via post"],
    correct: 2
  },
  {
    question: "Who appoints the Chief Election Commissioner of India?",
    options: ["The Prime Minister", "The Chief Justice", "The President of India", "The Parliament"],
    correct: 2
  },
  {
    question: "Which ink is used to mark the finger of a voter?",
    options: ["Silver Nitrate Ink", "Permanent Marker", "Food Color Ink", "Iron Oxide Ink"],
    correct: 0
  }
];

const Quiz = () => {
  const [currentStep, setCurrentStep] = useState('start'); // start, quiz, result
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [userName, setUserName] = useState('');

  const handleStart = () => {
    setCurrentStep('quiz');
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswers([]);
  };

  const handleAnswer = (index) => {
    const isCorrect = index === QUESTIONS[currentQuestion].correct;
    if (isCorrect) setScore(prev => prev + 1);
    
    setUserAnswers([...userAnswers, index]);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setCurrentStep('result');
      if (score + (isCorrect ? 1 : 0) === QUESTIONS.length) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF9933', '#FFFFFF', '#138808']
        });
      }
    }
  };

  const downloadBadge = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Border
    ctx.strokeStyle = '#FF9933';
    ctx.lineWidth = 10;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
    ctx.strokeStyle = '#138808';
    ctx.lineWidth = 10;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Text
    ctx.fillStyle = '#000080';
    ctx.font = 'bold 36px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Democracy Champion', canvas.width / 2, 80);

    ctx.fillStyle = '#138808';
    ctx.font = '24px sans-serif';
    ctx.fillText('This certifies that', canvas.width / 2, 140);

    ctx.fillStyle = '#334155';
    ctx.font = 'bold 48px sans-serif';
    ctx.fillText(userName || 'Smart Voter', canvas.width / 2, 210);

    ctx.fillStyle = '#64748b';
    ctx.font = '18px sans-serif';
    ctx.fillText('has demonstrated excellent knowledge of the', canvas.width / 2, 280);
    ctx.fillText('Indian Election Process', canvas.width / 2, 310);

    // Download
    const link = document.createElement('a');
    link.download = 'Democracy-Champion-Badge.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="glass-card" style={{ padding: '3rem', maxWidth: '700px', margin: '2rem auto', textAlign: 'center' }}>
      <AnimatePresence mode="wait">
        {currentStep === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div style={{ width: '80px', height: '80px', background: '#FEF3C7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Trophy color="#D97706" size={40} />
            </div>
            <h2 style={{ marginBottom: '1rem' }}>Test Your Voter IQ</h2>
            <p style={{ color: '#64748b', marginBottom: '2rem' }}>
              Are you a smart voter? Take this quick 5-question quiz to find out and earn your "Smart Voter" badge!
            </p>
            <input 
              type="text" 
              placeholder="Enter your name for the certificate..." 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              style={{ 
                display: 'block', 
                margin: '0 auto 1.5rem', 
                padding: '0.75rem', 
                borderRadius: '0.5rem', 
                border: '1px solid #cbd5e1', 
                width: '100%', 
                maxWidth: '300px',
                textAlign: 'center',
                fontSize: '1rem'
              }}
            />
            <button 
              className="btn-primary" 
              onClick={handleStart} 
              disabled={!userName.trim()}
              style={{ padding: '1rem 2rem', fontSize: '1.125rem', opacity: !userName.trim() ? 0.5 : 1 }}
            >
              Start Quiz
            </button>
          </motion.div>
        )}

        {currentStep === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#94a3b8' }}>
                QUESTION {currentQuestion + 1} OF {QUESTIONS.length}
              </span>
              <div style={{ width: '100px', height: '6px', background: '#e2e8f0', borderRadius: '3px' }}>
                <div style={{ 
                  width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%`, 
                  height: '100%', 
                  background: 'var(--color-navy)', 
                  borderRadius: '3px',
                  transition: 'width 0.3s'
                }} />
              </div>
            </div>

            <h3 style={{ fontSize: '1.25rem', marginBottom: '2rem', textAlign: 'left' }}>
              {QUESTIONS[currentQuestion].question}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {QUESTIONS[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  style={{
                    padding: '1rem 1.5rem',
                    textAlign: 'left',
                    background: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.75rem',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 500,
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                  }}
                  onMouseEnter={(e) => e.target.style.borderColor = 'var(--color-navy)'}
                  onMouseLeave={(e) => e.target.style.borderColor = '#e2e8f0'}
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {currentStep === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {score === QUESTIONS.length ? (
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.5rem' }}>
                  <Award size={100} color="#FF9933" />
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    transition={{ delay: 0.5 }}
                    style={{ position: 'absolute', bottom: 0, right: 0, background: 'var(--color-green)', borderRadius: '50%', padding: '4px' }}
                  >
                    <CheckCircle color="white" size={24} />
                  </motion.div>
                </div>
                <h2 style={{ color: 'var(--color-green)' }}>Perfect Score!</h2>
                <p style={{ color: '#64748b', marginTop: '0.5rem' }}>You are a Democracy Champion!</p>
              </div>
            ) : (
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ marginBottom: '0.5rem' }}>Your Score: {score}/{QUESTIONS.length}</h2>
                <p style={{ color: '#64748b' }}>
                  {score >= 3 ? "Good job! You know your elections." : "Keep learning about the democratic process!"}
                </p>
              </div>
            )}

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '1rem', marginBottom: '2rem', textAlign: 'left' }}>
              <h4 style={{ marginBottom: '1rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Review Answers</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {QUESTIONS.map((q, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9375rem' }}>
                    {userAnswers[i] === q.correct ? <CheckCircle size={16} color="var(--color-green)" /> : <XCircle size={16} color="#ef4444" />}
                    <span style={{ color: '#334155' }}>Question {i + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn-primary" onClick={handleStart} style={{ background: '#f1f5f9', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <RotateCcw size={18} /> Retry
              </button>
              {score === QUESTIONS.length && (
                <button className="btn-primary" onClick={downloadBadge} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Download size={18} /> Get Badge
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
