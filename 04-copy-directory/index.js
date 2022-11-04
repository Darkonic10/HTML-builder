const path = require('path');
const fs = require('fs');

const folder = path.resolve(__dirname, 'files')
const folderCopy = path.resolve(__dirname, 'files-copy')

fs.mkdir(folderCopy, {recursive: true}, (err) => {
  if(err) throw err;
});

const arrayFiles = [];

fs.readdir(folder, (err, files) => {
  files.forEach(file => {
    arrayFiles.push(file)
    fs.copyFile(path.resolve(__dirname, 'files', file), path.resolve(__dirname, 'files-copy', file), err => {
      if(err) throw err;
    })
  });
});

fs.readdir(folderCopy, (err, files) => {
  files.forEach(file => {
    if(!arrayFiles.includes(file)) fs.unlink(path.resolve(__dirname, 'files-copy', file), err => {
      if(err) throw err
    });
  });
});
