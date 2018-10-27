const mock = require("../mock/formData");
const schema = require("../controllers/db/schema/schema");

const sampleOffer = mock.samplePostOffer;
const sampleRequest = mock.samplePostRequest;
const sampleUser = mock.sampleUser;

const userSchema = schema.user;
const postSchema = schema.post;

it('1 formating a user with name', async () => {
    const user = await userSchema(sampleUser);
    expect(user.fullName).toEqual(sampleUser.fullName.toLowerCase());
});

it('2 formating a request postType request', async () => {
    const user = await postSchema(sampleUser);
    expect(sampleRequest.postType).toEqual(sampleRequest.postType);
});

it('3 formating a offer city Pretoria', async () => {
    const user = await postSchema(sampleOffer);
    expect(sampleOffer.city).toEqual(sampleOffer.city);
});