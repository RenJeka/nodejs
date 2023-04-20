import app from '../../src/app';
import request from 'supertest';
describe('/home', () => {
    it('should return 200', async () => {
        // expect(1).toBe(1);
        await request(app)
            .get('/auth')
            .expect(200);
    });

    it('should redirect to /auth', async () => {
        // expect(1).toBe(1);
        await request(app)
            .get('/add')
            .expect(307, 'Temporary Redirect. Redirecting to /auth');
    });
});
