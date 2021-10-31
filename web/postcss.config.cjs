const { resolve } = require("path");
const { generateMediaQueries } = require("@jmondi/mobile-first");

module.exports = {
  plugins: {
    "postcss-import": {
      path: [resolve(__dirname, "src")],
    },
    "postcss-mixins": {},
    "postcss-nested": {},
    "postcss-custom-media": {
      importFrom: [
        {
          customMedia: {
            "--light": "(prefers-color-scheme: light)",
            "--dark": "(prefers-color-scheme: dark)",
            ...generateMediaQueries({
              large: 1440,
              medium: 768,
              small: 420,
            }),
          },
        },
      ],
    },
    autoprefixer: {},
    // cssnano:
    // 	process.env.NODE_ENV !== 'development'
    // 		? {
    // 				preset: 'default'
    // 		  }
    // 		: false
  },
};
