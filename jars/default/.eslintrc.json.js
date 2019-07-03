module.exports = pkg => {
  if (!pkg.eslintConfig) {
    pkg.eslintConfig = {
      extends: "react-app"
    };
  }
};
