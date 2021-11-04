module.exports = function (server, express) {

    require('../controller/restaurantManagement')()
  
    const basePath = "/api/restaurant/";
  
    server.get(basePath, (request, response) => {
      this.getRestaurants(request.body, (result) => {
        this.afterRequestHandler(request, response, result);
      });
    });
  
    server.get(basePath + "getMenus/:restaurant_id?", (request, response) => {
      var data = {};
      data.id = request.params.restaurant_id || request.query.restaurant_id;
      this.getMenus(data, (result) => {
        this.afterRequestHandler(request, response, result);
      });
    });
    
    
  };