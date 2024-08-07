import qa from './qa.js';
import supertest from 'supertest';
const awsReq = supertest(qa.baseUrl);

export default awsReq;