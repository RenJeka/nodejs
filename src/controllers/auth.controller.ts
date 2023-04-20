import bcrypt from 'bcryptjs';
import colors from 'colors';
import usersQueries from '../database/usersQueries';

async function checkSession(req, res, next) {

    if (
        req.originalUrl === '/auth'
        || req.originalUrl === '/reg'
    ) {
        next();
    } else if (!req.session.userName) {
        res.redirect(307, '/auth');
    } else if (await isUserPresent(req.session.userName)){
        next();
    } else {
        res.status(401).end(`Can't find such user '${req.session.userName}'.`);
    }
}

function showAuthPage(req, res, next) {
    res.render('auth');
}

function showRegistrationPage(req, res, next) {
    res.render('registration');
}

async function authorizeUser(req, res, next) {

    if (await handleSession(req)) {
        res.status(200).end('logged');
    } else {
        res.status(401).end(`Can\'t find user \'${req.body.login}\' with such password. Please try other!`);
    }
}

async function registerUser(req, res, next) {

    try {
        if (await isUserPresent(req.body?.login)) {
            res.status(400).end(`User already exist!`);
            return;
        }
        const usersId = await usersQueries.addUser(req.body);
        if (usersId && usersId >= 0) {
            res.status(200).end('registered');
        } else {
            res.status(500).end(`Something wrong while registration user!`);
        }
    } catch(error) {
        console.error(`Error while registration user (${JSON.stringify(req.body)}) : ${error}`)
    }
}

function logout(req, res) {
    delete req.session.userName;
    res.redirect(307,'/');
}

async function handleSession(req) {
    const userData = await getUserData(req.body)
    if (userData) {
        req.session.userName = userData.login;
        return true;
    } else {
        return false;
    }
}


async function getUserData(authData) {

    const userData = await findCurrentUserByAuth(authData)

    if (userData) {
        return userData;
    } else {
        return false;
    }
}

async function isUserPresent(userLogin) {
    const allUsers = await usersQueries.getAllUsers();
    return !!allUsers.find((userData) => {
        return userData.login === userLogin
    });
}

async function findCurrentUserByAuth(currentUserData) {
    const allUsers = await usersQueries.getAllUsers();

    for (const userData of allUsers) {
        const isPasswordsEquals = await bcrypt.compare(currentUserData.pass, userData.password);
        if (userData.login === currentUserData.login && isPasswordsEquals) {
            return userData;
        }
    }

    return null;
}

export default {
    checkSession,
    showAuthPage,
    showRegistrationPage,
    authorizeUser,
    registerUser,
    logout
};
