const db = require("../dbConfigure")

module.exports = {
    find,
    findBy,
    findById,
    add
}

function find(){
    return db("users")
}

function findBy(filter){
    return db("users").where(filter)
}

function findById(id){
    return db("users").where({id}).first()
}

function add(user) {
    console.log("user",user)
     return db("users")
        .insert(user)
        .then(ids => {
            console.log("ids",ids)
            return findById(ids[0]);
        })
        .catch(err => console.log("err",err))
}

