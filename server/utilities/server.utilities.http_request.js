let request = require('request');

let http_request = {};

http_request.get = (options, response, callback) => {
  if (response && response.get(app_constants.corr_id)) {
    if (!options.headers) {
      options.headers = {};
    }
    options.headers[app_constants.corr_id] = response.get(app_constants.corr_id);
  }
  request.get(options, (error, httpResponse, result) => {
    callback(error, httpResponse, result);
  });
};

http_request.put = (options, response, callback) => {
  if (response && response.get(app_constants.corr_id)) {
    if (!options.headers) {
      options.headers = {};
    }
    options.headers[app_constants.corr_id] = response.get(app_constants.corr_id);
  }
  request.put(options, (error, httpResponse, result) => {
    callback(error, httpResponse, result);
  });
};

http_request.post = (options, response, callback) => {
  if (response && response.get(app_constants.corr_id)) {
    if (!options.headers) {
      options.headers = {};
    }
    options.headers[app_constants.corr_id] = response.get(app_constants.corr_id);
  }
  request.post(options, (error, httpResponse, result) => {
    callback(error, httpResponse, result);
  });
};

module.exports = http_request;