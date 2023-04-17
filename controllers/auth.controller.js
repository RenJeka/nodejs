const usersQueries = require('../database/usersQueries');
const colors = require('colors');

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
            res.status(500).end(`Something wrong with while registration user!`);
        }
    } catch(error) {
        console.error(`Error while registration user (${JSON.stringify(body)}) : ${error}`)
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
    return allUsers.find((userData) => {
        return userData.login === currentUserData.login && userData.password === currentUserData.pass
    });
}

module.exports = {
    checkSession,
    showAuthPage,
    showRegistrationPage,
    authorizeUser,
    registerUser,
    logout
};
