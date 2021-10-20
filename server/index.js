'use strict';

const Hapi = require('@hapi/hapi');
const CryptoJS = require("crypto-js");
const key = "82f2ceed4c503896c8a291e560bd4325"; // change to your key

const pre3 = function(request, reply) {
    const payload = request.payload;

    // Decrypt
    var bytes = CryptoJS.AES.decrypt(payload.pa, key);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    request.payload = JSON.parse(originalText);

    return request;
};

const init = async() => {
    const server = Hapi.server({
        port: 3456,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            }
        }
    });

    server.route([{
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello World!';
        }
    }, {
        method: 'POST',
        path: '/v1/user/login',
        options: {
            cors: {
                credentials: true
            },
            pre: [{ method: pre3 }],
            handler: (request, h) => {
                const payload = request.payload;
                // Encrypt
                const ciphertext = CryptoJS.AES.encrypt(
                    JSON.stringify(payload),
                    key
                ).toString();

                return {
                    re: ciphertext
                };
            }
        }
    }]);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();