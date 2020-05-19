import program from 'commander';
import { VERSION } from './utils/constants';
import apply from './apply';
import chalk from 'chalk';

/**
 * wlcli commands
 *    - config
 *    - init 
 */

let actionMap = {
  init: {
    description: 'generate a new project from a template. 从模板生成新项目。',
    usages: [
      'wl init templateName projectName'
    ],
    alias: 'i'
  }
}

// 添加 init / config 命令
Object.keys(actionMap).forEach((action) => {
  program.command(action)
    .description(actionMap[action].description)
    .alias(actionMap[action].alias) //别名
    .action(() => {
      switch (action) {
        case 'config':
          //配置
          apply(action, ...process.argv.slice(3));
          break;
        case 'init':
          apply(action, ...process.argv.slice(3));
          break;
        default:
          break;
      }
    });
});

function help() {
  console.log('\r\nUsage:');
  Object.keys(actionMap).forEach((action) => {
    actionMap[action].usages.forEach(usage => {
      console.log('  - ' + usage);
    });
  });
  console.log('\r');
}
program.usage('<command> [options]');
// wl -h 
program.on('-h', help);
program.on('--help', help);
// wl -V   VERSION 为 package.json 中的版本号
program.version(VERSION, '-V --version').parse(process.argv);

// wl 不带参数时
if (!process.argv.slice(2).length) {
  program.outputHelp(make_green);
}
function make_green(txt) {
  return chalk.green(txt);
}
