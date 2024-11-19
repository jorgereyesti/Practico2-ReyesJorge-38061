const { Model, DataTypes } = require('sequelize');

class Users extends Model {  
    static init = (sequelize) => {
        super.init(
            {
                uid: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                    primaryKey: true,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                createdAt: {
                type: DataTypes.DATE,
                    allowNull: true,
                    defaultValue: null,
                },
            },
            {
                sequelize,
                modelName: "users",
                timestamps: false,
            });
        return this;
    };
    }
    
    module.exports = Users;
