const generic = require("../generic")



//get the index of any collection
const getNextSequenceValue = async (sequenceName, collectionIndex) => {
    try {
        const db = await generic.getDatabaseByName();
        const sequenceDocument = await db.db.collection(collectionIndex).findAndModify(
            {_id: sequenceName },
            [],
            {$inc:{lastAdded:1}},
            {new:true}
        );

        db.connection.close();
        return await sequenceDocument.value.lastAdded;
        
    } catch (error) {
        throw new Error(error);
    }
};

const getNextSequenceValueDelete = async (sequenceName, collectionIndex) => {
    try {
        const db = await generic.getDatabaseByName();
        const sequenceDocument = await db.db.collection(collectionIndex).findAndModify(
            {_id: sequenceName },
            [],
            {$inc:{lastAdded:-1}},
            {new:true}
        );

        db.connection.close();
        return await sequenceDocument.value.lastAdded;
        
    } catch (error) {
        throw new Error(error);
    }
};



//getNextSequenceValueDelete("userId", "usersIndex").then(data => console.log("number of users "+data))
//getNextSequenceValue("userId", "usersIndex").then(data => console.log("number of users "+data))

module.exports = {
    getNextSequenceValue,
    getNextSequenceValueDelete
}