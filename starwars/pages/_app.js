import '@/styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import NavigationBar from './components/NavigationBar';
import Box from './components/Box';

export default function App({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <>
      <SessionContextProvider supabaseClient={supabaseClient}>
        <NextUIProvider>
          <NavigationBar />
          <Box
            css={{
              px: '$12',
              py: '$15',
              mt: '$12',
              '@xsMax': { px: '$10' },
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            <Component {...pageProps} />
          </Box>
        </NextUIProvider>
      </SessionContextProvider>
    </>
  );
}
