module.exports = function () {
  const Localize = require("localize");
  const error = require("./../utils/errorMsg");
  var paramsErrorMsg = new Localize(error.PARAM_ERROR);
  var ctrlErrorMsg = new Localize(error.ERROR);
  var ctrlSuccessMsg = new Localize(error.SUCCESS);

  this.afterRequestHandler = (request, response, message) => {
    if (message.msg == undefined) {
      message.msg = "NO_RESP_MESSAGE";
    }

    if (message.error == undefined) {
      message.error = true;
      message.msg = "NO_RESP_ERROR";
    }

    const lexical = message.error ? ctrlErrorMsg : ctrlSuccessMsg;
    const translation = this.translateMsg(
      lexical,
      message.msg,
      request.aux.lang
    );

    message.msg = translation.msg;

    if (!message.error && request.query.page) {
      // Paginate the data
      let limit = this.getQueryLimit(
        request.headers.source,
        request.aux.app_conf
      );
      message.data = this.paginateData(message.data, request.query.page, limit);
    }

    return response.send(message);
  };

  this.translateMsg = (lexical, msg, lang) => {
    let response = { error: true };

    try {
      lexical.setLocale(lang);
      msg = msg.split(",");
      response.msg = lexical.translate(msg[0], msg[1], msg[2], msg[3]);
      response.error = false;
    } catch (err) {
      response.msg = err.message;
    }

    return response;
  };
};
