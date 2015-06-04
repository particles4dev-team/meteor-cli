var Logs        = require('../utils/color');
var files       = require('../utils/files');
var ncp         = require('ncp').ncp;
var path        = require('path');
var build, register;

function createProject (name){
    ncp(path.resolve(files.getRootPath(), 'template', 'project'), path.resolve(files.getCurentPath(), name), function (err) {
        if (err) {
            return Logs.error(err);
        }
        Logs.info('done !');
    });
}

function createModule (name){
    ncp(path.resolve(files.getRootPath(), 'template', 'package'), path.resolve(files.getCurentPath(), name), function (err) {
        if (err) {
            return Logs.error(err);
        }
        Logs.info('done !');
    });
}

build = function(name, options) {
    if(options.project){
        createProject(name);
    }
    else if (options.package) {
        createModule(name);
    }
    else {
        createProject(name);
    }
};

register = function(program, callback) {
    return program.command('create [name]')
    .description("generate folder for meteor")
    .option("-p, --project", "meteor project")
    .option("-m, --package", "meteor package")
    .action(callback).on('--help', function() {
        // console.log('generate folder for meteor');
    });
};

module.exports = function(program) {
    return register(program, build);
};