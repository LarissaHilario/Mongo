var userModel = require('./userModel');
var key = 'somekey234567884456753456';
var encryptor = require('simple-encryptor')(key);

module.exports.createUserDBService = (userDetails) => {

   return new Promise(function myFn(resolve, reject) {
       var userModelData = new userModel();

       userModelData.firstname = userDetails.firstname;
       userModelData.lastname = userDetails.lastname;
       userModelData.email = userDetails.email;
       userModelData.password = userDetails.password;
       var encrypted = encryptor.encrypt(userDetails.password);
       userModelData.password = encrypted;

       userModelData.save(function resultHandle(error, result) {

           if (error) {
               reject(false);
           } else {
               resolve(true);
           }
       });
   });
}

module.exports.loginuserDBService = (userDetails)=>  {
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOne({ email: userDetails.email},function getresult(errorvalue, result) {
         if(errorvalue) {
            reject({status: false, msg: "Datos Invalidos"});
         }
         else {
            if(result !=undefined &&  result !=null) {
               var decrypted = encryptor.decrypt(result.password);

               if(decrypted== userDetails.password) {
                  resolve({status: true,msg: "Usuario Validado"});
               }
               else {
                  reject({status: false,msg: "Falla en validacion de usuario"});
               }
            }
            else {
               reject({status: false,msg: "Detalles de usuario invalido"});
            }
         }
      });
   });
}

module.exports.searchUserDBService = (userDetails)=>  {
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOne({ lastname: userDetails.lastname},function getresult(errorvalue, result) {
         if(result) {
            resolve({status: true, msg: "Usuario encontrado", user:{name: result.firstname, apellido: result.lastname, email: result.email}});
         }
         else {
            reject({status: false, msg: "Usuario no encontrado"});
         }
      });
   });
}
module.exports.deleteUserDBService = (userDetails) =>{
   return new Promise(function myFn(resolve, reject)   {
      userModel.findOneAndDelete({ lastname: userDetails.lastname},function getresult(errorvalue, message) {
         if(message) {
            resolve({status: true, msg: "Usuario eliminado"});
         }
         else {
            reject({status: false, msg: "Usuario no encontrado"});
         }
      });
     });
}

