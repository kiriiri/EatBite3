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

      this.getMenus = async (payload, callback) => { 
        var response = {error: true};
        const result = await this.fetchMenus(payload)
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