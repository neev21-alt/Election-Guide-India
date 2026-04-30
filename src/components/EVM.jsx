import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CANDIDATES = [
  { id: 1, name: 'National Progress Party', symbol: '🚀', color: '#FF9933', braille: '⠂' },
  { id: 2, name: 'Unity & Harmony Alliance', symbol: '🤝', color: '#138808', braille: '⠆' },
  { id: 3, name: 'Democratic Citizens Front', symbol: '⚖️', color: '#000080', braille: '⠒' },
  { id: 4, name: 'Green Earth Initiative', symbol: '🌳', color: '#22C55E', braille: '⠲' },
  { id: 5, name: 'NOTA (None of the Above)', symbol: '❌', color: '#DB2777', braille: '⠢', isNota: true },
];

const EVM = () => {
  const [activeCandidate, setActiveCandidate] = useState(null);
  const [isVoting, setIsVoting] = useState(false);
  const [showVVPAT, setShowVVPAT] = useState(false);
  const [vvpatCandidate, setVvpatCandidate] = useState(null);

  const playBeep = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
    }, 500);
  };

  const handleVote = (candidate) => {
    if (isVoting) return;
    
    setIsVoting(true);
    setActiveCandidate(candidate.id);
    playBeep();

    setTimeout(() => {
      setVvpatCandidate(candidate);
      setShowVVPAT(true);
      
      // Reset EVM lights after beep/initial feedback
      setActiveCandidate(null);
    }, 500);

    // VVPAT shows for 7 seconds as requested
    setTimeout(() => {
      setShowVVPAT(false);
      setIsVoting(false);
      setVvpatCandidate(null);
    }, 7500);
  };

  return (
    <div className="evm-container" style={{ display: 'flex', gap: '2rem', padding: '2rem', justifyContent: 'center', alignItems: 'flex-start' }}>
      {/* Balloting Unit */}
      <div className="glass-card" style={{ width: '400px', padding: '2rem', background: '#e5e7eb' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ color: '#1e293b' }}>Balloting Unit</h2>
          <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Select your candidate by pressing the blue button</p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {CANDIDATES.map((candidate) => (
            <div key={candidate.id} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem', 
              background: 'white', 
              padding: '1rem', 
              borderRadius: '0.5rem',
              border: candidate.isNota ? '2px solid #DB2777' : '1px solid #cbd5e1'
            }}>
              <div style={{ width: '40px', fontSize: '1.5rem' }}>{candidate.symbol}</div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontWeight: '600' }}>{candidate.name}</div>
                <div style={{ fontSize: '0.65rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Braille: <span title="Braille accessibility feature for visually impaired voters" style={{ fontSize: '1rem', color: '#64748b', cursor: 'help' }}>{candidate.braille}</span>
                </div>
              </div>
              
              <div className={`red-led ${activeCandidate === candidate.id ? 'active' : ''}`} />
              
              <button 
                className="evm-button"
                onClick={() => handleVote(candidate)}
                disabled={isVoting}
                style={{
                  width: '50px',
                  height: '35px',
                  backgroundColor: candidate.isNota ? '#DB2777' : '#000080',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: isVoting ? 'not-allowed' : 'pointer',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
                  transition: 'transform 0.1s'
                }}
                onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
                onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
              />
            </div>
          ))}
        </div>
      </div>

      {/* VVPAT Unit */}
      <div className="vvpat-unit" style={{ width: '300px', position: 'relative' }}>
        <div className="glass-card" style={{ height: '400px', background: '#334155', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ color: 'white', textAlign: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem' }}>VVPAT UNIT</h3>
          </div>
          
          <div style={{ 
            flex: 1, 
            background: '#0f172a', 
            borderRadius: '0.5rem', 
            overflow: 'hidden', 
            position: 'relative',
            border: '8px solid #475569'
          }}>
            <AnimatePresence>
              {showVVPAT && vvpatCandidate && (
                <motion.div
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 200, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    background: 'white',
                    width: '80%',
                    height: '150px',
                    margin: '20px auto',
                    padding: '1rem',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'monospace'
                  }}
                >
                  <div style={{ fontSize: '2rem' }}>{vvpatCandidate.symbol}</div>
                  <div style={{ fontWeight: 'bold', marginTop: '0.5rem', textAlign: 'center' }}>{vvpatCandidate.name}</div>
                  <div style={{ fontSize: '0.75rem', marginTop: '1rem', borderTop: '1px dashed #ccc', paddingTop: '0.5rem', width: '100%' }}>
                    ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* VVPAT Glass overlay */}
            <div style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              background: 'linear-gradient(rgba(255,255,255,0.1), transparent)',
              pointerEvents: 'none'
            }} />
          </div>
          
          <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '1rem', textAlign: 'center' }}>
            The slip will be visible for 7 seconds.
          </div>
        </div>
      </div>
    </div>
  );
};

export default EVM;
