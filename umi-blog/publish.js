const path = require('path')
const fs = require( 'fs' )
const shell = require( 'shelljs' )


shell.exec('npm run build')
console.log(`run build succ...`)

function saveFile(name) {
    fs.readFile(`./dist/${name}`, (err, data) => {
        if (err) throw err;
        console.log(`read ${name} succ...`)
        fs.writeFile(`../${name}`,data,(error)=>{
            if(error){
                throw error;
            }else{
                console.log(`save ${name} succ`);    
            }
        });
    });
}

saveFile('index.html')
saveFile('umi.css')
saveFile('umi.js')


