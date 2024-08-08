import awsReq from '../config/common.js';
import { expect } from 'chai';
import dotenv from 'dotenv';
dotenv.config();
const AWSTOKEN = process.env.AWSTOKEN;

describe('endGame', () => {
    describe('POST', () => {
        it('/endGame success', () => {
            const data = { "gameSessionId": "0D453C5E-971C-4E7E-B397-42870FBE76B5" };
            return awsReq
                .post('endGame')
                .set('x-api-key', AWSTOKEN)
                .send(data)
                .then((res) => {
                    // console.log(res.body);
                    // expect(res.body.data).to.deep.include(data);
                    expect(res.body.statusCode).to.eq(200);
                    expect(res.body.body).to.eq('Success!');
                });
        });

        it('/endGame missing gameSessionId', () => {
            const data = { "game": "0D453C5E-971C-4E7E-B397-42870FBE76B5" };
            return awsReq
                .post('endGame')
                .set('x-api-key', AWSTOKEN)
                .send(data)
                .then((res) => {
                    // console.log(res.body);
                    // expect(res.body.data).to.deep.include(data);
                    expect(res.body.statusCode).to.eq(400);
                    expect(res.body.body.error).to.eq('Missing or empty gameSessionId');
                });
        });

        it('/endGame nonexist gameSessionId', () => {
            const data = { "gameSessionId": "0D453C5E-971C-4E7E-B397-42870FBE7699" };
            return awsReq
                .post('endGame')
                .set('x-api-key', AWSTOKEN)
                .send(data)
                .then((res) => {
                    expect(res.body.statusCode).to.eq(500);
                    expect(res.body.body).to.eq('Failed to process the request.');
                });
        });
    });
});