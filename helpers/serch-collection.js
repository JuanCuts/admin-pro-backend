const Doctor = require("../models/doctor")
const Hospital = require("../models/hospital")
const User = require("../models/user")

const helperCollection = {
    users: User,
    hospitals: Hospital,
    doctors: Doctor
}

const helperCollectionName = ['doctor', 'hospital', 'user'];

module.exports = {
    helperCollection,
    helperCollectionName
}

