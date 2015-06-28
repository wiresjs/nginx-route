var domain = require("wires-domain");

domain.path("/:action", function($res, $req, $config, $next) {
   var serverToken = $config.getToken();
   var userToken = $req.body.token || $req.query.token;
   if (userToken != serverToken) {
      throw {
         status: 403,
         message: "Forbidden"
      }
   }

   $next();
})
