const {
    restaurantsModal,
    menusModal,
    restaurantMenuModal,
    cityModal,
    cityMenuMap,
    cuisineModal,
    restaurantCityModal,
    cuisineRestaurantMapModal
} = require('../config/sequelize');

module.exports = function () {

    this.fetchRestaurants = async (payload) => {
        var response = {}
        return new Promise((resolve) => {
            var query
            if (payload.id) {
                query = cuisineRestaurantMapModal.findAll({
                    where: {
                        cuisine_id : payload.id
                    },
                    include: [
                        {
                            model: restaurantsModal
                        }
                    ]
                })
            } else {
                query = restaurantsModal.findAll()
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

    this.fetchMenus = async (payload) => {
        var response = {}
        return new Promise((resolve) => {
            var query
            if (payload.id) {
                query = restaurantMenuModal.findAll({
                    where: {
                        city_id: payload.id,
                    },
                    attributes: ['id', 'restaurant_id', 'city_id'],
                    include: [
                        {
                            model: restaurantsModal,
                            attributes: ['id', 'name', 'thumbnail_url', 'description'],
                        },
                        {
                            model: cityModal,
                            attributes: ['id', 'name'],
                            include: [{
                                model: cityMenuMap,
                                attributes: ['id', 'menu_id', 'city_id'],
                                include: [{
                                    model: menusModal,
                                    attributes: ['id', 'name', 'thumbnail_url', 'ingredients'],
                                }]
                            }]
                        }]
                })
            } else {
                query = menusModal.findAll({
                    where: {
                        is_popular: 0
                    },
                })
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

    this.fetchPopularMenus = async (payload) => {
        var response = {}
        return new Promise((resolve) => {
            let query = menusModal.findAll({
                where: {
                    is_popular: 1
                },
            })

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

    this.fetchCities = async (payload) => {
        var response = {}
        return new Promise((resolve) => {
            let query = cityModal.findAll()

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

    this.fetchCuisines = async (payload) => {
        var response = {}
        return new Promise((resolve) => {
            let query

            if (payload.id) {
                query = cuisineModal.findAll({
                    where: {
                        id: payload.id
                    },
                    attributes: ['id', 'name', 'description'],
                })
            } else {
                query = cuisineModal.findAll({
                    attributes: ['id', 'name', 'description'],
                })
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