
const colors = require('colors');

const userAuthData = [
    {login: 'user-1', pass: '1111'},
    {login: 'user-2', pass: '2222'},
    {login: 'user-3', pass: '3333'}

];

function checkSession(req, res, next) {

    if (
        req.originalUrl === '/auth'
    ) {
        next();
    } else if (!req.session.userName) {
        res.redirect(307, '/auth');
        // showAuthPage(req, res);
    } else if (isUserPresent(req.session.userName)){
        next();
    } else {
        res.status(401).end(`Can't find such user '${req.session.userName}'.`);
    }
}

function showAuthPage(req, res, next) {
    res.render('auth');
}

function authorizeUser(req, res, next) {

    if (handleSession(req)) {
        res.status(200).end('logged');
    } else {
        res.status(401).end(`Can\'t find user \'${req.body.login}\' with such password. Please try other!`);
    }
}

function logout(req, res) {
    delete req.session.userName;
    res.redirect(307,'/');
}

function handleSession(req) {
    const userData = getUserData(req.body)
    if (userData) {
        req.session.userName = userData.login;
        return true;
    } else {
        return false;
    }
}


function getUserData(authData) {

    const userData = findCurrentUserByAuth(authData)

    if (userData) {
        return userData;
    } else {
        return false;
    }
}

function isUserPresent(userLogin) {
    return !!userAuthData.find((userData) => {
        return userData.login === userLogin
    });
}

function findCurrentUserByAuth(currentUserData) {
    return userAuthData.find((userData) => {
        return userData.login === currentUserData.login && userData.pass === currentUserData.pass
    });
}

module.exports = {
    checkSession,
    showAuthPage,
    authorizeUser,
    logout
};
