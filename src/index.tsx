import "../global.css";

import React from 'react';
import ReactDOM from 'react-dom/client';
import { GluestackUIProvider } from './components/ui/gluestack-ui-provider/index.web';
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <GluestackUIProvider>
      <App />
    </GluestackUIProvider>
  </React.StrictMode>,
);