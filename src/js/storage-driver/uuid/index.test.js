import uuid from './index';
test('get some uuid', () => {
  expect(uuid()).toMatch(/[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-4[a-zA-Z0-9]{3}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}/);
});
