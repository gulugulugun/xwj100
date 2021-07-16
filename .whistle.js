const projectName = require('./package.json').name
exports.name = `pay_dev_${projectName}`;
exports.rules = `
pay.weixin.qq.com localhost:8080
ignore://host pay.weixin.qq.com/api
`;