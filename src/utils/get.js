import downloadGit from 'download-git-repo';

export const downloadLocal = async (projectName, projectType) => {
  let templatePath = '';
  switch (projectType) {
    case 'web':
      templatePath = 'hql7/wl-template-vue'
      break;
    case 'mfe-subapp':
      templatePath = 'hql7/wl-template-mfe-subapp-vue'
      break;
    case 'mfe-master':
      templatePath = 'hql7/wl-template-mfe-master-vue'
      break;
    case 'simple-template':
      templatePath = 'hql7/vue-simple-template'
      break;
    default:
      templatePath = 'hql7/wl-template-vue'
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
