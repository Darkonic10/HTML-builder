const path = require('path');
const fs = require('fs/promises');
const os = require('os');

const EOL = os.EOL;
const dirStyles = path.resolve(__dirname, 'styles');

(async function mergeStyles() {
  try {
    const files = await fs.readdir(dirStyles, {withFileTypes: true});
    await fs.writeFile(path.resolve(__dirname, 'project-dist', 'bundle.css'), '')
    for (const file of files) {
      if(!file.isDirectory() && path.extname(file.name) === '.css') {
        const fileData = await fs.readFile(path.resolve(__dirname, 'styles', file.name), { encoding: 'utf8' })
        await fs.appendFile(path.resolve(__dirname, 'project-dist', 'bundle.css'), `${ fileData }${EOL}`)
      }
    }
  } catch (err) {
    console.error('Error:', err)
  }
})()
