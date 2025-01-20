const path = require('path')
const fs = require('fs');
const os = require('os');
const { stdin, stdout, exit } = process;

const EOL = os.EOL
const filePath = path.resolve(__dirname, 'text-file.txt')

fs.writeFile(filePath, '', err => {
  if (err) throw err;
});

stdout.write('Hello, input your text for write in file: ')
stdin.on('data', data => {
  const dataStringify = data.toString().trim();
  if(dataStringify === 'exit') exit();
  fs.appendFile(filePath, `${dataStringify}${EOL}`, err => {
      if (err) throw err;
    }
  );
})

process.on('SIGINT', () => exit());
process.on('exit', () => stdout.write(`${EOL}Good bye!`));