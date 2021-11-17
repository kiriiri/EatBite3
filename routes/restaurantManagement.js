module.exports = function (server, express) {

    require('../controller/restaurantManagement')()
  
    const basePath = "/api/restaurant/";
  
    server.get(basePath + "getRestaurants/:cuisine_id?", (request, response) => {
      var data = {};
      data.id = request.params.cuisine_id || request.query.cuisine_id;
      this.getRestaurants(data, (result) => {
        this.afterRequestHandler(request, response, result);
      });
    });
  
    server.get(basePath + "getCityRestaurants/:restaurant_id", (request, response) => {
      var data = {};
      data.id = request.params.restaurant_id || request.query.restaurant_id;
      this.getCityRestaurants(data, (result) => {
        this.afterRequestHandler(request, response, result);
      });
    });

    server.get(basePath + "getPopulorMenus", (request, response) => {
      var data = {};
      this.getCityRestaurants(data, (result) => {
        this.afterRequestHandler(request, response, result);
      });
    });
  
    server.get(basePath + "getPopularMenus", (request, response) => {
      this.getPopularMenus(request.body, (result) => {
        this.afterRequestHandler(request, response, result);
      });
    });

    server.get(basePath + "getCities", (request, response) => {
      this.getCities(request.body, (result) => {
        this.afterRequestHandler(request, response, result);
      });
    });

    server.get(basePath + "getCuisines/:cuisine_id?", (request, response) => {
      var data = {};
      data.id = request.params.cuisine_id || request.query.cuisine_id;
      this.getCuisines(data, (result) => {
        this.afterRequestHandler(request, response, result);
      });
    });

    server.get(basePath + "getPopularCuisines", (request, response) => {
      this.getPopularCuisines(request.body, (result) => {
        this.afterRequestHandler(request, response, result);
      });
    });

    server.post(basePath + "listRestaurant", (request, response) => {
      this.listRestaurant(request, (result) => {
        this.afterRequestHandler(request, response, result);
      });
    });

    server.post(basePath + "contact", (request, response) => {
      this.submitContactInfo(request, (result) => {
        this.afterRequestHandler(request, response, result);
      });
    });

    server.post(basePath + "createCustomer", (request, response) => {
      this.addCustomer(request, (result) => {
        this.afterRequestHandler(request, response, result);
      });
    });
    
  };