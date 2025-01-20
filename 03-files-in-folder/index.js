const path = require('path');
const fs = require('fs/promises');

const folder = path.resolve(__dirname, 'secret-folder');

(async function getInfoFolder () {
  try {
    const files = await fs.readdir(folder, { withFileTypes: true });

    for (const file of files) {
      if(!file.isDirectory()) {
        const fileName = file.name.replace(/\..*/, '');
        const fileExtName = path.extname(file.name).slice(1);
        const stats = await fs.stat(path.resolve(folder, file.name))
        console.log(`${fileName} - ${fileExtName} - ${stats.size + 'b'}`)
      }
    }
  } catch (err) {
    console.error('Error:', err);
  }
})()

