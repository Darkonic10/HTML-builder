const path = require('path')
const fs = require('fs');
const { stdin, stdout, exit, SIGINT } = process;

fs.writeFile(path.resolve(__dirname, 'text-file.txt'), '', err => {
  if(err) return;
});

stdout.write('Hello, input your text for write in file: ')
stdin.on('data', data => {
  const dataStringify = data.toString().trim();
  if(dataStringify === 'exit') exit();
  fs.appendFile(path.resolve(__dirname, 'text-file.txt'), `${dataStringify}\n`, err => {
      if (err) return;
    }
  );
})

process.on('exit', () => stdout.write('\nGood bye!'));
process.on('SIGINT', () => {
  exit();
});
