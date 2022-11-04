const path = require('path');
const fs = require('fs');

const folderDist = path.resolve(__dirname, 'project-dist');
const folderTemplate = path.resolve(__dirname, 'template.html');
const folderComponents = path.resolve(__dirname, 'components');
const folderStyles = path.resolve(__dirname, 'styles');
const folderAssets = path.resolve(__dirname, 'assets');

fs.mkdir(folderDist, {recursive: true}, (err) => {
  if(err) throw err;
});

fs.mkdir(path.join(folderDist, 'assets'), {recursive: true}, (err) => {
  if(err) throw err;
});

fs.readFile(folderTemplate, {encoding: 'utf8'}, (err, file) => {
  console.log(file)
});

fs.readdir(folderComponents, {withFileTypes: true}, (err, files) => {
  files.forEach(file => {
    const fileName = file.name
    if(!file.isDirectory() && path.extname(fileName) === '.html') {
      console.log('components>', fileName)
    }
  });
});

//str.replace('{{fotter}}', footer)