const path = require('path');
const fs = require('fs/promises');

const folder = path.resolve(__dirname, 'files');
const folderCopy = path.resolve(__dirname, 'files-copy');

(async function copyFiles() {
  try {
    await fs.mkdir(folderCopy, { recursive: true });
    const files = await fs.readdir(folder);
    const copyPromises = files.map(file => {
      return fs.copyFile(path.resolve(folder, file), path.resolve(folderCopy, file));
    });
    await Promise.all(copyPromises);

    const filesCopy = await fs.readdir(folderCopy);
    const deletePromises = filesCopy.map(file => {
      if (!files.includes(file)) {
        return fs.unlink(path.resolve(folderCopy, file));
      }
    });
    await Promise.all(deletePromises);

    console.log('All files were copied successfully and unnecessary ones were deleted.');
  } catch (err) {
    console.error('Error:', err);
  }
})()
