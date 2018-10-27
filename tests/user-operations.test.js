const mock = require("../mock/formData");
const userOperations = require("../controllers/db/user-operations");



it('1 create user response - 200 success ', async () => {
    const user = await userOperations.createUser(mock.sampleQueryString);
    console.log(user);
    expect(user.response).toEqual(200);
});



it('1 create user response - 409 conflict ', async () => {
    const user = await userOperations.createUser(mock.sampleQueryStringDublicateParam);
    console.log(user);
    expect(user.response).toEqual(409);
});



it('1 create user response - 422 Unprocessable Entity ', async () => {
    const user = await userOperations.createUser(mock.sampleQueryStringMissingParam);
    console.log(user);
    expect(user.response).toEqual(422);
});

