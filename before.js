const json = require('./package.json');

let key;

for (key in json.dependencies) {
  if (json.dependencies[key] === 'latest') {
    throw new Error(`${key}不要使用 latest 版本号`);
  }
}

for (key in json.devDependencies) {
  if (json.devDependencies[key] === 'latest') {
    throw new Error(`${key}不要使用 latest 版本号`);
  }
}
