
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Entries", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        firstname:{
            type:DataTypes.STRING,
            allowNyll: false,
           
        },
        lastname:{
            type:DataTypes.STRING,
            allowNyll: false,
           
        },
        email:{
            type:DataTypes.STRING,
            allowNyll: false,
          
        },
        phone:{
            type:DataTypes.STRING,
            allowNyll: false,
           
        },
        linkedIn:{
            type:DataTypes.STRING,
            allowNyll: false,
           
        },
        field:{
            type:DataTypes.STRING,
            allowNyll: false,
           
        },
        experience:{
            type:DataTypes.STRING,
            allowNyll: false,
           
        },
        region:{
            type:DataTypes.STRING,
            allowNyll: false,
           
        },
    });


    return Users ;
};