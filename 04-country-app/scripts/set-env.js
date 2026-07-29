const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '..', '.env');
const envVars = Object.fromEntries(
  fs
    .readFileSync(envPath, 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => {
      const [key, ...rest] = line.split('=');
      return [key.trim(), rest.join('=').trim()];
    }),
);

const targets = ['environment.ts', 'environment.development.ts'].map((file) =>
  path.resolve(__dirname, '..', 'src', 'environments', file),
);

for (const target of targets) {
  const contents = fs
    .readFileSync(target, 'utf8')
    .replace(/countriesApiKey: '.*'/, `countriesApiKey: '${envVars['COUNTRIES_API_KEY']}'`);
  fs.writeFileSync(target, contents);
}
