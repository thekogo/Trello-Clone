module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('Board', {
      name: {
          type: DataTypes.STRING(200),
      },
  }, {
    tableName: 'boards',
  });

  Board.associate = models => {
      Board.belongsTo(models.Member, { foreignKey: 'member_id' });
      Board.hasMany(models.Category, { foreignKey: 'board_id' });
  }

  return Board;
}