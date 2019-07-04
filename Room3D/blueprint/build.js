const shell = require( 'shelljs' )
const watch = require('node-watch');

watch(['test.ts'], { recursive: true }, function(evt, name) {
    if (name.split('.').pop() === 'ts') {
        console.log('监听到TypeScript文件改动，重新编译中...');
        shell.exec('npm run build');
        console.log('编译成功...');
    }
});

console.log('TypeScript自动编译脚本已成功运行...');