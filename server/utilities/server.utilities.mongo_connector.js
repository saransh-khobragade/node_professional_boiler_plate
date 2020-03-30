const MongoClient = require('mongodb').MongoClient;
const mongo_config = central_config['mongodb']
const uri = "mongodb+srv://saransh98:12345@cluster0-7pbxe.gcp.mongodb.net/test?retryWrites=true&w=majorityy";

module.exports = {
  connectToServer: function( ) {
    return new Promise((resolve,reject)=>{
        MongoClient.connect( mongo_config.uri,  { useNewUrlParser: true }, function( err, client ) {
            if(!err){
                return resolve({client,db:client.db(mongo_config.db_name)});
            }
            reject( err );
        });
    });
  	
  }, 
  closeConnection:async (client) => {
      try{
        client.close();
        return true;
      }catch(e){
        throw new Error(e.message);
      }
  }
};

