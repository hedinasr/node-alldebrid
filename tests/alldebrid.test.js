const Alldebrid = require('../lib/alldebrid.js');

test('Log in with dummy credentials', () => {
    expect.assertions(1);

    let alldebrid = new Alldebrid();

    return alldebrid.connect('foo', 'bar').catch(e => expect(e).toMatch('Login failed'));
});
