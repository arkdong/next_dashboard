import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdmin = auth?.user?.admin === true;
      const isOnAdminPage = nextUrl.pathname.startsWith('/admin');
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnAdminPage) {
        if (isLoggedIn && isAdmin) return true; // Allow only admins
        return false; // Redirect non-admins or unauthenticated users
      }

      if (isOnDashboard) {
        if (isLoggedIn && !isAdmin) return true; // Allow only non-admin logged-in users
        return false; // Redirect unauthenticated users or admins
      }

      if (isLoggedIn) {
        // Redirect based on role
        return Response.redirect(new URL(isAdmin ? '/admin' : '/dashboard', nextUrl));
      }
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;