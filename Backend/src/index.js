const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const app = express();
const axios = require('axios');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('common'));
//app.use('/', express.static("dist"));
app.get("/getusers", async (req, res, next) => {

    setTimeout(async () => {
        await axios.get("https://random-data-api.com/api/v2/users") // 'https://random-data-api.com/documentation'
            .then((result) => {
                console.log(result.data)

                return res.send(result.data)
            }).catch((err) => {
                console.log(err.data)

                return res.send("erro");
            });
    }, 1300)

})

const portHttp = 8009;
const httpServer = http.createServer(app);


httpServer.listen(portHttp, function () {
    console.log("JSON Server is running on " + portHttp);
});

