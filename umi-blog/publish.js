const path = require('path')
const fs = require( 'fs' )
const shell = require( 'shelljs' )


shell.exec('npm run build')
console.log(`run build succ...`)

function saveFile(name, end) {
    fs.readFile(`./dist/${name}`, (err, data) => {
        if (err) throw err;
        console.log(`read ${name} succ...`)
        fs.writeFile(`../${name}`,data,(error)=>{
            if(error){
                throw error;
            }else{
                console.log(`save ${name} succ`);  
                if(end) {
                   setTimeout(()=>{
                    shell.exec('git add -u')
                    shell.exec('git commit -m "上线"')
                    shell.exec('git push"')
                   }, 3000)
                }  
            }
        });
    });
}

saveFile('index.html')
saveFile('umi.css')
saveFile('umi.js', true)





