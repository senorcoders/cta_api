/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
<<<<<<< HEAD
  
=======
  	/**
	 * Upload avatar for currently logged-in user
	 *
	 * (POST /user/:id/avatar)
	 */
	uploadAvatar: function (req, res) {

	  req.file('avatar').upload({
	    // don't allow the total upload size to exceed ~10MB
	    dirname: require('path').resolve(sails.config.appPath, 'assets/images'),
	    maxBytes: 10000000
	  },function whenDone(err, uploadedFiles) {
	    if (err) {
	      return res.serverError(err);
	    }

	    // If no files were uploaded, respond with an error.
	    if (uploadedFiles.length === 0){
	      return res.badRequest('No file was uploaded');
	    }

	    // Get the base URL for our deployed application from our custom config
	    // (e.g. this might be "http://foobar.example.com:1339" or "https://example.com")
	    var baseUrl = sails.config.custom.baseUrl;

	    // Save the "fd" and the url where the avatar for a user can be accessed
	    Users.update(req.param('id'), {
		//	 Generate a unique URL where the avatar can be downloaded
	      //.
	      avatarUrl: require('util').format('%s/user/avatar/%s', baseUrl, req.param('id')),

	      // Grab the first file and use it's `fd` (file descriptor)
	      avatarFd: uploadedFiles[0].fd
	    })
	    .exec(function (err){
	      if (err) return res.serverError(err);
	      return res.ok();
	    });
	  });
	},


	/**
	 * Download avatar of the user with the specified id
	 *
	 * (GET /user/avatar/:id)
	 */
	avatar: function (req, res){

	  Users.findOne(req.param('id')).exec(function (err, user){
	    if (err) return res.serverError(err);
	    if (!user) return res.notFound();

	    // User has no avatar image uploaded.
	    // (should have never have hit this endpoint and used the default image)
	    if (!user.avatarFd) {
	      return res.notFound();
	    }
	    var window_url = "E:/sails/";
	    var fix_url = user.avatarFd.replace("/mnt/e/sails/clinicapi/assets/", "");

	    var SkipperDisk = require('skipper-disk');
	    var fileAdapter = SkipperDisk(/* optional opts */);

	    // set the filename to the same file as the user uploaded
	   // res.set("Content-disposition", "attachment; filename='" + file.name + "'");
	    
	    // Stream the file down
	    //fileAdapter.read( window_url + users.avatarFd)
	    fileAdapter.read( 'http://localhost:1337/' + fix_url )	    
	    .on('error', function (err){
	      return res.serverError(err);
	    })
	    .pipe(res);
	  });
	}
>>>>>>> c638968e7fef42a77fa7cfe0c530d23381f1594d

};

