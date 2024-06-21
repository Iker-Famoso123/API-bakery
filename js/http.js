const http = require('node:http');

const fs = require('node:fs');

const desiredPort = process.env.PORT ?? 1234;

const processRequest = (req, res) =>{
    if(req.url === '/') {
        res.statusCode = 200; // OK
        res.setHeader('Content-Type', 'text/html; charset=utf-8' );
        res.end('<h1>Bienvenido a la página de inicio</h1>');
    }
    else if (req.url === '/imagen') {
        fs.readFile('./assets/nidos.jpg', (err, data) => {
            if (err) {
                req.statusCode = 500; // Internal server error
                req.setHeader('content-Type', 'text/html; charset=utf-8');
                res.end('<h1>Internal server error</h1>');
            } else {
                req.statuscode = 200; // OK
                res.setHeader('Content-Type', 'image/jpg');   
                res.end(data);
            }
        })

    }
    else if (req.url === '/contacto') {
        res.statusCode = 200; // OK
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end('<h1>Contacto</h1>');
    } else {
        res.statuscode = 404; // Not found
        res.setHeader('Conntent-Type', 'text/html; charset=utf-8');
        res.end('<h1>404 Not Found</h1>');
    }
}
const server = http.createServer(processRequest);



server.listen(desiredPort, () => {
    console.log(`Server listening on port http://localhost:${desiredPort}`);
})

