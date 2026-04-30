import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, MousePointer2, ChevronRight, ChevronLeft, CheckCircle, XCircle } from 'lucide-react';

const DOCUMENTS = [
  { id: 'voter', name: 'Voter ID (EPIC)', valid: true, reason: 'Primary document for voting.' },
  { id: 'aadhaar', name: 'Aadhaar Card', valid: true, reason: 'Valid as a secondary identity document.' },
  { id: 'pan', name: 'PAN Card', valid: true, reason: 'Valid government ID.' },
  { id: 'passport', name: 'Passport', valid: true, reason: 'Valid as a proof of identity.' },
  { id: 'college', name: 'College ID', valid: false, reason: 'Generally invalid, use Govt. ID' }
];

const STEPS = [
  {
    title: 'Verification',
    icon: Search,
    text: 'First, the polling official checks your name on the voter list and verifies your ID (Voter ID, Aadhaar, etc.).',
    image: '👤'
  },
  {
    title: 'Inking',
    icon: PenTool,
    text: 'The second official will mark your finger with indelible ink and take your signature.',
    image: '🖋️'
  },
  {
    title: 'Voting',
    icon: MousePointer2,
    text: 'Enter the voting compartment and press the blue button next to the candidate of your choice on the EVM.',
    image: '🗳️'
  },
  {
    title: 'Confirmation',
    icon: Search, // Using Search as a proxy for VVPAT
    text: 'Check the VVPAT slip through the glass window. It will show the candidate you voted for.',
    image: '📄'
  }
];

const PollingGuide = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDoc, setSelectedDoc] = useState(null);

  return (
    <div className="glass-card" style={{ padding: '3rem', maxWidth: '800px', margin: '2rem auto', textAlign: 'center' }}>
      <h2 style={{ marginBottom: '2rem' }}>Steps at the Polling Booth</h2>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
        {STEPS.map((_, index) => (
          <div key={index} style={{ 
            width: '40px', 
            height: '4px', 
            background: index === currentStep ? 'var(--color-navy)' : '#e2e8f0',
            borderRadius: '2px',
            transition: 'background 0.3s'
          }} />
        ))}
      </div>

      <div style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>{STEPS[currentStep].image}</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{STEPS[currentStep].title}</h3>
          <p style={{ color: '#64748b', fontSize: '1.125rem', maxWidth: '500px', margin: '0 auto' }}>
            {STEPS[currentStep].text}
          </p>
        </motion.div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
        <button 
          onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
          disabled={currentStep === 0}
          className="btn-primary"
          style={{ background: '#f1f5f9', color: '#64748b', opacity: currentStep === 0 ? 0.5 : 1 }}
        >
          <ChevronLeft style={{ marginRight: '0.5rem' }} /> Previous
        </button>
        
        {currentStep < STEPS.length - 1 ? (
          <button 
            onClick={() => setCurrentStep(prev => Math.min(STEPS.length - 1, prev + 1))}
            className="btn-primary"
          >
            Next Step <ChevronRight style={{ marginLeft: '0.5rem' }} />
          </button>
        ) : (
          <button className="btn-primary" style={{ background: 'var(--color-green)' }}>
            Got it!
          </button>
        )}
      </div>

      <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #e2e8f0', textAlign: 'left' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', textAlign: 'center' }}>Document Validator (Mock)</h3>
        <p style={{ color: '#64748b', marginBottom: '1.5rem', textAlign: 'center' }}>Select the ID you plan to bring to check if it's valid for voting:</p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1.5rem' }}>
          {DOCUMENTS.map(doc => (
            <button
              key={doc.id}
              onClick={() => setSelectedDoc(doc)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                border: `2px solid ${selectedDoc?.id === doc.id ? 'var(--color-navy)' : '#cbd5e1'}`,
                background: selectedDoc?.id === doc.id ? '#f8fafc' : 'white',
                cursor: 'pointer',
                fontWeight: 500,
                color: 'var(--color-slate-900)',
                transition: 'all 0.2s'
              }}
            >
              {doc.name}
            </button>
          ))}
        </div>
        
        {selectedDoc && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ 
              padding: '1.5rem', 
              borderRadius: '0.75rem', 
              background: selectedDoc.valid ? '#E6F4E6' : '#FEE2E2',
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start',
              maxWidth: '500px',
              margin: '0 auto'
            }}
          >
            {selectedDoc.valid ? <CheckCircle color="var(--color-green)" /> : <XCircle color="#EF4444" />}
            <div>
              <h4 style={{ color: selectedDoc.valid ? 'var(--color-green)' : '#EF4444', marginBottom: '0.25rem', textAlign: 'left' }}>
                {selectedDoc.valid ? 'Valid Document' : 'Invalid Document'}
              </h4>
              <p style={{ color: '#334155', fontSize: '0.875rem', textAlign: 'left' }}>{selectedDoc.reason}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PollingGuide;
