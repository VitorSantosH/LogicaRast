const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path');


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


async function SaveCsv(Json) {

    const flattenedData = flattenObject(Json);
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(flattenedData);

    const dir = './src/csvs';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    // Define o nome do arquivo
    const fileName = `${Json.username}_${Json.id}.csv`;
    const filePath = path.join(dir, fileName);

    // Escreve o CSV em um arquivo
    fs.writeFile(filePath, csv, (err) => {
        if (err) {
            console.error('Erro ao salvar o arquivo CSV:', err);
            return err;
        } else {
            console.log('Arquivo CSV salvo com sucesso em:', filePath);

            return `Arquivo CSV salvo com sucesso em: ${filePath})`
        }
    });

}

module.exports = SaveCsv;