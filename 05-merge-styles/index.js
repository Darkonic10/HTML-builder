const path = require('path');
const fs = require('fs');

const dirStyles = path.resolve(__dirname, 'styles')

fs.readdir(dirStyles, {withFileTypes: true}, (err, files) => {
  fs.writeFile(path.resolve(__dirname, 'project-dist', 'bundle.css'), '', (err) => {
    if(err) throw err;
  })
  files.forEach(file => {
    if(!file.isDirectory() && path.extname(file.name) === '.css') {
      fs.readFile(path.resolve(__dirname, 'styles', file.name), { encoding: 'utf8' }, (err, data) => {
        fs.appendFile(path.resolve(__dirname, 'project-dist', 'bundle.css'), `${data}\n`, (err) => {
          if(err) throw err;
        })
      });
    }
  })
})
