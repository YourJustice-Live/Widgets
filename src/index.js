import React from 'react';
import ReactDOM from 'react-dom/client';
import JurisdictionWidget from './components/jurisdiction/JurisdictionWidget';
import ProfileWidget from './components/profile/ProfileWidget';
import './index.css';

// Add profile widgets to dom
document.querySelectorAll('.yj_profile').forEach((element) => {
  ReactDOM.createRoot(element).render(
    <React.StrictMode>
      <ProfileWidget domElement={element} />
    </React.StrictMode>,
  );
});

// Add jurisdiction widgets to dom
document.querySelectorAll('.yj_jurisdiction').forEach((element) => {
  ReactDOM.createRoot(element).render(
    <React.StrictMode>
      <JurisdictionWidget />
    </React.StrictMode>,
  );
});
