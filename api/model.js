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
     return db("users").insert(user).then(ids => findById(ids[0]))
}

