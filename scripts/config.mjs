import packageJson from './../package.json' assert { type: 'json' };

const config = {
  version: packageJson.version,
  date: getDate(),
  root: './',
};

function getDate() {
  const date = new Date();
  const options = { year: 'numeric', month: 'long', day: '2-digit' };
  return date.toLocaleDateString('en-US', options);
}

export default config;
