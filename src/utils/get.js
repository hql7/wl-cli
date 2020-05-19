import downloadGit from 'download-git-repo';
import 'babel-polyfill';

export const downloadLocal = async (projectName, projectType) => {
  let templatePath = '';
  if (projectType === 'web') {
    templatePath = 'hql7/wl-template-vue'
  } else {
    templatePath = 'hql7/wl-template-mfe-subapp-vue'
  }
  return new Promise((resolve, reject) => {
    //projectName 为下载到的本地目录
    downloadGit(templatePath, projectName, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}
