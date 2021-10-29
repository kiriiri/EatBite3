module.exports = function (server, express) {

  const basePath = '/users'
    server.get(basePath , (req, res) => {
      res.send('respond with a resource');
    })

}