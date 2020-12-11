module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
      name: {
          type: DataTypes.STRING(200),
      },
      description: {
          type: DataTypes.STRING(200),
      },
      order: {
          type: DataTypes.INTEGER,
      },
  }, {
    tableName: 'cards',
  });

  Card.associate = models => {
      Card.belongsTo(models.Category, { foreignKey: 'category_id' })
  }

  return Card;
}