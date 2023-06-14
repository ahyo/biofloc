module.exports = {
    // Konfigurasi lainnya
    async rewrites() {
      return [
        {
          source: '/dashboard',
          destination: '/dashboard.js',
        },
        {
          source: '/buyers',
          destination: '/buyers/index.js',
        },
      ];
    },
  };
  