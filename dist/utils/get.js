'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadLocal = undefined;

var _downloadGitRepo = require('download-git-repo');

var _downloadGitRepo2 = _interopRequireDefault(_downloadGitRepo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const downloadLocal = exports.downloadLocal = async (projectName, projectType) => {
  let templatePath = '';
  switch (projectType) {
    case 'web':
      templatePath = 'hql7/wl-template-vue';
      break;
    case 'mfe-subapp':
      templatePath = 'hql7/wl-template-mfe-subapp-vue';
      break;
    case 'mfe-master':
      templatePath = 'hql7/wl-template-mfe-master-vue';
      break;
    default:
      templatePath = 'hql7/wl-template-vue';
  }

  return new Promise((resolve, reject) => {
    //projectName 为下载到的本地目录
    (0, _downloadGitRepo2.default)(templatePath, projectName, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};