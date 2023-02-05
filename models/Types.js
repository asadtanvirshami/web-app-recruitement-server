module.exports = (sequelize, DataTypes) => {
    const Types = sequelize.define("Types", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        categories:{
            type:DataTypes.STRING,
            allowNull: true,
           
        },
        experiences:{
            type:DataTypes.STRING,
            allowNull: true,
           
        },
        security_clearences:{
            type:DataTypes.STRING,
            allowNull: true,
           
        },
        regions:{
            type:DataTypes.STRING,
            allowNull: true,
           
        },
        cities:{
            type:DataTypes.STRING,
            allowNull: true,
           
        },
        sources:{
            type:DataTypes.STRING,
            allowNull: true,
           
        },
        resources:{
            type:DataTypes.STRING,
            allowNull: true,
           
        },
    });


    return Types ;
};