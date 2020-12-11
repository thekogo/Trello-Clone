module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
      name: {
          type: DataTypes.STRING(200),
      },
      order: {
          type: DataTypes.INTEGER,
      },
  }, {
    tableName: 'categories',
  });

  Category.associate = models => {
      Category.belongsTo(models.Board, { foreignKey: 'board_id' })
      Category.hasMany(models.Card, { foreignKey: 'category_id' })
  }

  return Category;
}