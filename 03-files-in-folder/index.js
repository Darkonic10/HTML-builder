const path = require('path');
const fs = require('fs');

const folder = path.resolve(__dirname, 'secret-folder')

fs.readdir(folder, {withFileTypes: true}, (err, files) => {
  files.forEach(file => {
    if(!file.isDirectory()) {
      const fileName = file.name.replace(/\..*/, '');
      const fileExtName = path.extname(file.name).slice(1);
      fs.stat(path.resolve(__dirname, 'secret-folder', `${file.name}`), (err, stats) => console.log(`${fileName} - ${fileExtName} - ${stats.size / 1024 + 'kb'}`))
    }
  });
});
