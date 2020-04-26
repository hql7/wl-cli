import { downloadLocal } from './utils/get';
import ora from 'ora';
import inquirer from 'inquirer';
import fs from 'fs';
import chalk from 'chalk';
import symbol from 'log-symbols';
import { promisify } from "util";
import 'babel-polyfill';

const exist = promisify(fs.stat);

let init = async (projectName) => {
  if (!projectName) {
    console.log(chalk.redBright.bold("请输入项目名称"));
    return;
  }
  //项目不存在
  try {
    const projectExist = await exist(projectName);
    if (projectExist) {
      console.log(symbol.error, chalk.red('The project already exists! 该项目已存在！'));
    }
  } catch (error) {
    //命令行交互
    inquirer.prompt([
      {
        name: 'description',
        message: 'Please enter the project description: '
      },
      {
        name: 'author',
        message: 'Please enter the author name: '
      }
    ]).then(async (answer) => {
      //下载模板 选择模板
      //通过配置文件，获取模板信息
      let loading = ora('The project is in the process of initialization, please take a moment to wait for a long time ... 项目正在初始化中，耗时较久请稍事等待...');
      loading.start();
      loading.color = "yellow";
      downloadLocal(projectName).then(() => {
        loading.succeed();
        const fileName = `${projectName}/package.json`;
        if (fs.existsSync(fileName)) {
          const data = fs.readFileSync(fileName).toString();
          let json = JSON.parse(data);
          json.name = projectName;
          json.author = answer.author;
          json.description = answer.description;
          //修改项目文件夹中 package.json 文件
          fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
          console.log(symbol.success, chalk.green('Project initialization finished! 项目初始化完成！依次运行以下命令：'));
          console.log(symbol.success, chalk.green('cd ' + projectName));
          console.log(symbol.success, chalk.green('npm install'));
          console.log(symbol.success, chalk.green('npm run serve'));
        }
      }, () => {
        loading.fail();
      });
    });
  }
}
module.exports = init;
