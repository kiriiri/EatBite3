const {
    personalDetailsModal
} = require('../config/sequelize');

module.exports = function(){

    this.getExistingUsers = async (payload) => {
        var response = {};
        return new Promise(async function (resolve) {
            try {
                var condition = {};
                condition.config_name = "AUTH_TYPE";
                await personalDetailsModal
                    .findAll()
                    .then(function (rows) {
                        console.log("rows.............", rows);
                        response.error = false;
                        response.data = rows;
                        response.msg = "VALID";
                        resolve(response);
                    })
                    .catch((error) => {
                        response.error = true;
                        response.msg = `DBERROR: $[1],${error.message}`;
                        resolve(response);
                    });
                resolve(response);
            } catch (err) {
                err.error = true;
                resolve(err);
            }
        });
    };

    
}