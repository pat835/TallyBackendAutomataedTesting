import awsReq from '../config/common.js';
import { expect } from 'chai';
import dotenv from 'dotenv';
dotenv.config();
const AWSTOKEN = process.env.AWSTOKEN;

describe('fetchPrompt', () => {
    describe('GET', () => {
        it('/fetchPrompt success', () => {
            const data = { "gameTurnId": "37E0143A-072F-41D6-82BA-F887DE64C5A5" };
            return awsReq
                .get('fetchPrompt')
                .set('x-api-key', AWSTOKEN)
                .send(data)
                .then((res) => {
                    // console.log(JSON.parse(res.body.body));
                    // expect(res.body.data).to.deep.include(data);

                    const expectedBody = {
                        prompts: [
                            { id: 'CF5152D0-75A9-4DC9-955D-EE68006FD6F6', text: '7812' },
                            { id: 'B4F1CD0F-6A2D-41B8-8DBF-A09AFDD5BB68', text: '7811' },
                            { id: '68058259-1AB7-47E5-BB98-68538CED1053', text: '7813' },
                            { id: 'B28D5BEA-6FC3-4A62-8EEC-5994688A8701', text: '7810' }
                        ]
                    };

                    // Parse and sort the prompts in the actual response
                    const actualBody = JSON.parse(res.body.body);
                    actualBody.prompts.sort((a, b) => a.id.localeCompare(b.id));

                    // Sort the prompts in the expected body
                    expectedBody.prompts.sort((a, b) => a.id.localeCompare(b.id));

                    // Compare the status code
                    expect(res.body.statusCode).to.eq(200);

                    // Compare the sorted prompts
                    expect(actualBody).to.deep.eq(expectedBody);
                });
        });

        it('/fetchPrompt exist gameTurnId with promptIds is null', () => {
            const data = { "gameTurnId": "316785D5-2C5E-416F-8B5E-3C61FDE07A76" };
            return awsReq
                .get('fetchPrompt')
                .set('x-api-key', AWSTOKEN)
                .send(data)
                .then((res) => {
                    // console.log(res.body);
                    // expect(res.body.data).to.deep.include(data);
                    expect(res.body.statusCode).to.eq(500);
                    expect(res.body.body).to.eq('Failed to process the request.');
                });
        });

        it('/fetchPrompt promptIds not exists', () => {
            const data = { "gameTurnId": "3f64101f-3913-40f5-b7e9-354ec72a9420" };
            return awsReq
                .get('fetchPrompt')
                .set('x-api-key', AWSTOKEN)
                .send(data)
                .then((res) => {
                    // console.log(res.body);
                    expect(res.body.statusCode).to.eq(404);
                    expect(res.body.body.error).to.eq('No prompt questions found based on the provided IDs');
                });
        });

        it('/fetchPrompt gameTurnId not exists', () => {
            const data = { "gameTurnId": "3f64101f-3913-40f5-b7e9-354ec72a9421" };
            return awsReq
                .get('fetchPrompt')
                .set('x-api-key', AWSTOKEN)
                .send(data)
                .then((res) => {
                    // console.log(res.body);
                    expect(res.body.statusCode).to.eq(404);
                    expect(res.body.body.error).to.eq('No prompt submissions found');
                });
        });

        it('/fetchPrompt missing gameTurnId', () => {
            const data = { "abc" : "3f64101f-3913-40f5-b7e9-354ec72a9421" };
            return awsReq
                .get('fetchPrompt')
                .set('x-api-key', AWSTOKEN)
                .send(data)
                .then((res) => {
                    // console.log(res.body);
                    expect(res.body.statusCode).to.eq(400);
                    expect(res.body.body.error).to.eq('Missing or empty gameTurnId');
                });
        });
    });
});