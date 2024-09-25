'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     Review.belongsTo(models.Spot,{
      foreignKey:'spotId',
      as: 'spot'
     });
     Review.belongsTo(models.User,{
      foreignKey:'userId',
      as: 'user'
     });
     Review.hasMany(models.ReviewImage,{
      foreignKey:'reviewId',
      as: 'reviewImages'
     });
    }
  }
  Review.init({
    spotId: {
      type: DataTypes.INTEGER,
    allowNull: false,
  },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    stars: {
      type:DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};