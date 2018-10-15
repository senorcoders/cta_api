/**
 * FormInfoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    getFormInfo : async (req, res) => {
        var params = req.allParams();
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

        forms = await Forms.find({
            user: userExist.id,
            id: params.formID
        })
        .then( (form) => {
            return form;
        })
        .catch( (error) => {
            return res.serverError(error);
        } )

        if(!forms || forms.length < 1)
            return res.status(401).send({error:true, message: 'Form not found.', status: 401 });

        formEmails = await FormInfo.find({
            form: forms.id
        }) 
        .then( (emails) => {
            return emails;
        } )
        .catch( (error) => {
            return res.serverError(error);
        } )

        if(!formEmails || formEmails.length < 1)
            return res.status(401).send({error:true, message: 'No Email yet.', status: 401 });

        res.status(200).send( formEmails );
        
    },
    createFormInfo : async (req, res) => {
        var params = req.allParams();
        if(!params.email || !validEmail(params.email))
            return res.send(401, { error : true, message : "El correo es obligatorio ó no es valido", status : 401 });
        
        userExist = await Users.find( {
            email: params.email,
            domain: req.hostname
        } )
        .then( function( user ) {            
            return user
        } )
        .catch( function( error ) {
            return res.serverError( error );
        } )

        if (!userExist) {
            return res.status(401).send({error:true, message: 'User not exists or domain is not valid.', status: 401 });
        }

        emailAlreadyExist = await FormInfo.find(
         {
            email: params.signupEmail,
            form: params.formID
        })
        .then( function( forminfo ) {            
            return forminfo;
        } )
        .catch( function( error ) {
            return res.serverError( error );
        } )

        if (emailAlreadyExist.length > 0) {
            console.log(emailAlreadyExist);
            return res.status(401).send({error:true, message: 'Email already signup here.', status: 401 });
        }

        inserterFormInfo = await FormInfo.create({
            name: params.name,
            form: params.formID,
	    birthday: params.birthday,
            email: params.signupEmail
        }).fetch()
        .then( function( newSign ) {
            return newSign
        } )
        .catch( function( error ) {
            return res.serverError( error );
        } )

        res.status(200).json( inserterFormInfo );

        
    },

};

function validEmail(email) {
    return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
        email
    );
}