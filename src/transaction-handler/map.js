module.exports = function () {
    let success = true;
    return {
        error(req, res, error) {
            res.status(200).send({ success: false, error });
        },
        healthcheck(req, res) {
            const result = {
                last_push: new Date().toISOString()
            };
            res.status(200).send(result);
        },
        getAll(req, res, data) {
            const result = {
                success,
                data
            };
            res.status(200).send(result);
        },
        get(req, res, data) {
            const result = {
                success,
                data: data[0]
            };
            res.status(200).send(result);
        },
        getMulti(req, res, data) {
            const result = {
                success,
                data,
                message: "Created Successfully."
            };
            res.status(200).send(result);
        },
       valid(req, res, data){
            success =true;
            const result ={
                success,
                data,
                message: ""
            };
            res.status(200).send(result);
        },
       testvalid(req, res, data){
            success =true;
            const result ={
                success,
                data,
                message: ""
            };
            res.status(200).send(result);
        },
        post(req, res, data){
            const result ={
                success,
                data,
                message: "Created Successfully........"
            };
            res.status(200).send(result);
        },
        put(req, res, data){
            const result ={
                success,
                data,
                message: "Success........!"
            };
            res.status(200).send(result);
        },
        sendpassword(req, res, data){
            console.log((data), "data>>>>>>>>")
            const result ={
                success,
                data,
                message: "Created Successfully."
            };
            res.status(200).send(result);
        },
        changepassword(req, res, data){
            console.log((data), "data>>>>>>>>>>>")
            const result ={
                success,
                data,
                message: "Created Successfully."
            };
            res.status(200).send(result);
        },
        delete(req, res, data){
            const result= {
                success,
                data,
                message: "Created Successfully"
            };
            res.status(200).send(result);
        },

    };
}();