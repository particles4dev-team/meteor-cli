var Logs        = require('../utils/color');
var files       = require('../utils/files');
var _           = require('lodash');
var fs          = require('fs');
var path        = require('path');

var register, collection;

collection = function(name, options) {
    try {
        var where = options.where;
        if(!_.isString(name))
            throw new Error('name must be a string');
        if(where != 'client' && where != 'server')
            where = 'lib';

        // check if path is meteor app
        files.isMeteorAppDir();
        function getFile (where) {
            return files.getRootPath() + '/template/' + __templateFolder + '/collection/' + where + '.tmp';
        }

        // parse
        var file = fs.readFileSync(getFile(where)).toString("utf-8");
        file = files.parseTemplate({
            collection: files.capitaliseFirstLetter(name),
            name: name
        }, file);

        // write
        fs.writeFileSync(path.resolve(files.getCurentPath(), where, 'collections', name + '.js') , file);
    }
    catch(err){
        Logs.error('collection: ' + err.message);
    }
};

register = function(program, callback) {
    return program.command('collection [name]')
    .description("create collection for meteor")
    .option("-w, --where [where]", "where save collection")
    .action(callback).on('--help', function() {
        // console.log('help');
    });
};

module.exports = function(program) {
    return register(program, collection);
};