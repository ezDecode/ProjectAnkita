// postcss.config.mjs (Corrected)
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // Use an object, not an array
  },
};

export default config;