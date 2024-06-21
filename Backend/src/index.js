const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const app = express();
const axios = require('axios');
const SaveCsv = require('./DbRegra/SaveCsv');
const readCsv = require("./DbRegra/ReadCsv");
const EditarCsv = require('./DbRegra/EditarCvs');



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('common'));
app.use('/', express.static("dist"));
app.get("/getusers", async (req, res, next) => {

    setTimeout(async () => {
        await axios.get("https://random-data-api.com/api/v2/users?size=40") // 'https://random-data-api.com/documentation'
            .then((result) => {

                console.log(result.data)

                result.data.forEach(async element => {
                    let retSave = await SaveCsv(element)
                    console.log(retSave)
                });

                return res.send(result.data)

            }).catch((err) => {
                console.log(err.data)

                return res.send("erro");
            });
    }, 1300)

})
app.get("/getSavedUsers", async (req, res, next) => {

    const csvs = await readCsv('./src/csvs');

    return res.send(csvs);

})
app.post("/editUser", async (req, res, next) => {

    console.log(req.body);

    let ret = await EditarCsv(req.body)
    console.log(ret)
    return res.send(ret)

})


const portHttp = 8009;
const httpServer = http.createServer(app);


httpServer.listen(portHttp, function () {
    console.log("JSON Server is running on " + portHttp);
});

