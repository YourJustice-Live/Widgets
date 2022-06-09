import React from 'react';
import ReactDOM from 'react-dom/client';
import JurisdictionWidget from './components/jurisdiction/JurisdictionWidget';
import ProfileWidget from './components/profile/ProfileWidget';
import './index.css';

// Add profile widget to dom
const profileWidgetDomElement = document.getElementById('yj_profile');
if (profileWidgetDomElement) {
  ReactDOM
    .createRoot(profileWidgetDomElement)
    .render(
      <React.StrictMode>
        <ProfileWidget domElement={profileWidgetDomElement} />
      </React.StrictMode>
    );
}

// Add jurisdiction widget to dom
const jurisdcitionWidgetDomElement = document.getElementById('yj_jurisdiction');
if (jurisdcitionWidgetDomElement) {
  ReactDOM
    .createRoot(jurisdcitionWidgetDomElement)
    .render(
      <React.StrictMode>
        <JurisdictionWidget />
      </React.StrictMode>
    );
}
