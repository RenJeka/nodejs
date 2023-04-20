import app from '../../src/app';
import request, {Response} from 'supertest';

describe('/home', () => {
    it('should return status code 200', async () => {
        await request(app)
            .get('/auth')
            .expect(200);
    });

    it('should return status code 200', async () => {
        const response:Response = await request(app).get('/reg')
        expect(response.statusCode).toEqual(200);
    });

    it('should redirect to /auth', async () => {
        await request(app)
            .get('/add')
            .expect(307, 'Temporary Redirect. Redirecting to /auth');
    });

    it('should return 401 while send unauthorized user to /auth', async () => {
        await request(app)
            .post('/auth')
            .send({login: 'aaa', pass: 'bbb'})
            .expect(401);
    });

    it('should return 500 if auth form has empty fields', async () => {
        await request(app)
            .post('/reg')
            .send({login: '', pass: '', email: ''})
            .expect(500, 'Something wrong while registration user!');
    });
});
