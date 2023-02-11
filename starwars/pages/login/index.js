import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';

export default function login() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const supabaseClient = useSupabaseClient();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const user = useUser();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  if (user) {
    router.push('/');
  }

  return (
    <>
      <Auth
        appearance={{ theme: ThemeSupa }}
        supabaseClient={supabaseClient}
        socialButtonSize='xlarge'
        magicLink={true}
        providers={['google']}
      />
    </>
  );
}
