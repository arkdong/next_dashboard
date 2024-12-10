import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      // const isAdmin = auth?.user?.role === 'admin';
      const isOnDashboard = nextUrl.pathname.startsWith('/admin');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/admin', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;

// const isLoggedIn = !!auth?.user;
// const isAdmin = auth?.user?.admin === true;
// const isOnAdminPage = nextUrl.pathname.startsWith('/admin');
// const isOnDashboard = nextUrl.pathname.startsWith('/admin');
// if (isOnAdminPage) {
//   if (isLoggedIn && isAdmin) return true; // Allow only admins
//   return false; // Redirect non-admins or unauthenticated users
// }

// if (isOnDashboard) {
//   if (isLoggedIn && !isAdmin) return true; // Allow only non-admin logged-in users
//   return false; // Redirect unauthenticated users or admins
// }

// if (isLoggedIn) {
//   // Redirect based on role
//   return Response.redirect(new URL(isAdmin ? '/admin' : '/admin', nextUrl));
// }