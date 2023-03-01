
module.exports = (sequelize, DataTypes) => {
    const History = sequelize.define("History", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        sent_date:{
            type:DataTypes.STRING,
            allowNull: false,
           
        },
        sent_day:{
            type:DataTypes.STRING,
            allowNull: false,
           
        },
    });


    return History ;
};