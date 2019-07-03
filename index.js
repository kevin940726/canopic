const fs = require('fs');
const path = require('path');
const pkgUp = require('pkg-up');

const CANOPIC_SETTING = process.env.CANOPIC_SETTING || 'default';

let settingPaths;

try {
  settingPaths = fs.readdirSync(`./jars/${CANOPIC_SETTING}`);
} catch (err) {
  console.error(`Cannot find the "${CANOPIC_SETTING}" jar.`);
  throw err;
}

const pkgPath = pkgUp.sync({
  cwd: path.resolve(process.cwd(), '..'),
});

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

settingPaths.map(settingPath => `./jars/${CANOPIC_SETTING}/${settingPath}`)
  .map(settingPath => require(settingPath))
  .forEach(override => {
    override(pkg, pkgPath);
  });

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf8');
