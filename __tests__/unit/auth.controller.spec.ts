import 'dotenv/config'
import authControllerFunctions from '../../src/controllers/auth.controller';
import {Response} from "express";


describe('Auth controller', () => {
    describe('Check session', () => {
        let mockNext;
        let responseObject: Response;

        beforeEach(() => {
            mockNext = jest.fn();
            responseObject = <Response>{};
            responseObject.redirect = jest.fn();
        });

        it(`should call 'next()' if authorization API URL`, async () => {
            const authApiURL = '/auth';

            await authControllerFunctions.checkSession({originalUrl: authApiURL}, responseObject, mockNext);

            expect(mockNext).toHaveBeenCalled();
        });

        it(`should call 'next()' if registration API URL`, async () => {
            const registrationApiURL = '/reg';
            await authControllerFunctions.checkSession({originalUrl: registrationApiURL}, responseObject, mockNext);

            expect(mockNext).toHaveBeenCalled();
        });

        it(`should redirect to /auth if no username in session`, async () => {
            const requestObject = {
                session: {
                    useName: null
                }
            };
            await authControllerFunctions.checkSession(requestObject, responseObject, mockNext);

            expect(responseObject.redirect).toHaveBeenCalledWith(307, '/auth');
        });
    });
});
