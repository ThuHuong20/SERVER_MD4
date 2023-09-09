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

import path from 'path'
server.set('view engine', 'ejs'); // Thiết lập EJS là công cụ mẫu
server.set('views', path.join(__dirname, 'templates')); // Đặt thư mục chứa các tệp mẫu EJS

server.get('/emailActived', (req, res) => {
    const langData = {
        SuccessRegister: "Đăng ký thành công",
        Activated: "Đã kích hoạt",
        GoLogin: "Đăng nhập"
        // Thêm các dữ liệu khác tùy theo trang EJS của bạn
    };

    res.render('emailActived', { langData });
});

/* Version api setup */
import routeApi from './apis'
import guard from './middlewares/guard';
server.use('/api', guard.ipAuthen, routeApi)




/* day server ra port tren may */
server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on: http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`,);
})