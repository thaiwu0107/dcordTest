'use strict';

var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var jsyaml = require('js-yaml');

module.exports.getAllSwagger = function () {

    var spec = '';
    // Get document, or throw exception on error
    try {
        var main = jsyaml.safeLoad(fs.readFileSync(path.join(__dirname, './api/main.yaml'), 'utf8'));

        // parse enum.http.ts with typedoc
        // main.definitions.Exception = genEnum();
        var enumObj = genEnum();

        // marge all swagger.yaml file to paths
        main.paths = mergeAll();

        // add status http code description
        _.each(main.paths, (v, k) => {
            _.each(v, (mv, mk) => {
                if (mv.responses['200'].schema) {
                    var status = mv.responses['200'].schema.properties.status;
                    var enumData = status.enum;
                    if (enumData) {
                        var desc = '';
                        _.each(enumData, (data) => {
                            desc += enumObj[data].description;
                        });
                        status.description = desc;
                    }
                }
            });
        });

        spec = jsyaml.safeDump(main);


    } catch (e) {
        console.error(e);
    }
    return spec;
}


module.exports.writeSwagger = function () {
    var spec = this.getAllSwagger();
    fs.writeFileSync(path.join(__dirname, './api/swagger.yaml'), spec);
}

function walkSync(dir, list) {
    if (!fs.lstatSync(dir).isDirectory()) {
        if (path.extname(dir) === '.yaml')
            list.push(dir)
    } else
        fs.readdirSync(dir).map(f => walkSync(path.join(dir, f), list));
}

function mergeAll() {
    //find all yaml
    var list = [];
    walkSync(path.join(__dirname, '../src'), list);

    var doc = {};
    _.map(list, (f) => {
        doc = _.merge(doc, jsyaml.safeLoad(fs.readFileSync(f, 'utf8')).paths);
    });
    return doc;
}

function genEnum() {
    // var pros = {};
    // var exceptionMap = {
    //   type : 'object',
    //   properties : pros
    // };
    var enumObj = {};

    try {
        var typedoc = require('typedoc');

        var app = new typedoc.Application();
        var result = app.bootstrap({
            "tsconfig": path.join(__dirname, '../tsconfig.json')
        });
        result.inputFiles = [path.join(__dirname, '../src/config/enum.http.ts')];

        var project = app.convert(result.inputFiles);
        // console.info(project)

        _.each(project.reflections, (v, k) => {
            // console.info(v.originalName,v.defaultValue,v.comment?v.comment.shortText:v.originalName);
            if (v.defaultValue) {
                // pros[v.originalName] = {
                //   value : v.defaultValue,
                //   description : v.comment?v.comment.shortText:v.originalName
                // };
                enumObj[v.defaultValue] = {
                    description: v.defaultValue + ' : ' + v.originalName + ' # ' + (v.comment ? v.comment.shortText : v.originalName) + '<br>'
                }
            }
        })
        // console.info(exceptionMap)

    } catch (e) {
        console.error(e);
    }
    return enumObj;
}

// this.writeSwagger();