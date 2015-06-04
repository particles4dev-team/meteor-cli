var Logs        = require('../utils/color');
var files       = require('../utils/files');
var path        = require('path');
var fs          = require('fs');
var clone       = require('nodegit').Clone.clone;
var register, update;

update = function() {
    try {
        var templatePath = path.resolve(files.getRootPath(), 'template', __templateFolder);
        if (fs.existsSync(templatePath)) {
            // delete
            Logs.info('delete folder ...');
            files.deleteFolderRecursive(templatePath);
        }

        // update
        Logs.info('create folder ...');
        fs.mkdirSync(templatePath, 0777);

        // Clone a given repository into a specific folder.
        Logs.info('clone git ...');
        clone(__githubLink, templatePath, { ignoreCertErrors: 1 }).then(function (repo) {
            Logs.info('done !');
        }, function (err) {
            throw err;
        })
        .catch(function (err) {
            Logs.error('update: ' + err.message);
        });
    }
    catch(err){
        Logs.error('update: ' + err.message);
    }
};

register = function(program, callback) {
    return program.command('update')
    .description("update template for meteor")
    .action(callback).on('--help', function() {
        // console.log('help');
    });
};

module.exports = function(program) {
    return register(program, update);
};