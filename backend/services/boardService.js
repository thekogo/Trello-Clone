module.exports = function (db) {
  return {
    async boardCreate(userId, name) {
      if (!(userId && name)) {
        return false;
      }
      const user = await db.Board.create({
        userId,
        name,
        email,
        password,
        status: "member"
      });
      return user;
    },
    async findUser(email) {
      if (!email) {
        return false;
      }
      const targetUser = await db.Member.findOne({ where: { email } });
      console.log(targetUser);
      return targetUser;
    }, 
  };
};
