export const setupGuards = (router) => {
  router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem("token"); // Atau cek sesuai dengan cara Anda menyimpan token
    const isPublicRoute = to.path.startsWith("/auth/"); // Public route starts with /auth/

    if (!isPublicRoute && !isAuthenticated) {
      // Jika rute bukan rute publik dan user belum login, redirect ke halaman login
      next("/auth/login");
    } else {
      // Jika rute publik atau user sudah login, lanjutkan
      next();
    }
  });
};
