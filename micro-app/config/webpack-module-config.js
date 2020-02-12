const path = require('path');
const fs = require('fs');


class WebpackModuleConfig {
  constructor(options) {
    super(options);

    const dist = options.dist;
    const fileName = option.fileName || 'moduleConfig';

    this.fileResolvedPath = path.resolve(__dirname, dist, fileName);
    
    this.modules = {};

    fs.readFileSync(this.fileResolvedPath, (err, data) => {
      if (err && err.code === 'ENOENT') {
        return;
      }

      const modulesData = JSON.parse(data.toString('utf-8'));
      Object.assign(this.appModules, modulesData);
    });
  }

  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {

      callback();
    });
  }
}