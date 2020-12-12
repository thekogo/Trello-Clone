module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
      email: {
          type: DataTypes.STRING(200),
          unique: true
      },
      password: {
          type: DataTypes.STRING(255)
      },
      firstName: {
          type: DataTypes.STRING(100)
      },
      lastName: {
          type: DataTypes.STRING(100)
      },
      status: {
          type: DataTypes.STRING(100)
      }
  }, {
    tableName: 'members',
  });

  Member.associate = models => {
      Member.hasMany(models.Board, { foreignKey: 'member_id' })
  }

  return Member;
}