const fs = require('fs');
const axios = require('axios');

if(process.argv[2] != null)
{
    if(process.argv[2] == '--out')
    {
        if(process.argv[3] != null && process.argv[4] != null)
        {
            if(process.argv[3].startsWith('http://') || process.argv[3].startsWith('https://'))
                webCat(process.argv[3], process.argv[4]);
            else
                cat(process.argv[3], process.argv[4]);
        }
        else if(process.argv[3] == null)
        {
            console.log("Needs input path argument");
            process.exit(1);
        }
        else if(process.argv[4] != null)
        {
            console.log("Needs output path argument");
            process.exit(1);
        }
    }
    else
    {
        if(process.argv[2].startsWith('http://') || process.argv[2].startsWith('https://'))
            webCat(process.argv[2]);
        else
            cat(process.argv[2]);
    }
}
else
{
    console.log("Needs path argument");
    process.exit(1);
}

function webCat(path, outPath=null) 
{
    if(outPath != null)
    {
        axios(path).then((result) => 
        { 
            fs.writeFile(outPath, result.data, 'utf8', (err) => { 
                if(err) throw err;
            });
        }).catch((err) => { if(err) console.log("Error: Request failed with status code 404"); });
    }
    else
    {
        axios(path).then((result) => { console.log(result.data); }).catch((err) => { console.log("Error: Request failed with status code 404")});
    }
}

function cat(path, outPath=null) 
{
    if(outPath != null)
    {
        fs.readFile(path, 'utf8', (err, data) => {
            if(err) {
                console.error(err);
                process.exit(1);
            }
            else {
                fs.writeFile(outPath, data, 'utf8', (err) => { 
                    if(err) throw err;
                });
            }
        });
    }
    else
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
}