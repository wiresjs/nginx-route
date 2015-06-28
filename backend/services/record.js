var _ = require('lodash');
var domain = require('wires-domain');
var Promise = require('promise')
var appRoot = require("app-root-path");
var fs = require("fs");
var path = require("path")
var swig = require("swig")
var Promise = require("promise");


domain.service("$record", function($config) {
   var writeFolder = $config.getSitesEnabledFolder();
   return {
      create: function(opts) {
         var domain = opts.domain;
         var server = opts.server;
         return new Promise(function(resolve, reject) {
            var template = path.join(appRoot.path, 'backend', 'template.tbapp.link');
            var contents = swig.renderFile(template, {
               domain: domain,
               server: server
            });
            var targetFile = path.join(writeFolder, domain + ".tbapp.link")
            fs.writeFile(targetFile, contents, function(err) {
               if (err) {
                  return reject(err);
               }
               return resolve();
            });
         })

      }
   }
})
