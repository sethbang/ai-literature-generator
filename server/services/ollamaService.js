const { spawn } = require('child_process');

function generateText(prompt) {
    return new Promise((resolve, reject) => {
        const ollama = spawn('ollama', ['generate', '--prompt', prompt]);

        let output = '';
        ollama.stdout.on('data', (data) => {
            output += data.toString();
        });

        ollama.stderr.on('data', (data) => {
            console.error(`Ollama error: ${data}`);
        });

        ollama.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`Ollama exited with code ${code}`));
            } else {
                resolve(output.trim());
            }
        });
    });
}

module.exports = { generateText };