const { DataTypes } = require('sequelize')

const { History, Consultants, Users} = require("../../models/");

// ============================ HISTORY OF ENTRES & USER SENDING MAIL ASSOCIATIONS ============================ //

Consultants.hasMany(History,{
    foriegnKey:{
        type: DataTypes.UUID,
        allowNull:false
    }
});
History.belongsTo(Consultants)

Users.hasMany(History,{
    foriegnKey:{
        type: DataTypes.UUID,
        allowNull:false
    }
});
History.belongsTo(Users)


module.exports = { Users, History,Consultants };