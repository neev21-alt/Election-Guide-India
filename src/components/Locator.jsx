import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';

const Locator = () => {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = () => {
    if (pincode.length === 6) {
      const randomRoom = Math.floor(Math.random() * 10) + 1;
      const randomWard = Math.floor(Math.random() * 100) + 1;
      
      setResult({
        station: `Govt. School Room No. ${randomRoom}`,
        ward: `${randomWard}`,
        pincode: pincode
      });
    }
  };

  return (
    <div className="glass-card" style={{ padding: '3rem', maxWidth: '600px', margin: '2rem auto', textAlign: 'center' }}>
      <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
        <MapPin color="var(--color-navy)" /> Find My Polling Booth
      </h2>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>Enter your 6-digit Pincode to locate your designated polling station.</p>
      
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
        <input 
          type="text" 
          maxLength="6"
          placeholder="e.g. 110001"
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
          style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', fontSize: '1rem', width: '200px', textAlign: 'center' }}
        />
        <button className="btn-primary" onClick={handleSearch} disabled={pincode.length !== 6}>
          <Search size={18} />
        </button>
      </div>

      {result && (
        <div style={{ background: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: '1rem', padding: '2rem', textAlign: 'left', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--color-navy)', color: 'white', padding: '0.25rem 1rem', borderBottomLeftRadius: '1rem', borderTopRightRadius: '1rem', fontSize: '0.75rem', fontWeight: 600 }}>
            MOCK VOTER SLIP
          </div>
          <h3 style={{ color: 'var(--color-slate-900)', marginBottom: '1rem' }}>Designated Polling Station</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
              <span style={{ color: '#64748b' }}>Location:</span>
              <span style={{ fontWeight: 600, textAlign: 'right' }}>{result.station}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
              <span style={{ color: '#64748b' }}>Ward No:</span>
              <span style={{ fontWeight: 600 }}>{result.ward}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Pincode:</span>
              <span style={{ fontWeight: 600 }}>{result.pincode}</span>
            </div>
          </div>
          <div style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: '#64748b', textAlign: 'center' }}>
            * This is a mock locator for demonstration purposes.
          </div>
        </div>
      )}
    </div>
  );
};

export default Locator;
