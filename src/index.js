import React from 'react';
import ReactDOM from 'react-dom/client';
import JurisdictionWidget from 'src/components/jurisdiction/JurisdictionWidget';
import ProfileWidget from 'src/components/profile/ProfileWidget';
import './index.css';

// Add profile widget to dom
if (document.getElementById('yj_profile')) {
  const widgetContainer = ReactDOM.createRoot(document.getElementById('yj_profile'));
  widgetContainer.render(
    <React.StrictMode>
      <ProfileWidget />
    </React.StrictMode>
  )
}

// Add jurisdiction widget to dom
if (document.getElementById('yj_jurisdiction')) {
  const widgetContainer = ReactDOM.createRoot(document.getElementById('yj_jurisdiction'));
  widgetContainer.render(
    <React.StrictMode>
      <JurisdictionWidget />
    </React.StrictMode>
  )
}
