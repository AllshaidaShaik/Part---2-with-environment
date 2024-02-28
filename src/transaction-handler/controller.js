const map = require('./map');
const _ = require('lodash');
const { getMetadataConfig } = require('../../shared/db/metadata');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = function () {
    return {
        healthcheck(req, res) {
            map.healthcheck(req, res);
        },
        getAll(req, res) {
            const model = req.originalUrl.split("/")[3];
            const { sequelize } = global.components;
            const { where, customizeQuery } = req.query;
            const { type, name, whereClause, baseQuery, order } = getMetadataConfig(model, 'list')['tableInfo'];
            let query;
            console.log(customizeQuery, "customizeQuery::::::")
            if (customizeQuery) {
                query = sequelize.query(customizeQuery, { type: sequelize.QueryTypes.SELECT });
            } else {
                const base = `${baseQuery}`;
                query = sequelize.query(base, { type: sequelize.QueryTypes.SELECT });
            }
            query.then(
                data => map.getAll(req, res, data),
                err => map.error(req, res, err),
            );
        },
        update(req, res) {
            const model = req.originalUrl.split("/")[3];
            const { sequelize } = global.components;
            if (model === "form-delete-details-id") {
                try {
                    let deletestatus = `DELETE from form where form_id=${req.body.form_id}`
                    let query = sequelize.query(deletestatus, { type: sequelize.QueryTypes.DELETE });
                    query.then(
                        map.put(req, res, { success: true, message: "Deleted Form Successfully" }),
                        map.error(req, res, err),
                    );
                } catch (ex) {
                    map.error(req, res, { err: ex })
                }
            }
        },

        condition(req, res) {
            const model = req.originalUrl.split("/")[3];
            const { sequelize } = global.components;
        },
        login(req, res) {
            const model = req.originalUrl.split("/")[3];
            const { sequelize } = global.components;
            if (model === "login") {
                try {
                    let password = bcrypt.hash(req.body.password, 10);
                    const customizeQuery = `select * from login where user_name= '${req.body.user_name}' and active=1 `
                    let query = sequelize.query(customizeQuery, { type: sequelize.QueryTypes.SELECT });
                    query.then(
                        login => {
                            console.log("=====>", login[0], password, login.password);
                            if (login.length !== 0) {

                                if (login[0].password === req.body.password) {

                                    const token = jwt.sign({ user_id: login[0].login_id }, 'secret_key', { expiresIn: '1h' });

                                    const obj = {
                                        token: token,
                                        login_id: login[0].login_id,
                                        active: 1
                                    }
                                    console.log("======>", obj);
                                    _.get(global.components.dbConnections, 'token', '').create(obj).then(
                                        data1 => {
                                            console.log("======>", data1);
                                            const customizeQuery1 = `select * from login l
                                            join token t on l.login_id=t.login_id
                                            where l.login_id= ${login[0].login_id}  and l.active=1 and t.token_id=${data1.token_id}`
                                            query1 = sequelize.query(customizeQuery1, { type: sequelize.QueryTypes.SELECT });
                                            query1.then(
                                                data2 => map.put(req, res, data2),
                                                err => map.error(req, res, err),
                                            )
                                        })
                                } else {
                                    map.error(req, res, { err: `Invalid Password` })
                                }
                            } else {
                                map.error(req, res, { err: `User Name Doesn't Exists` })
                            }
                        }, err => map.error(req, res, err),
                    );
                } catch (ex) {
                    map.error(req, res, { error: ex })
                }
            }

        },

        get(req, res) {
            const model = req.originalUrl.split("/")[3];
            const { sequelize } = global.components;
            const { where, customizeQuery } = req.query;
            const { type, name, whereClause, baseQuery, order } = getMetadataConfig(model, 'list')['tableInfo'];
            let query;
            if (customizeQuery) {
                query = sequelize.query(customizeQuery, { type: sequelize.QueryTypes.SELECT });
            } else {

                const base = `${baseQuery} where ${whereClause}`;
                query = sequelize.query(base, { type: sequelize.QueryTypes.SELECT });
            }
            query.then(
                data => map.get(req, res, data),
                err => map.error(req, res, err),
            );
        },

        post(req, res) {
            const model = req.originalUrl.split("/")[3];
            const { sequelize } = global.components;
            if (model === "form-save-details") {
                try {
                    let customizeQuery = `select * from form where email = '${req.body.email}' and active=1 `
                    let query = sequelize.query(customizeQuery, { type: sequelize.QueryTypes.SELECT });
                    query.then(
                        data => {
                            dataValue = data.length;
                            if (dataValue === 0) {
                                const obj = {
                                    first_name: req.body.first_name,
                                    middle_name: req.body.middle_name,
                                    last_name: req.body.last_name,
                                    address: req.body.address,
                                    country: req.body.country,
                                    state: req.body.state,
                                    city: req.body.city,
                                    zip_code: req.body.zip_code,
                                    email: req.body.email,
                                    phone_number: req.body.phone_number,
                                    height: req.body.height,
                                    height_type: req.body.height_type,
                                    weight: req.body.weight,
                                    active: 1,
                                }
                                console.log("====>", obj);
                                _.get(global.components.dbConnections, 'form', '').create(obj).then(
                                    data => map.post(req, res, data),
                                    err => map.error(req, res, err))
                            } else {
                                map.error(req, res, { err: `Email Already Exists` })
                            }
                        }, err => map.error(req, res, err))
                } catch (ex) {
                    map.error(req, res, { err: ex })
                }
            }
        },


        put(req, res) {
            const model = req.originalUrl.split("/")[3];
            const { sequelize } = global.components;
            const { id } = req.params;
            const { type, name, whereClause, baseQuery, order } = getMetadataConfig(model, 'list')['tableInfo'];
            _.get(global.components.dbConnections, model, '').update(req.body, {
                where: {
                    [whereClause]: id
                }
            }).then(
                data => map.put(req, res, data),
                err => map.error(req, res, err)
            );

        },

        delete(req, res) {
            const model = req.originalUrl.split("/")[3];
            const { sequelize } = global.components;
            const { where, customizeQuery } = req.query;
            const { type, name, whereClause, baseQuery, order } = getMetadataConfig(model, 'list')['tableInfo'];
            let query;
            console.log(customizeQuery, "customizeQuery::::::", req.query, req.params)
            query = sequelize.query(customizeQuery, { type: sequelize.QueryTypes.SELECT });
            query.then(
                data => {
                    if (data.length > 0) {
                        _.get(global.components.dbConnections, model, '').update({ Isactive: "InActive" }, {
                            where: {
                                [whereClause]: req.params.id
                            }
                        }).then(
                            data => map.delete(req, res, data),
                        )
                    }
                },
                err => map.error(req, res, err),
            );
        },


    }
}();