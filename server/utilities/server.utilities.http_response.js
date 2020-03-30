const util = require('util');

module.exports = {

  //Success
  ok: (res, msg, err_code) => {
    if (res && res.get(app_constants.corr_id)) {
      msg = util.format('%s (Trace ID: %s)', msg, res.get(app_constants.corr_id));
    }
    if(!res._headerSent)
      res.status(200).json({status: 'success', message: msg, error_code: err_code})
  },

  not_modified: (res, msg, err_code) => {
    if (res && res.get(app_constants.corr_id)) {
      msg = util.format('%s (Trace ID: %s)', msg, res.get(app_constants.corr_id));
    }
    if(!res._headerSent)
      res.status(304).json({status: 'failed', message: msg, error_code: err_code});
  },

  //Client Errors
  bad_request: (res, msg, err_code,business_error_code=null) => {
    if (res && res.get(app_constants.corr_id)) {
      msg = util.format('%s (Trace ID: %s)', msg, res.get(app_constants.corr_id));
    }
    let response = {status: 'failed', message: msg, error_code: err_code};
    if(business_error_code){
      response['business_error_code'] = business_error_code;
    }
    if(!res._headerSent)
      res.status(400).json(response);
  },

  unauthorized: (res, msg, err_code) => {
    if (res && res.get(app_constants.corr_id)) {
      msg = util.format('%s (Trace ID: %s)', msg, res.get(app_constants.corr_id));
    }
    if(!res._headerSent)
      res.status(401).json({status: 'failed', message: msg, error_code: err_code});
  },

  forbidden: (res, msg, err_code) => {
    if (res && res.get(app_constants.corr_id)) {
      msg = util.format('%s (Trace ID: %s)', msg, res.get(app_constants.corr_id));
    }
    if(!res._headerSent)
      res.status(403).json({status: 'failed', message: msg, error_code: err_code});
  },

  not_found: (res, msg, err_code) => {
    if (res && res.get(app_constants.corr_id)) {
      msg = util.format('%s (Trace ID: %s)', msg, res.get(app_constants.corr_id));
    }
    if(!res._headerSent)
      res.status(404).json({status: 'failed', message: msg, error_code: err_code});
  },

  not_acceptable: (res, msg, err_code) => {
    if (res && res.get(app_constants.corr_id)) {
      msg = util.format('%s (Trace ID: %s)', msg, res.get(app_constants.corr_id));
    }
    if(!res._headerSent)
      res.status(406).json({status: 'failed', message: msg, error_code: err_code});
  },

  gone: (res, msg, err_code) => {
    if (res && res.get(app_constants.corr_id)) {
      msg = util.format('%s (Trace ID: %s)', msg, res.get(app_constants.corr_id));
    }
    if(!res._headerSent)
      res.status(410).json({status: 'failed', message: msg, error_code: err_code});
  },

  enhance_your_calm: (res, msg, err_code) => {
    if (res && res.get(app_constants.corr_id)) {
      msg = util.format('%s (Trace ID: %s)', msg, res.get(app_constants.corr_id));
    }
    if(!res._headerSent)
      res.status(420).json({status: 'failed', message: msg, error_code: err_code});
  },

  unprocessable_entity: (res, msg, err_code) => {
    if (res && res.get(app_constants.corr_id)) {
      msg = util.format('%s (Trace ID: %s)', msg, res.get(app_constants.corr_id));
    }
    if(!res._headerSent)
      res.status(422).json({status: 'failed', message: msg, error_code: err_code});
  },

  //Server Errors
  internal_server_error: (res, msg, err_code) => {
    if (res && res.get(app_constants.corr_id)) {
      msg = util.format('%s (Trace ID: %s)', msg, res.get(app_constants.corr_id));
    }
    if(!res._headerSent)
      res.status(500).json({status: 'failed', message: msg, error_code: err_code});
  },

  bad_gateway_api: (res, msg, err_code) => {
    if (res && res.get(app_constants.corr_id)) {
      msg = util.format('%s (Trace ID: %s)', msg, res.get(app_constants.corr_id));
    }
    if(!res._headerSent)
      res.status(502).json({status: 'failed', message: msg, error_code: err_code});
  }

};