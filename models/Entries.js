
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
        source:{
            type:DataTypes.STRING,
            allowNyll: false,
           
        },
        source_link:{
            type:DataTypes.STRING,
            allowNyll: false,
           
        },
        resources:{
            type:DataTypes.STRING,
            allowNyll: false,
           
        },
        comments:{
            type:DataTypes.STRING,
            allowNyll: false,
           
        },
        field:{
            type:DataTypes.STRING,
            allowNyll: false,
           
        },
        security_clearence:{
            type:DataTypes.STRING,
            allowNyll: false,
           
        },
        experience:{
            type:DataTypes.STRING,
            allowNyll: false,
           
        },
        city:{
            type:DataTypes.STRING,
            allowNyll: false,
           
        },
        region:{
            type:DataTypes.STRING,
            allowNyll: false,
           
        },
        status:{
            type:DataTypes.STRING,
            allowNyll: false,
           
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