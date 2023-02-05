
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
            allowNull: false,
           
        },
        lastname:{
            type:DataTypes.STRING,
            allowNull: false,
           
        },
        email:{
            type:DataTypes.STRING,
            allowNull: false,
          
        },
        password:{
            type:DataTypes.STRING,
            allowNull: false,
           
        },
    });


    return Users ;
};