import { build } from 'vite';

async function runBuild() {
    try {
        await build({
            configFile: './vite.config.js',
        });
        console.log('Build completed successfully');
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

runBuild();
