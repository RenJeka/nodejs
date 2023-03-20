const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');
const port = process.env.PORT || 5000;

const admin_login = 'admin';
const admin_password = '123456';


const indexPath = './index.html';

http.createServer((req, res) => {

    switch (req.method) {
        case 'GET': {
            sendPageByRoute(req, res);
            break;
        }

        case 'POST': {
            modifyData(req, res);
            break;
        }

        default: {

        }
    }
}).listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

/**
 *
 * @param request httpRequest
 * @param response httpResponse
 */
function sendPageByRoute(request, response) {
    const route = url.parse(request.url, true).path;
    console.log(route);

    switch (route) {
        case '/':
        case '/home':
        case '/index':
        case '/index.html': {
            fs.readFile(indexPath, (error, data) => {
                if (error) throw error;
                response.setHeader('Content-Type', 'text/html');
                response.end(data.toString());
            });
            return;
        }
        case '/data': {
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify(data));
            return ;
        }
        default: {
            console.log('normal; ', path.join('.', route));
            console.log('exist; ', fs.existsSync(path.join('.', route)));

            if (fs.existsSync(path.join('.', route))) {
                fs.readFile(path.join('.', route), (error, data) => {
                    if (error) throw error;
                    response.setHeader('Content-Type', getMimeType(route));
                    response.end(data.toString());
                });
            }

            // return '<h2 style="color: darkred">Oops! Page not found!</h2>';
            return;
        }
    }
}

function modifyData(request, response) {
    let body = [];
    request.on('data', (chunk) => {
        console.log('chunk: ');
        console.log(JSON.parse(chunk));
        body.push(JSON.parse(chunk));

    }).on('end', () => {
        // data.push(bodyParser(body));
        data.push(...body);
        // console.log('end: ', bodyParser(body));
        console.log('end: ', body);

        sendPageByRoute(request, response);
    });

}

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 * @param route
 * @returns {string} MIME type
 */
function getMimeType(route) {
    switch (path.parse(route).ext) {
        case '.ico': {
            return 'image/x-icon';
        }

        case '.png': {
            return 'image/png';
        }

        case '.css': {
            return 'text/css';
        }

        case '.html': {
            return 'text/html';
        }

        default: {
            return 'text/plain'
        }
    }
}

function bodyParser(body) {
    const entries = [];
    const splicedBodyArr = body.split('&');

    splicedBodyArr.forEach((property) => {
        const entry = property.split('=');
        entries.push(entry)
    });
    return  Object.fromEntries(entries)
}
