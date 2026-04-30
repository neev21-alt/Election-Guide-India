import React, { useState } from 'react';
import { CheckCircle2, Circle, AlertCircle } from 'lucide-react';

const Eligibility = () => {
  const [checks, setChecks] = useState({
    citizenship: false,
    age: false,
    residence: false,
    notDisqualified: false,
  });

  const toggleCheck = (key) => {
    setChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isEligible = Object.values(checks).every(v => v);

  const criteria = [
    { id: 'citizenship', label: 'I am a Citizen of India.' },
    { id: 'age', label: 'I am 18 years of age or older as of Jan 1st.' },
    { id: 'residence', label: 'I am an Ordinary Resident in the constituency.' },
    { id: 'notDisqualified', label: 'I am not disqualified by any law.' },
  ];

  return (
    <div className="glass-card" style={{ padding: '2rem', maxWidth: '600px', margin: '2rem auto' }}>
      <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <CheckCircle2 color="var(--color-green)" /> Am I Eligible?
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {criteria.map((item) => (
          <div 
            key={item.id} 
            onClick={() => toggleCheck(item.id)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem', 
              padding: '1rem', 
              background: 'white', 
              borderRadius: '0.75rem',
              cursor: 'pointer',
              border: `2px solid ${checks[item.id] ? 'var(--color-green)' : 'transparent'}`,
              transition: 'all 0.2s'
            }}
          >
            {checks[item.id] ? (
              <CheckCircle2 color="var(--color-green)" fill="#E6F4E6" />
            ) : (
              <Circle color="#cbd5e1" />
            )}
            <span style={{ fontWeight: 500 }}>{item.label}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', padding: '1.5rem', borderRadius: '1rem', background: isEligible ? '#E6F4E6' : '#F1F5F9', transition: 'all 0.3s' }}>
        {isEligible ? (
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'var(--color-green)', marginBottom: '0.5rem' }}>You are Eligible!</h3>
            <p style={{ color: '#166534' }}>You can now proceed to register using Form 6 on the official ECI Voter Portal.</p>
            <a 
              href="https://voters.eci.gov.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary pulse-button" 
              style={{ marginTop: '1rem', display: 'inline-block', textDecoration: 'none' }}
            >
              Register Here
            </a>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <AlertCircle color="#64748b" />
            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
              Please check all boxes to confirm your eligibility. If you meet all criteria, you are ready to participate in the democratic process!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Eligibility;
