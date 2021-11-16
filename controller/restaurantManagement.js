const error = require('./../utils/errorMsg')

module.exports = function(){

    require('../services/restaurantManagement')()

    this.getRestaurants = async (payload, callback) => { 
        var response = {error: true};
        const result = await this.fetchRestaurants(payload)
        if (result.error) {
          response.msg = result.msg
        } else {
          var data = {}
          if (result.data.exist) {
            data = {...result.data.acc}
          }
          response.error = false
          response.msg = result.msg
          response.data = result.data
        }
        callback(response)
      }

      this.getCityRestaurants = async (payload, callback) => { 
        var response = {error: true};
        const result = await this.fetchCityRestaurants(payload)
        if (result.error) {
          response.msg = result.msg
        } else {
          var data = {}
          if (result.data.exist) {
            data = {...result.data.acc}
          }
          response.error = false
          response.msg = result.msg
          response.data = result.data
        }
        callback(response)
      }

      this.getPopularMenus = async (payload, callback) => { 
        var response = {error: true};
        const result = await this.fetchPopularMenus(payload)
        if (result.error) {
          response.msg = result.msg
        } else {
          var data = {}
          if (result.data.exist) {
            data = {...result.data.acc}
          }
          response.error = false
          response.msg = result.msg
          response.data = result.data
        }
        callback(response)
      }

      this.getCities = async (payload, callback) => { 
        var response = {error: true};
        const result = await this.fetchCities(payload)
        if (result.error) {
          response.msg = result.msg
        } else {
          var data = {}
          if (result.data.exist) {
            data = {...result.data.acc}
          }
          response.error = false
          response.msg = result.msg
          response.data = result.data
        }
        callback(response)
      }

      this.getCuisines = async (payload, callback) => { 
        var response = {error: true};
        const result = await this.fetchCuisines(payload)
        if (result.error) {
          response.msg = result.msg
        } else {
          var data = {}
          if (result.data.exist) {
            data = {...result.data.acc}
          }
          response.error = false
          response.msg = result.msg
          response.data = result.data
        }
        callback(response)
      }

      this.getPopularCuisines = async (payload, callback) => { 
        var response = {error: true};
        const result = await this.fetchPopularCuisines(payload)
        if (result.error) {
          response.msg = result.msg
        } else {
          var data = {}
          if (result.data.exist) {
            data = {...result.data.acc}
          }
          response.error = false
          response.msg = result.msg
          response.data = result.data
        }
        callback(response)
      }

}