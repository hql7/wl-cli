'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _constants = require('./utils/constants');

var _apply = require('./apply');

var _apply2 = _interopRequireDefault(_apply);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * wlcli commands
 *    - config
 *    - init 
 */

let actionMap = {
  init: {
    description: 'generate a new project from a template. 从模板生成新项目。',
    usages: ['wl init templateName projectName']
  }

  // 添加 init / config 命令
};Object.keys(actionMap).forEach(action => {
  _commander2.default.command(action).description(actionMap[action].description).alias(actionMap[action].alias) //别名
  .action(() => {
    switch (action) {
      case 'config':
        //配置
        (0, _apply2.default)(action, ...process.argv.slice(3));
        break;
      case 'init':
        (0, _apply2.default)(action, ...process.argv.slice(3));
        break;
      default:
        break;
    }
  });
});

function help() {
  console.log('\r\nUsage:');
  Object.keys(actionMap).forEach(action => {
    actionMap[action].usages.forEach(usage => {
      console.log('  - ' + usage);
    });
  });
  console.log('\r');
}
_commander2.default.usage('<command> [options]');
// wl -h 
_commander2.default.on('-h', help);
_commander2.default.on('--help', help);
// wl -V   VERSION 为 package.json 中的版本号
_commander2.default.version(_constants.VERSION, '-V --version').parse(process.argv);

// wl 不带参数时
if (!process.argv.slice(2).length) {
  _commander2.default.outputHelp(make_green);
}
function make_green(txt) {
  return _chalk2.default.green(txt);
}