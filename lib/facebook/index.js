exports.register = function(server, options, callback) {
  server.register([
    require('./store')
  ], callback);
}

exports.register.attributes = {
  name: 'facebook-service',
  version: '1.0.0',
  description: 'server methods for interacting with Facebook'
}
