const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const { Parser } = require('json2csv');

async function editCsvFile(json) {
    const directory = './src/csvs';
    const id = json.id.toString();

    try {
        const files = fs.readdirSync(directory);
        const csvFiles = files.filter(file => path.extname(file) === '.csv');

        let fileFound = false;
        let updatedData = null;

        for (let file of csvFiles) {
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

            updatedData = fileResults.map(record => {
                if (record.id === id) {
                    fileFound = true;
                    return flattenObject(json);
                }
                return record;
            });

            if (fileFound) {
                const json2csvParser = new Parser();
                const csv = json2csvParser.parse(updatedData);

                await new Promise((resolve, reject) => {
                    fs.writeFile(filePath, csv, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            console.log(`Arquivo ${file} atualizado com sucesso`);
                            resolve();
                        }
                    });
                });

                break;
            }
        }

        if (!fileFound) {
            throw new Error(`Nenhum arquivo encontrado com o id ${id}`);
        }

        return updatedData;

    } catch (error) {
        console.error('Erro ao editar o arquivo CSV:', error);
        throw error;
    }
}

function flattenObject(obj, parent = '', res = {}) {
    for (let key in obj) {
        let propName = parent ? `${parent}_${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            flattenObject(obj[key], propName, res);
        } else {
            res[propName] = obj[key];
        }
    }
    return res;
}

module.exports = editCsvFile;
