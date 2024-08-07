import supertest from 'supertest';
import { expect } from 'chai';
import dotenv from 'dotenv';
dotenv.config();

const awsReq = supertest('https://07ykrk0x35.execute-api.us-east-1.amazonaws.com/dev/');
const AWSTOKEN = process.env.AWSTOKEN;

describe('endGame', () => {
    it('POST /endGame success', () => {
        const data = { "gameSessionId": "0D453C5E-971C-4E7E-B397-42870FBE76B5" };
        return awsReq
            .post('endGame')
            .set('x-api-key', AWSTOKEN)
            .send(data)
            .then((res) => {
                console.log(res.body);
               // expect(res.body.data).to.deep.include(data);
               expect(res.body.statusCode).to.eq(200);
               expect(res.body.body).to.eq('Success!');
            });
    });

    
    it('POST /endGame missing gameSessionId', () => {
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

});