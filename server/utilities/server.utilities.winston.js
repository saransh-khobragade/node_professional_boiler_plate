const winston = require('winston');

require('winston-papertrail').Papertrail;

const
  winston_config = central_config['winston'],
  util = require('util');

const winstonPapertrail = new winston.transports.Papertrail(winston_config);

winstonPapertrail.on('error', (err) => {
  console.log("[winstonPapertrail] error: ", err);
});

const logger = new winston.Logger({
  transports: [winstonPapertrail]
});

logger.put = (msg, res, timed, error) => {

  console.log(msg)

  msg = util.format('[Worker : %s]%s', process.pid, msg);
  if (res && res.get(app_constants.corr_id)) {
    msg = util.format('[Request : %s]%s', res.get(app_constants.corr_id), msg);
  }
  if (res && timed && res.get(app_constants.init_time)) {
    msg = util.format('%s => %dms', msg, (Date.now() - parseInt(res.get(app_constants.init_time))));
  }
  logger.info(msg);

  if (error && (error instanceof Error)) {
    let error_msg = util.format('[Worker : %s]', process.pid);
    if (res && res.get(app_constants.corr_id)) {
      error_msg = util.format('[Request : %s]%s %s', res.get(app_constants.corr_id), error_msg, error.message);
    }
    error_msg = util.format('%s Stack : %s', error_msg, error.stack);
    logger.info(error_msg);

  }
};

module.exports = logger;