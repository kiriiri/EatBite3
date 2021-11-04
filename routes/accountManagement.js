module.exports = function (server, express) {

  require('../controller/accountManagement')()

  const basePath = "/api/account/";

  server.get(basePath + "users", (request, response) => {
    this.getUsers(request.body, (result) => {
      this.afterRequestHandler(request, response, result);
    });
  });

  
  
};
