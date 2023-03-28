const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const router = express.Router();

const port = process.env.PORT || 5000;

const adminCredentials = {
    login: 'admin',
    password: '123456'
};

const userCredentials = [];

const folderPaths = {
    pages: '/pages',
    image: '/images',
    styles: '/styles',
    js: '/js',
};

const pagesPaths = {
    index: path.join(__dirname, '/pages/index.html'),
    notFound: path.join(__dirname, '/pages/404.html'),
    adminPage: path.join(__dirname, '/cabinetPages/adminPage.html'),
    userPage: path.join(__dirname, '/cabinetPages/userPage.html')
};

const loggerPath = `logs/logs_${getCurrentDateString()}.txt`;

router.route(['/', '/home', '/index.html'])
    .get((req, res) => {
        res.sendFile(pagesPaths.index);
    })

router.route(/\/\w*/)
    .get((req, res) => {
        res.sendFile(pagesPaths.notFound);
    });

router.route('/login')
    .post((req, res) => {
        res.append('Content-Type', 'text/html');
        if (checkAdminAuthorization(req.body)) {
            res.status(200).sendFile(pagesPaths.adminPage);
        } else if (checkUserAuthorization(req.body)) {
            res.status(200).sendFile(pagesPaths.userPage);
        } else {
            res.status(401).send('Bad credentials!')
        }
    });

router.route('/registration')
    .post((req, res) => {
        res.append('Content-Type', 'text/plain');
        if (req.body && validateCredentials(req.body)) {
            addUserCredentials(req.body);
            res.status(200).send('Registered!');
        } else {
            res.status(400).send('Unregistered!');
        }

    });

app.use('/', express.static(path.join(__dirname, folderPaths.pages)));
app.use('/', express.static(path.join(__dirname, folderPaths.image)));
app.use('/', express.static(path.join(__dirname, folderPaths.styles)));
app.use('/', express.static(path.join(__dirname, folderPaths.js)));
app.use(express.json());
app.use('/login', (request, response, next) => {
    logToFile(request, 'Login attempt');
    next();
});
app.use('/registration', (request, response, next) => {
    logToFile(request, 'Registration',  true)
    next();
});
app.use('/', router);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

function checkAdminAuthorization(authData) {
    return (authData.login === adminCredentials.login) && (authData.pass === adminCredentials.password);
}

function checkUserAuthorization(authData) {
    const searchedUser = userCredentials.find(userCredential => {
        return userCredential.login === authData.login;
    });
    return searchedUser && searchedUser.pass === authData.pass;
}

function validateCredentials(body) {
    return !!body;
}

function addUserCredentials(body) {
    console.log('userCred: ', body);
    
    userCredentials.push(body);
}

function getCurrentDateString() {
    const today = new Date();
    const day = today.getUTCDate();
    const month = today.getUTCMonth() + 1;
    const year = today.getUTCFullYear();
    return `${day}_${month}_${year}`;
}

function logToFile(request, logHeader = 'Log', needBody = false) {
    let data = `${logHeader} : ${request.ip}; Time: ${new Date().toLocaleString()}; URL : ${request.url}\n`;
    if (needBody) {
        data += `Data: ${ JSON.stringify(request.body)}\n`;
    }
    data += '---------------------------\n';

    fs.appendFile(loggerPath, data, function(err){
        console.log('registration data wrote');
    });
}
