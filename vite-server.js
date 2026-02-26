import { createServer } from 'vite';

async function start() {
    try {
        const server = await createServer({
            configFile: './vite.config.js',
            server: {
                port: 5173,
                host: true
            },
        });
        await server.listen();
        console.log('Vite server started at http://localhost:5173');
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

start();
