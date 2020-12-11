const db = {
  Member: {
    create: () => ({
      id: 2,
    }),
    findOne: ({where:{email}}) => {
      const data = {
        'thekogo@gmail.com': {
          id: 1,
          fistName: 'Ponlawat',
        },
      };
      return data[email];
    },
  },
};

const userService = require('../services/userService')(db);

test('input doesn\'t exist', async () => {
  expect(await await userService.userCreate('', '', '', '', '')).toBeFalsy();
});

test('email is does\'t exist', async () => {
  expect(await userService.findUser('')).toBeFalsy();
});

test('email is exist', async () => {
  expect(await userService.findUser('thekogo@gmail.com')).toBeTruthy();
})

test('email is new member', async () => {
  expect(await userService.findUser('thekogo555@gmail.com')).toBeFalsy();
})