var Logs        = require('../utils/color');
var files       = require('../utils/files');
var _           = require('lodash');
var fs          = require('fs');
var path        = require('path');

var register, plugin;

plugin = function(name) {
    try {
        if(!_.isString(name))
            throw new Error('name must be a string');

        // check if path is meteor app
        files.isPhaserAppDir();

        function getFile (where) {
            return files.getRootPath() + '/template/' + __templateFolder + '/template/' + where + '.tmp';
        }

        var file = fs.readFileSync(getFile('plugin')).toString("utf-8");
        // parse
        file = files.parseTemplate({
            plugin: files.capitaliseFirstLetter(name),
            name: name
        }, file);

        // write
        fs.writeFileSync(path.resolve(files.getCurentPath(), 'src', 'app', 'plugin', name + '.js') , file);
    }
    catch(err){
        Logs.error('plugin: ' + err.message);
    }
};

register = function(program, callback) {
    return program.command('plugin [name]')
    .description("create plugin for phaser")
    .action(callback).on('--help', function() {
        // console.log('help');
    });
};

module.exports = function(program) {
    return register(program, plugin);
};