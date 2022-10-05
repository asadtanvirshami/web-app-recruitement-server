
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
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
        password:{
            type:DataTypes.STRING,
            allowNyll: false,
           
        },
    });


    return Users ;
};