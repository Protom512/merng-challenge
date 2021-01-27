const { AuthenticationError } = require('apollo-server');
const checkAuth = require('../utils/check-auth');

test('empty header case', () => {
  function checkEmptyHeader() {
    //   const header = { req: { headers: { authorization: 'hogea' } } };
    const header = { req: { headers: {} } };
    checkAuth(header);
  }
  expect(checkEmptyHeader).toThrowError(
    new Error('Authentication header must be provided'),
  );
});

test('empty tokencase', () => {
  function checkEmptyHeader() {
    const header = { req: { headers: { authorization: 'hogea' } } };
    checkAuth(header);
  }
  expect(checkEmptyHeader).toThrowError(
    new Error("Authentication token must be 'Bearer [token]"),
  );
});

test('invalid token case', () => {
  function checkEmptyHeader() {
    const header = { req: { headers: { authorization: 'Bearer hoge' } } };
    checkAuth(header);
  }
  expect(checkEmptyHeader).toThrowError(
    new AuthenticationError('Invalid/Expired token'),
  );
});
