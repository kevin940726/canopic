const fs = require('fs');
const path = require('path');
const pkgUp = require('pkg-up');

const CANOPIC_SETTING = process.env.CANOPIC_SETTING || 'default';

function requireSetting(file) {
  return require(`./templates/${CANOPIC_SETTING}/${file}`);
}

const eslintrc = requireSetting('.eslintrc.json');
const huskyrc = requireSetting('.huskyrc.json');
const lintstagedrc = requireSetting('.lintstagedrc.json');
const prettierrc = requireSetting('.prettierrc.json');

const pkgPath = pkgUp.sync({
  cwd: path.resolve(process.cwd(), '..'),
});

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

Object.assign(pkg, eslintrc, huskyrc, lintstagedrc, prettierrc);

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf8');
