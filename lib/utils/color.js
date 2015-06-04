// helpers
var clc         = require('cli-color');
module.exports = {
    'log': function(message){
        console.log(message);
    },
    'info': function(message){
        console.log(clc.green(message));
    },
    'warn': function(message){
        console.log(clc.yellow(message));
    },
    'error': function(message){
        console.log(clc.red(message));
    }
};