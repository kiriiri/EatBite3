const {
    personalDetailsModal,
    restaurantsModal,
    menusModal,
    restaurantMenuModal,
    cityModal,
    cityMenuMap,
    cuisineModal,
    restaurantCityModal,
    cuisineRestaurantMapModal,
    restaurantMenuMapModal,
    restaurantListingModal,
    customerModal,
    contactModal,
    connection
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

    this.addRestaurantListing = async (payload) => {
        var response = {}
        return new Promise(async function (resolve){
            await restaurantListingModal.create(payload)
            .then((rows) => {
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

    this.addContactInfo = async (payload) => {
        var response = {}
        return new Promise(async function (resolve) {
            await contactModal.create(payload)
            .then((rows) => {
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

    this.createCustomer = async (payload) => {
        var response = {}
        var personal_details;
        var customer_details;
        var transaction;

        return new Promise(async function (resolve) {

            try {
                
                transaction = await connection.transaction();
                await personalDetailsModal.findOrCreate({
                    where : {
                        id_number : payload.id_number
                    },
                    defaults:{
                        first_name: payload.first_name,
                        last_name: payload.last_name,
                        id_number: payload.id_number,
                        country_id: 1,
                        created_by : 1
                    },
                    transaction
                })
                .then(async function (rows){
                    personal_details = rows[0].dataValues
                    response.personal_details = personal_details
                })

                await customerModal.findOrCreate({
                    where : {
                        detail_id : personal_details.id
                    },
                    defaults:{
                        detail_id : personal_details.id,
                        created_by : 1
                    },
                    transaction
                })
                .then(async function (rows){
                    await transaction.commit()
                    customer_details = rows[0].dataValues
                    response.customer_details = customer_details
                    response.error = false
                    response.msg = 'VALID'
                    resolve(response)
                })

            } catch (err) {
                console.log("error....  ", err)
                await transaction.rollback().then (done =>{
                    response.error = true
                    response.msg = `DBERROR: $[1],${err.message}`
                    resolve(response)
                })
            }
        })
    }

}