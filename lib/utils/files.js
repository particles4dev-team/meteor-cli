var handlebars  = require('handlebars');
var fs          = require('fs');
var path        = require('path');

var deleteFolderRecursive = function (path) {
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            }
            else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};
exports.deleteFolderRecursive = deleteFolderRecursive;

exports.getRootPath = function () {
    // return __dirname;
    return __rootPath;
};

function getCurentPath () {
    return fs.realpathSync( process.cwd() );
};
exports.getCurentPath = getCurentPath;

exports.isMeteorAppDir = function () {
    var cpath = getCurentPath(),
    appPath = path.resolve(cpath, '.meteor');
    if (!fs.existsSync(appPath))
        throw new Error('not found meteor app');
};

exports.parseTemplate = function (data, tmp) {
    var template = handlebars.compile(tmp);
    return template(data);
};

// char => Char 
exports.capitaliseFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};