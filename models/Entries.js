
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
        name:{
            type:DataTypes.STRING,
            allowNull: false,
           
        },
        email:{
            type:DataTypes.STRING,
            allowNull: false,
          
        },
        phone:{
            type:DataTypes.STRING,
            allowNull: false,
           
        },
        comments:{
            type:DataTypes.STRING,
            allowNyll: false,
           
        },
        source:{
            type:DataTypes.STRING,
            allowNull: false,
           
        },
        source_link:{
            type:DataTypes.STRING,
            allowNull: false,
           
        },
        category:{
            type:DataTypes.STRING,
            allowNull: false,
           
        },
        security_clearence:{
            type:DataTypes.STRING,
            allowNull: false,
           
        },
        region:{
            type:DataTypes.STRING,
            allowNyll: false,
           
        },
        city:{
            type:DataTypes.STRING,
            allowNull: false,
           
        },
        experience:{
            type:DataTypes.STRING,
            allowNyll: false,
           
        },
        status:{
            type:DataTypes.STRING,
            allowNull: true,
           
        },
        resource:{
            type:DataTypes.STRING,
            allowNull: false,
           
        },
        show_notification:{
            type:DataTypes.STRING,
            allowNyll: false,
           
        },
        sent_day:{
            type:DataTypes.STRING,
            allowNyll: false,
           
        },
        sent_date:{
            type:DataTypes.STRING,
            allowNyll: false,
           
        },
    });


    return Users ;
};