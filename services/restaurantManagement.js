const {
    restaurantsModal,
    menusModal,
    restaurantMenuModal,
    cityModal,
    cityMenuMap
} = require('../config/sequelize');

module.exports = function(){

    this.fetchRestaurants = async (payload) => {
        var response = {};
        return new Promise(async function (resolve) {
            try {
                var condition = {};
                condition.config_name = "AUTH_TYPE";
                await restaurantsModal
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

    this.fetchMenus = async (payload) => {
        var response = {}
        return new Promise((resolve) => {
            var query
            if (payload.id) {
                query = restaurantMenuModal.findAll({
                    where: {
                        restaurant_id: payload.id
                    },
                    attributes: ['id', 'restaurant_id', 'city_id'],
                    include: [
                        {
                            model: restaurantsModal,
                            attributes: ['id', 'name', 'description'],
                        },
                        {
                        model: cityModal,
                        attributes: ['id', 'name'],
                        include : [{
                            model : cityMenuMap,
                            attributes: ['id', 'menu_id', 'city_id'],
                            include : [{
                                model : menusModal,
                                attributes: ['id', 'name', 'ingredients'],
                            }]
                        }]
                    }]
                })
            } else {
                query = menusModal.findAll()
            }
            query.then((rows) => {
                response.error = false
                response.data = rows
                response.msg = 'VALID'
                resolve(response)
            })
            query.catch(error => {
                response.error = true
                response.msg = `DBERROR: $[1],${error.message}`
                resolve(response)
            })
        })
    }

    
}