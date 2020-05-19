'use strict';

var _get = require('./utils/get');

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _util = require('util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const exist = (0, _util.promisify)(_fs2.default.stat);

// 命令行交互配置项
const question = [{
  type: 'input',
  name: 'author',
  message: 'Please enter the author name: '
}, {
  type: 'input',
  name: 'description',
  message: 'Please enter the project description: '
}, {
  type: 'list',
  name: 'type',
  message: 'Please enter the project type：',
  choices: ["web", "mfe-subapp", "mfe-master"]
}, {
  type: 'input',
  name: 'port',
  message: 'Please enter the project port: ',
  default: 8080,
  validate: function (val) {
    if (val.match(/\d{2,6}/g)) {
      // 校验位数
      return true;
    }
    return "请输入2-6位数字";
  }
}];

// 创建命令
let init = async projectName => {
  if (!projectName) {
    console.log(_chalk2.default.redBright.bold("请输入项目名称"));
    return;
  }
  //项目不存在
  try {
    const projectExist = await exist(projectName);
    if (projectExist) {
      console.log(_logSymbols2.default.error, _chalk2.default.red('The project already exists! 该项目已存在！'));
    }
  } catch (error) {
    //命令行交互
    _inquirer2.default.prompt(question).then(async answer => {
      //下载模板 选择模板
      //通过配置文件，获取模板信息
      let loading = (0, _ora2.default)('The project is in the process of initialization, please take a moment to wait for a long time ... 项目正在初始化中，耗时较久请稍事等待...');
      loading.start();
      loading.color = "yellow";
      const projectType = answer.type;
      (0, _get.downloadLocal)(projectName, projectType).then(() => {
        loading.succeed();
        // 写入package.json
        const isNotMfeMaster = projectType !== 'mfe-master';
        const packageJson = isNotMfeMaster ? `${projectName}/package.json` : `${projectName}/master/package.json`;
        if (_fs2.default.existsSync(packageJson)) {
          const data = _fs2.default.readFileSync(packageJson).toString();
          let json = JSON.parse(data);
          json.name = projectName; // 项目名
          json.author = answer.author; // 作者
          json.description = answer.description; // 描述信息
          json.port = answer.port; // 端口号 默认8080
          //修改项目文件夹中 package.json 文件
          _fs2.default.writeFileSync(packageJson, JSON.stringify(json, null, '\t'), 'utf-8');
          console.log(_logSymbols2.default.success, _chalk2.default.green('Project initialization finished! 项目初始化完成！依次运行以下命令：'));
          console.log(_logSymbols2.default.success, _chalk2.default.green('cd ' + projectName));
          console.log(_logSymbols2.default.success, _chalk2.default.green(isNotMfeMaster ? 'npm install' : 'npm run cinit'));
          console.log(_logSymbols2.default.success, _chalk2.default.green('npm run serve'));
        }
      }, () => {
        loading.fail();
      });
    });
  }
};
module.exports = init;