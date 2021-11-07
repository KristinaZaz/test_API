const request = require('supertest')('https://fakerestapi.azurewebsites.net');
const assert = require('chai').assert;

describe('users API', () => {
    var globals = {}
    //creating a GET request to fetch users
    it('GET All Users', async () => {
        const resp = await request
            .get('/api/v1/Users')
            .expect(200);
        globals.lastUserId = resp.body[resp.body.length-1]['id']; // assuming users ids have ascending order; will be reused for 'GET Last User' test
        globals.newUserId = globals.lastUserId + 1  // creating new user id
        assert.isNotEmpty(resp.body); //validating the responce is not empty
    });

    it('GET Last User', async () => {
        const resp = await request //Get existing record
            .get('/api/v1/Users/' + globals.lastUserId)
            .expect(200);
        assert.equal(resp.body.id, globals.lastUserId);
    });

    it('POST New User', async () => {
        //POST request to create new record
        const data = {
            "id": globals.newUserId,
            "userName": "MyTestUser",
            "password": "testingapi"
        };
        const putResp = await request
            .post('/api/v1/Users')
            .send(data);
        const getResp = await request
            .get('/api/v1/Users/' + globals.newUserId)
            .expect(200);
        //validating payload data
        assert.hasAnyKeys(putResp.body, 'id');
        assert.equal(putResp.body.userName, data.userName);
        assert.equal(putResp.body.password, data.password);
        assert.isNotEmpty(getResp.body);
        assert.equal(getResp.body.id, globals.newUserId);
    });

    it('PUT Existing User', async () => {
        //modifing existing resource
        const data = {
            "id": globals.lastUserId,
            "userName": "change Name",
            "password": "Abcd123!"
        };
        const putResp = await request
            .put('/api/v1/Users/' + data.id)
            .send(data);
        const getResp = await request
            .get('/api/v1/Users/' + data.id)
            .expect(200);
        assert.equal(putResp.body.id, data.id);
        assert.equal(putResp.body.userName, data.userName);
        assert.equal(putResp.body.password, data.password);
        assert.equal(getResp.body.id, data.id);
        assert.equal(getResp.body.userName, data.userName);
        assert.equal(getResp.body.password, data.password);
    });

    it('DELETE Last User', async () => {
        //deleting last user
        const delResp = await request
            .delete('/api/v1/Users/' + globals.lastUserId)
            .expect(200)
        assert.isEmpty(delResp.body);
        const getResp = await request
            .get('/api/v1/Users/' + globals.lastUserId)
            .expect(404);
        assert.isNotEmpty(getResp.body);
    });
});
