const validateSchema = require("../controllers/db/schema/validateSchema");
const mockForm = require("../mock/formData");
const validateUserData = validateSchema.validateUserData;
const validatePostData = validateSchema.validatePostData;

const cleanUserData = mockForm.cleanUserData;
const missingParameterUserData = mockForm.missingParameterUserData;

const cleanPostData = mockForm.cleanPostData;
const missingParameterPostData = mockForm.missingParameterPostData;

it('1 checks user data formated correctly - response 200 success ', () => {
    expect(validateUserData(cleanUserData).response).toBe(200);
});

it('2 checks user data formated correctly - response 422 missing parameter (Unprocessable Entity) ', () => {
    expect(validateUserData(missingParameterUserData).response).toBe(422);
});

it('3 checks post data formated correctly - response 200 success ', () => {
    expect(validatePostData(cleanPostData).response).toBe(200);
});

it('4 checks post data formated correctly - response 422 missing parameter (Unprocessable Entity) ', () => {
    expect(validatePostData(missingParameterPostData).response).toBe(422);
});
