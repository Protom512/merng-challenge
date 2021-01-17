const {
  validateLoginInput,
  validateRegisterInput,
} = require('../utils/validators');

//  username,
// email,
// password,
// confirmPassword,
test('validation on valid user', () => {
  user = {
    username: 'hoge',
    email: 'user@email.jp',
    password: 'hoge1234',
    confirmpassword: 'hoge1234',
  };
  expect(
    validateRegisterInput(
      user.username,
      user.email,
      user.password,
      user.confirmpassword,
    ),
  ).toStrictEqual({
    errors: {},
    valid: true,
  });
});

test('validation on empty username/pasword', () => {
  user = {
    username: '',
    email: '',
    password: '',
    confirmpassword: 'hoge1234',
  };
  expect(
    validateRegisterInput(
      user.username,
      user.email,
      user.password,
      user.confirmpassword,
    ),
  ).toStrictEqual({
    errors: {
      username: 'Username must not be empty',
      password: 'Password must not be empty',
      email: 'Email must not be empty',
    },
    valid: false,
  });
});
test('validation on unmatch pasword', () => {
  user = {
    username: 'user1',
    email: 'user@email.jp',
    password: 'hogehoge',
    confirmpassword: 'hoge1234',
  };
  expect(
    validateRegisterInput(
      user.username,
      user.email,
      user.password,
      user.confirmpassword,
    ),
  ).toStrictEqual({
    errors: {
      confirmPassword: 'Passwords must match',
    },
    valid: false,
  });
});

test('validation on corrupt email', () => {
  user = {
    username: 'user1',
    email: 'useremail.jp',
    password: 'hoge1234',
    confirmpassword: 'hoge1234',
  };
  expect(
    validateRegisterInput(
      user.username,
      user.email,
      user.password,
      user.confirmpassword,
    ),
  ).toStrictEqual({
    errors: {
      email: 'Email must be valid',
    },
    valid: false,
  });
});
test('validation on valid username/password', () => {
  expect(validateLoginInput('hoge', 'hoge12')).toStrictEqual({
    errors: {},
    valid: true,
  });
});

test('validation on empty username/pasword', () => {
  expect(validateLoginInput('', '')).toStrictEqual({
    errors: {
      username: 'Username must not be empty',
      password: 'Password must not be empty',
    },
    valid: false,
  });
});
