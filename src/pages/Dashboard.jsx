import React, { useState } from 'react';
import { Vote, UserCheck, Calendar, Info, HelpCircle, Trophy, MapPin } from 'lucide-react';
import Eligibility from '../components/Eligibility';
import Timeline from '../components/Timeline';
import PollingGuide from '../components/PollingGuide';
import EVM from '../components/EVM';
import Assistant from '../components/Assistant';
import Quiz from '../components/Quiz';
import Locator from '../components/Locator';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('eligibility');

  const tabs = [
    { id: 'eligibility', label: 'Eligibility', icon: UserCheck },
    { id: 'timeline', label: 'Timelines', icon: Calendar },
    { id: 'locator', label: 'Booth Locator', icon: MapPin },
    { id: 'polling', label: 'Polling Guide', icon: Info },
    { id: 'evm', label: 'EVM Simulator', icon: Vote },
    { id: 'quiz', label: 'Voter Quiz', icon: Trophy },
    { id: 'assistant', label: 'AI Assistant', icon: HelpCircle },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'eligibility': return <Eligibility />;
      case 'timeline': return <Timeline />;
      case 'locator': return <Locator />;
      case 'polling': return <PollingGuide />;
      case 'evm': return <EVM />;
      case 'quiz': return <Quiz />;
      case 'assistant': return <Assistant />;
      default: return <Eligibility />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header style={{ 
        background: 'linear-gradient(to right, #FF9933 0%, #FFFFFF 50%, #138808 100%)', 
        padding: '2rem 0',
        boxShadow: 'var(--shadow-md)',
        marginBottom: '2rem'
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '1rem', 
            background: 'white', 
            padding: '1rem 2rem', 
            borderRadius: '2rem',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ width: '40px', height: '40px', background: 'var(--color-navy)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Vote color="white" size={24} />
            </div>
            <h1 style={{ fontSize: '1.75rem', color: 'var(--color-slate-900)' }}>Election Process Guide</h1>
          </div>
          <p style={{ marginTop: '1rem', color: 'var(--color-slate-700)', fontWeight: 500 }}>
            Empowering Indian Citizens through Education
          </p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="container" style={{ marginBottom: '3rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '1rem', 
          flexWrap: 'wrap',
          background: 'white',
          padding: '0.75rem',
          borderRadius: '1.25rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.25rem',
                borderRadius: '0.75rem',
                border: 'none',
                cursor: 'pointer',
                background: activeTab === tab.id ? 'var(--color-navy)' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'var(--color-slate-700)',
                fontWeight: 600,
                transition: 'all 0.2s'
              }}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container" style={{ paddingBottom: '5rem' }}>
        {renderContent()}
      </main>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8', fontSize: '0.875rem' }}>
        <p>© 2026 Election Process Educational Assistant. Designed for Indian Voters.</p>
      </footer>
    </div>
  );
}

export default Dashboard;
