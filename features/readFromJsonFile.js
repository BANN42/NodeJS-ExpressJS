const fs = require('node:fs');
const ReadFileSyn =  (filePath) => {
     return fs.readFileSync(filePath, 'utf8');
}


module.exports  = {
     readJsonContent : ReadFileSyn
}
