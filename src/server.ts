/* Load file .env */
import dotenv from 'dotenv';
dotenv.config();

/* Express */
import express from 'express';

/* Tao ra doi tuong server */
const server = express();

/* Setup Cors */
import cors from 'cors';
server.use(cors());

/* Setup Body Parser */
import bodyParser from 'body-parser';
server.use(bodyParser.json());

// server.use("/tests", async (req, res) => {
//     let resuslt = await MailServer.sendMail({
//         to: "thu376897@gmail.com",
//         subject: "Thử Template password",
//         html: templatess.passwordComfirm({
//             productName: 'Huong Store',
//             productWebUrl: 'https://pokemoninmylife.com/',
//             receiverName: 'Người Dùng Mới',
//             confirmLink: 'abc.xyz'
//         })
//     })

//     console.log("resuslt", resuslt)
// })


/* Version api setup */
import routeApi from './apis'
import guard from './middlewares/guard';
server.use('/api', guard.ipAuthen, routeApi)
/* Setup api config */
import apiConfig from './apis'
server.use('/apis', apiConfig)

/* day server ra port tren may */
server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on: http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`,);
})