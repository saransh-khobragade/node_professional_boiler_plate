const redis_config = central_config['redis'],
  redis = require('redis'),
  redis_client = redis.createClient(redis_config.port, redis_config.hostname);

redis_client.on('error', (err) => {

  logger.put("[Redis][Connection error] : " + err.message);

});

redis_client.check_cache_api = (req, res, next) => {

  redis_client.get(req.originalUrl, (err, data) => {
    if (data) {
      data = JSON.parse(data);
      logger.put("[Redis][Found][Key] : " + req.originalUrl, res, true);
      return res.status(200).jsonp(data);
    } else {
      return next();
    }
  });

};

redis_client.check_cache_data = (key, callback) => {

  redis_client.get(key, (err, data) => {
    if (data) {
      data = JSON.parse(data);
      logger.put("[Redis][Found][Key] : " + key);
      callback(null,data);
    } else {
      logger.put("[Redis][Not found][Key] : " + key);
      callback("Redis failed to get data for key :"+key);
    }
  });

};

redis_client.set_value = (key, value, ttl) => {

  value = (typeof value === "object") ? JSON.stringify(value) : value;
  if (typeof value === "string") {
    redis_client.set(key, value, 'EX', ttl);
    logger.put("[Redis][set succesful][Key] : " + key);
  }

};

module.exports = redis_client;