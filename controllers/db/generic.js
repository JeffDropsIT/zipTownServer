
const mongodb = require("mongodb");
const empty = require("is-empty");
let mongodbClient = mongodb.MongoClient;


//get database by Name
const getDatabaseByName = async() =>{
    let url = 'mongodb://admin:password123@ds143293.mlab.com:43293/ziptown';
  try{
    
    const db = await mongodbClient.connect(url,{useNewUrlParser : true});
    
    if(db.isConnected){
      console.log("connected");
      
    return { db: db.db("ziptown"), connection: db};
    }
    
  }catch (err) {
    throw new Error(err);
  }
};




const checkIfUserContactExist = async (contact) =>{
    try {
        const db = await getDatabaseByName("afroturf");
        const result = await db.db.collection("users").find({contact:contact});
        const arrResult = await result.toArray();
        const json = JSON.parse(JSON.stringify(arrResult));
        const status = empty(json) ? 0 : 1;
        db.connection.close();
        return status;
    } catch (error) {
        throw new Error(error);
    }
}

const insertIntoCollection = async (collectionName, data) =>{
    console.log("begin Inserting");
    try{
        const db = await getDatabaseByName();
        const result = await db.db.collection(collectionName).insert(data)
        db.connection.close();
        console.log("Done Inserting");
        return  {ok: result.result.ok, _id: result.ops[0]._id.toString()};
    }catch(err){
        console.log("insertIntoCollection failed");
        throw new Error(err);
    }
    
};
module.exports = {
    getDatabaseByName,
    insertIntoCollection,
    checkIfUserContactExist
}