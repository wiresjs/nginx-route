var _ = require('lodash');
var domain = require('wires-domain');
var Promise = require('promise')

var appRoot = require("app-root-path");
var fs = require("fs");
var path = require("path")
var home = process.env.HOME || process.env.USERPROFILE;


var _token;
var _config;

domain.service("$config", function() {
   return {
      _getConfig: function() {
         if (_config) {
            return _config;
         }

         var configFile = path.join(home, 'config.json');

         if (fs.existsSync(configFile)) {
            _config = JSON.parse(fs.readFileSync(configFile));
            return _config;
         }
         _config = {
            token: "123",
            sites_enabled_folder: path.join(appRoot.path, "sites-enabled"),
            trigger_cmd: "ls -la"
         };
         return _config;
      },
      getTriggerCmd: function() {
         var conf = this._getConfig();
         return conf.trigger_cmd || "ls -la"
      },
      getToken: function() {
         var conf = this._getConfig();
         return conf.token;
      },
      getSitesEnabledFolder: function() {
         var conf = this._getConfig();
         return conf.sites_enabled_folder;
      }
   }
})
