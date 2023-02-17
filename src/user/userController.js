var userService = require('./userServices');

var createUserControllerFunc = async (req, res) =>  {
    try {
    console.log(req.body);
    var status = await userService.createUserDBService(req.body);
    console.log(status);

    if (status) {
        res.send({ "status": true, "message": "Usuario creado" });
    } else {
        res.send({ "status": false, "message": "Error creando usuario" });
    }
    }
    catch(err) {
        console.log(err);
    }
}

var loginUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.loginuserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

const searchUserControllerFunc = async(req,res) => {
   let result1 = null;
    try{
         result1 = await userService.searchUserDBService(req.body);
        if(result1.status){
            res.send({ "status": true, "message": result1.msg, "user": result1.user});
        } else {
            res.send({ "status": false, "message": result1.msg});
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }

        
}
const deleteUserControllerFunc = async(req,res) => {
    let message = null;
    try{
        message = await userService.deleteUserDBService(req.body);
        if(message.status){
            res.send({ "status": true, "message": message.msg });
        } else {
            res.send({ "status": false, "message": message.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

module.exports = { createUserControllerFunc, loginUserControllerFunc, searchUserControllerFunc, deleteUserControllerFunc };