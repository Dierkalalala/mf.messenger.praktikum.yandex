const fs = require('fs');
const glob = require('glob');

glob.sync('static/**/*.js').map(filename => {
    const content = fs.readFileSync(filename, 'utf8');
    fs.writeFileSync(filename, content.split('\n').map(line => {
        if (line.startsWith('import ')) {
            const arr = line.split('');
            arr.splice(line.length - 3, 0, '.js');
            line = arr.join('');
        }
        return line;
    }).join('\n'));
});
