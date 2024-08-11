import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, { foreignKey: 'sender' });
      User.hasMany(models.Post, { foreignKey: 'receiver' });
      // Define other associations here
    }
  }
   
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    position: DataTypes.STRING,
    number: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'user', // Make sure this matches your model name
    tableName: 'users', // Ensure the table name matches your database schema
  });

  return User;
};
