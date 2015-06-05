var Logs        = require('../utils/color');
var files       = require('../utils/files');
var ncp         = require('ncp').ncp;
var path        = require('path');
var build, register;

function createProject (name){
    ncp(path.resolve(files.getRootPath(), 'template', __templateFolder, 'app'), path.resolve(files.getCurentPath(), name), function (err) {
        if (err) {
            return Logs.error(err);
        }
        Logs.info('done !');
    });
}

build = function(name, options) {
    createProject(name);
};

register = function(program, callback) {
    return program.command('create [name]')
    .description("generate folder for phaser")
    .action(callback).on('--help', function() {
        // console.log('generate folder for meteor');
    });
};

module.exports = function(program) {
    return register(program, build);
};