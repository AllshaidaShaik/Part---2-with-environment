const express =require('express');
module.exports =function () {
    return function (){
        const controller =require("./controller");
        const router = express.Router();
        // router.post('/condition', controller.condition)
        // router.get ('/healthcheck', controller.healthcheck);
        // router.get ('/', controller.getAll);
        router.get ('delete:id', controller.delete);
        // router.get ('/:id', controller.get);
        router.post('/login', controller.login);
        // router.post('/user-login', controller.userLogin);
        router.post('/update', controller.update);
        router.post('/add', controller.post);
        router.put ('/:id', controller.put);
        return router;
    };

}(); 