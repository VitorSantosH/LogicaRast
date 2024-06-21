const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);

async function readCsvFiles(directory) {
    try {
        const files = await readdir(directory);
        const csvFiles = files.filter(file => path.extname(file) === '.csv');

        const results = await Promise.all(csvFiles.map(async (file) => {
            const filePath = path.join(directory, file);
            const fileResults = [];

            await new Promise((resolve, reject) => {
                fs.createReadStream(filePath)
                    .pipe(csvParser())
                    .on('data', (data) => {
                        fileResults.push(data);
                    })
                    .on('end', () => {
                        resolve();
                    })
                    .on('error', (error) => {
                        reject(error);
                    });
            });

            return {
                ...fileResults[0]
            };
        }));

        console.log(results)

        return results;

    } catch (error) {
        console.error('Erro ao ler arquivos CSV:', error);
        throw error;
    }
}

module.exports = readCsvFiles;
