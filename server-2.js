const http = require('http');
const url = require('url');
const fs = require('fs');
const port = process.env.PORT || 5000;

const data = [
    {name: 'dog', age: 3},
    {name: 'cat', age: 2},
    {name: 'human', age: 23},
]

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
            return '<h2 style="color: darkred">Oops! Page not found!</h2>';
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
        
        sendPageByRoute(request, response);
    });

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
