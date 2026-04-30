import React from 'react';
import { Calendar, Bell, FileText, UserCheck, Vote, Award } from 'lucide-react';

const STAGES = [
  { id: 1, title: 'Notification', desc: 'Election Commission issues the formal notice.', icon: Bell, color: '#FF9933' },
  { id: 2, title: 'Nominations', desc: 'Candidates file their papers for the election.', icon: FileText, color: '#334155' },
  { id: 3, title: 'Scrutiny', desc: 'Papers are checked for validity and correctness.', icon: UserCheck, color: '#334155' },
  { id: 4, title: 'Campaigning', desc: 'Candidates present their manifestos to the public.', icon: Calendar, color: '#334155' },
  { id: 5, title: 'Polling Day', desc: 'Citizens cast their votes at designated booths.', icon: Vote, color: '#138808' },
  { id: 6, title: 'Counting', desc: 'Votes are counted and results are declared.', icon: Award, color: '#000080' },
];

const Timeline = () => {
  return (
    <div className="glass-card" style={{ padding: '3rem', maxWidth: '800px', margin: '2rem auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Election Journey Timeline</h2>
      
      <div style={{ position: 'relative' }}>
        {/* The line */}
        <div style={{ 
          position: 'absolute', 
          left: '24px', 
          top: '0', 
          bottom: '0', 
          width: '2px', 
          background: 'linear-gradient(to bottom, #FF9933, #138808, #000080)',
          zIndex: 0
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {STAGES.map((stage) => (
            <div key={stage.id} style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                background: 'white', 
                borderRadius: '1rem', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                border: `2px solid ${stage.color}`
              }}>
                <stage.icon size={24} color={stage.color} />
              </div>
              
              <div style={{ flex: 1, padding: '1.25rem', background: 'white', borderRadius: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontSize: '1.125rem', color: stage.color, marginBottom: '0.25rem' }}>{stage.title}</h3>
                <p style={{ color: '#64748b' }}>{stage.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
