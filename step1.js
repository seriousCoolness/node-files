const fs = require('fs');

if(process.argv[2] != null)
    cat(process.argv[2]);
else
    console.log("Needs path argument");

function cat(path) 
{
    fs.readFile(path, 'utf8', (err, data) => {
        if(err) {
            console.error(err);
            process.exit(1);
        }
        else {
            console.log(data);
        }
    })
}