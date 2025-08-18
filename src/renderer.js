import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/reset.css';
import './index.css';
import TrackerMain from './tracker/TrackerMain.jsx'
import { ConfigProvider } from 'antd';
import appColor from './utils/appColor.js';
import Login from './tracker/Login.jsx';
import pageRoutes from './utils/pageRoutes.js';
import { MemoryRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {

  const antdTheme = {
    components: {
      Input: {},
      Button: { contentFontSizeLG: 15 },
      Card: { bodyPadding: 0, headerPadding: 15 },
      Timeline: { itemPaddingBottom: 0 },
      Dropdown: { fontSize: 14 },
      Tabs: {/*margin: 0, */fontSize: 14 },
      Table: { cellFontSize: 15 },
    },
    token: {
      colorPrimary: appColor.secondPrimary,
      colorBorderSecondary: appColor.borderClr,
      borderRadius: 8,
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
    },
  };

  return (
    <ConfigProvider componentSize="large" theme={antdTheme}>
      <Router>
        <Routes>
          <Route path={pageRoutes.loginPage} element={<Login />} />
          <Route path={pageRoutes.tracker} element={<TrackerMain />} />
          <Route path="*" element={<Navigate to={pageRoutes.loginPage} replace />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

console.log('👋 This message is being logged by "renderer.js", included via webpack');


