import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class post extends Model {
    static associate(models) {
      post.belongsTo(models.User, { foreignKey: 'sender' });
      post.belongsTo(models.User, { foreignKey: 'receiver' });
      // Define other associations here
    }
  }

  post.init({
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    receiver: DataTypes.INTEGER,
    sender: DataTypes.INTEGER,
    date: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'post', // Make sure this matches your model name
    tableName: 'posts', // Ensure the table name matches your database schema
  });

  return post;
};
