module.exports = function (db) {
  return {
    async userCreate(firstName, lastName, email, password, age) {
      if (!(firstName && lastName && email && password)) {
        return false;
      }
      const user = await db.Member.create({
        firstName,
        lastName,
        email,
        password,
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
