module.exports = function (server, express) {

  const basePath = '/'
    server.get(basePath , (req, res) => {
      res.render('index', { title: 'Express' });
    })

}