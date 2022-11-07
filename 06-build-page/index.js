const path = require('path');
const fs = require('fs');
const fsPromise = require('fs/promises');

const folderDist = path.resolve(__dirname, 'project-dist');
const folderTemplate = path.resolve(__dirname, 'template.html');
const folderComponents = path.resolve(__dirname, 'components');
const folderStyles = path.resolve(__dirname, 'styles');
const folderAssets = path.resolve(__dirname, 'assets');

(async function createDist() {
  await createDistFolder();
  await copyHTML();
  await changeDistHtml();
  await createBundle();
  await copyAssets(folderAssets);
})()

async function createDistFolder() {
  if (await findFolder(folderDist)) await fsPromise.rm(folderDist, { recursive: true });
  await fsPromise.mkdir(folderDist, {recursive: true});
  await fsPromise.mkdir(path.join(folderDist, 'assets'), {recursive: true});
}

async function findFolder(folder) {
  try {
    await fsPromise.access(folder, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function copyHTML() {
  await fsPromise.copyFile(folderTemplate, path.join(folderDist, 'index.html'))
}

async function changeDistHtml() {
  let count = 0;
  const htmlDist = path.join(folderDist, 'index.html');
  let htmlCopy = await fsPromise.readFile(folderTemplate, {encoding: 'utf8'});
  const files = await fsPromise.readdir(folderComponents, {withFileTypes: true});
  for (const file of files) {
    const fileName = file.name;
    const templateName = fileName.split('.')[0];
    if(!file.isDirectory() && path.extname(fileName) === '.html') {
      const component = await fsPromise.readFile(path.join(folderComponents, fileName), {encoding: 'utf8'});
      htmlCopy = htmlCopy.replace(`{{${templateName}}}`, component);
      count++
      if(count === files.length) {
        await fsPromise.writeFile(htmlDist, htmlCopy);
      }
    }
  }
}

async function createBundle() {
  const files = await fsPromise.readdir(folderStyles, {withFileTypes: true});
  await fsPromise.writeFile(path.resolve(__dirname, 'project-dist', 'style.css'), '')
  for (const file of files) {
    if(!file.isDirectory() && path.extname(file.name) === '.css') {
      const data = await fsPromise.readFile(path.resolve(__dirname, 'styles', file.name), {encoding: 'utf8'});
      await fsPromise.appendFile(path.resolve(__dirname, 'project-dist', 'style.css'), `${data}\n`)
    }
  }
}

async function copyAssets(folderAssets) {
  let files = await fsPromise.readdir(folderAssets, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      await fsPromise.mkdir(path.join(folderAssets.replace('assets', 'project-dist/assets'), file.name), { recursive: true })
      await copyAssets(path.join(folderAssets, file.name));
    } else {
      await fsPromise.copyFile(path.join(folderAssets, file.name), path.join(folderAssets.replace('assets', 'project-dist/assets'), file.name));
    }
  }
}
