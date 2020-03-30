const central_config = {
    "secret": 'supersecret',
    "redis": {
        "hostname": "localhost",
        "port": 6379
      },
    "mongodb":{
      "uri":"mongodb+srv://saransh98:12345@cluster0-7pbxe.gcp.mongodb.net/test?retryWrites=true&w=majority",
      "db_name":"inventory_management"
    },
    "winston": {
      "host": "logs3.papertrailapp.com",
      "port": 23510,
      "level": "info"
    }
}

module.exports = central_config