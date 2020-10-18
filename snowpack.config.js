module.exports = {
  mount: {
    demo: '/',
    src: '/_dist_',
  },
  devOptions: {
    out: 'public',
  },
  plugins: ['@snowpack/plugin-babel', '@snowpack/plugin-dotenv'],
};
