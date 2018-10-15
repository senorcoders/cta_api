/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function(done) {
<<<<<<< HEAD
  sails.moment = require('moment');
  sails.moment.locale('en');
=======

>>>>>>> c638968e7fef42a77fa7cfe0c530d23381f1594d
  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return done();
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
<<<<<<< HEAD
  //return done();

  var client = RedisService.prepareConnect().createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
  client.on('connect',function(){
      sails.log.debug('Redis connected');
      //client.select(process.env.REDIS_DB);
      client.select(2);
      RedisService.setConnection(client);
    return done();
  });
=======
  return done();
>>>>>>> c638968e7fef42a77fa7cfe0c530d23381f1594d

};
