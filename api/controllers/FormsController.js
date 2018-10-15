/**
 * FormsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    createForm: async ( req, res ) => {
        var params = req.allParams();
        if(!params.email || !validEmail(params.email))
            return res.send(401, { error : true, message : "El correo es obligatorio ó no es valido", status : 401 });
        
        console.log('starting validation');
		let doctorID  = req.param('doctorID');
		let response = {};
        
        userExist = await Users.findOne( {
            email: params.email
        } )
        .then( function( user ) {
            delete user["password"];
            return user
        } )
        .catch( function( error ) {
            return res.serverError( error );
        } )

        var createForm = await Forms.create({
            formtype  : params.formType,            
            name 	  : params.name,
            user 	  : userExist.id	
        }).fetch();
        
		 res.json( createForm );

    },  
    getFormInfo : async (req, res) => {
        var params = req.allParams();
        console.log( params.email );
        if(!params.email || !validEmail(params.email))
            return res.send(401, { error : true, message : "El correo es obligatorio ó no es valido", status : 401 });
        
        userExist = await Users.find( {
            email: params.email/*,
            domain: req.hostname*/
        } )
        .then( function( user ) {            
            return user
        } )
        .catch( function( error ) {
            return res.serverError( error );
        } )

        if (!userExist) {            
            return res.status(401).send({error:true, message: 'User not valid.', status: 401 });
        }
        console.log( userExist );

        forms = await Forms.find({
            user: userExist.id
        })
        .then( (form) => {
            return form;
        })
        .catch( (error) => {
            return res.serverError(error);
        } )

        if(!forms || forms.length < 1)
            return res.status(401).send({error:true, message: 'Form not found.', status: 401 });

        res.status(200).json( forms )
        
    },

};

function validEmail(email) {
    return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
        email
    );
}