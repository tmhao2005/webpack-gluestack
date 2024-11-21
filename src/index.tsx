import "../global.css";

import React from 'react';
import ReactDOM from 'react-dom/client';
import { GluestackUIProvider } from './components/ui/gluestack-ui-provider/index.web';
import { Button, ButtonText } from "./components/ui/button";

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <GluestackUIProvider>
      <Button>
        <ButtonText>Press me!</ButtonText>
      </Button>
    </GluestackUIProvider>
  </React.StrictMode>,
);