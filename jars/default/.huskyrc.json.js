module.exports = pkg => {
  if (!pkg.husky) {
    pkg.husky = {
      hooks: {
        "pre-commit": "lint-staged"
      }
    };
  }
};
