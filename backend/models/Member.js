module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
      email: {
          type: DataTypes.STRING(200),
          unique: true
      },
      password: {
          type: DataTypes.STRING(255)
      },
      firstname: {
          type: DataTypes.STRING(100)
      },
      lastname: {
          type: DataTypes.STRING(100)
      },
  }, {
    tableName: 'members',
  });

  Member.associate = models => {
      Member.hasMany(models.Board, { foreignKey: 'member_id' })
  }

  return Member;
}