import { supabase } from '../../utils/supabaseClient,js';

// Login with Microsoft
document.getElementById('login-button')?.addEventListener('click', async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'azure',
  });
});

// Logout
document.getElementById('logout-button')?.addEventListener('click', async () => {
  await supabase.auth.signOut();
  window.location.href = '/login.html';
});

// Check session and redirect
(async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    if (window.location.pathname !== '/login.html') {
      window.location.href = '/login.html';
    }
  } else {
    if (window.location.pathname === '/login.html') {
      window.location.href = '/dashboard.html';
    }
  }
})();
