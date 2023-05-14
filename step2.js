const fs = require('fs');
const axios = require('axios');

if(process.argv[2] != null)
{
    if(process.argv[2].startsWith('http://') || process.argv[2].startsWith('https://'))
        webCat(process.argv[2]);
    else
        cat(process.argv[2]);
}
else
    console.log("Needs path argument");

function webCat(path) 
{
    axios(path).then((result) => { console.log(result.data); }).catch((err) => { console.log("Error: Request failed with status code 404")});
}

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