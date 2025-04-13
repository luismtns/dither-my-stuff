import '@gfazioli/mantine-marquee/styles.css';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { theme } from './theme/main';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme='dark' withGlobalClasses>
      <App />
    </MantineProvider>
  </StrictMode>
);
