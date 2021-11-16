const {
    restaurantsModal,
    menusModal,
    restaurantMenuModal,
    cityModal,
    cityMenuMap,
    cuisineModal,
    restaurantCityModal,
    cuisineRestaurantMapModal,
    restaurantMenuMapModal
} = require('../config/sequelize');

module.exports = function () {

    this.fetchRestaurants = async (payload) => {
        var response = {}
        return new Promise((resolve) => {
            var query
            if (payload.id) {
                query = cuisineRestaurantMapModal.findAll({
                    where: {
                        cuisine_id: payload.id
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

    this.fetchCityRestaurants = async (payload) => {
        var response = {}
        return new Promise((resolve) => {
            var query
            if (payload.id) {
                query = restaurantMenuMapModal.findAll({
                    where: {
                        city_id: payload.id,
                    },
                    include: [
                        {
                            model: restaurantsModal
                        },
                        {
                            model: cityModal
                        }
                    ]
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
                query = cuisineRestaurantMapModal.findAll({
                    where: {
                        cuisine_id: payload.id
                    },
                    include: [{
                        model: restaurantsModal,
                        include: [{
                            model: restaurantMenuMapModal
                        }]
                    }]
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

    this.fetchPopularCuisines = async (payload) => {
        var response = {}
        return new Promise((resolve) => {
            cuisineModal.findAll({
                where: {
                    is_popular: 1
                }
            }).then((rows) => {
                response.error = false
                response.data = rows
                response.msg = 'VALID'
                resolve(response)
            }).catch(error => {
                response.error = true
                response.msg = `DBERROR: $[1],${error.message}`
                resolve(response)
            })
        })
    }

}