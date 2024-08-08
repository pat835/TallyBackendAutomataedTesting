import awsReq from '../config/common.js';
import { expect } from 'chai';
import dotenv from 'dotenv';
dotenv.config();
const AWSTOKEN = process.env.AWSTOKEN;

describe('revealPrompt', () => {
    describe('POST', () => {
        it('/revealPrompt success', () => {
            // need to delete "promptId": "1ECA53B2-6606-4B1D-9810-18E2B574DA67" from GameTurn table, 
            // revealedPromptsInOrderByID column to update successfully
            const data = { "gameTurnId": "96CD1D77-FE8E-46EA-A174-32FC3D0EEE7E", "promptId": "1ECA53B2-6606-4B1D-9810-18E2B574DA67" };
            return awsReq
                .post('revealPrompt')
                .set('x-api-key', AWSTOKEN)
                .send(data)
                .then((res) => {
                    expect(res.body.statusCode).to.eq(200);
                    expect(res.body.body).to.eq('Successfully ran the function!');
                });
        });

        it('/revealPrompt required parameters are missing', () => {
            const data = { "abc": "0D453C5E-971C-4E7E-B397-42870FBE76B5" };
            return awsReq
                .post('revealPrompt')
                .set('x-api-key', AWSTOKEN)
                .send(data)
                .then((res) => {
                    // console.log(res.body);
                    // expect(res.body.data).to.deep.include(data);
                    expect(res.body.statusCode).to.eq(400);
                    expect(res.body.body.error).to.eq('Missing or empty gameTurnId');
                });
        });

        it('/revealPrompt missing promptId', () => {
            const data = { "gameTurnId": "96CD1D77-FE8E-46EA-A174-32FC3D0EEE7E" };
            return awsReq
                .post('revealPrompt')
                .set('x-api-key', AWSTOKEN)
                .send(data)
                .then((res) => {
                    // console.log(res.body);
                    // expect(res.body.data).to.deep.include(data);
                    expect(res.body.statusCode).to.eq(400);
                    expect(res.body.body.error).to.eq('Missing or empty promptId');
                });
        });

        it('/revealPrompt nonexist gameTurnId', () => {
            const data = { "gameTurnId": "96CD1D77-FE8E-46EA-A174-32FC3D0EEE8E", "promptId": "1ECA53B2-6606-4B1D-9810-18E2B574DA67" };
            return awsReq
                .post('revealPrompt')
                .set('x-api-key', AWSTOKEN)
                .send(data)
                .then((res) => {
                    expect(res.body.statusCode).to.eq(404);
                    expect(res.body.body.error).to.eq('Game turn data not found');
                });
        });

        it('/revealPrompt revealedPromptId already exists', () => {
            const data = { "gameTurnId": "96CD1D77-FE8E-46EA-A174-32FC3D0EEE7E", "promptId": "1ECA53B2-6606-4B1D-9810-18E2B574DA67" };
            return awsReq
                .post('revealPrompt')
                .set('x-api-key', AWSTOKEN)
                .send(data)
                .then((res) => {
                    expect(res.body.statusCode).to.eq(404);
                    expect(res.body.body.error).to.eq('revealedPromptId already exists');
                });
        });
    });
});