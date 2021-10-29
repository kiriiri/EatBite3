async function beforeRequest(request, response, next) {
    // console.log(request._parsedUrl.pathname)
    // Pre-process request
    // console.log(request);
    const lang = request.headers.lang || "default";
    request.aux = {} // Set auxiliary configs globally - eliminates the need to load them later
    request.aux.lang = lang // Set language
    let route = request.url
    let to_index = route.indexOf('?') // Get inde of the parameters marker
    to_index > 0 ? route = route.slice(0, to_index) : route = route // Trim parameters to get the route for authentication
    request.aux.req_route = route;
    var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') // Current date and time
    var logs = `[${date}] "${route}":` // Compose system logs



    console.log(`LOGS: ${logs}\n\n`)
    // console.log('AUXILIARIES: ', request.aux, '\n\n')
    result = null
    next()
    
}

module.exports = { beforeRequest }
