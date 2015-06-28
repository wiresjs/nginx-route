var domain = require("wires-domain");
var swig = require("swig");
domain.path("/create", {
   get: function($req, $config, $record, Bash) {
      var domain = $req.body.domain || $req.query.domain;
      var server = $req.body.server || $req.query.server;

      if (!domain || !server) {
         throw {
            status: 400,
            message: "Invalid params"
         }
      }
      return $record.create({
         domain: domain,
         server: server
      }).then(function() {
         var cmd = $config.getTriggerCmd();
         var bash = new Bash(cmd);
         return bash.call();
      })
   }
});
