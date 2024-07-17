const Booking = require("./../models/Booking.model")
const mailService = require("../../services/SendMail.service");
const Room = require("./../models/Room.model");

const nodemailer =  require('nodemailer');
const moment = require("moment");
const axios = require("axios");

exports.webhook = async (req, res) => {
    let _id = req.query.vnp_TxnRef;
    if (req.query.vnp_ResponseCode === "00") {
        const booking = await Booking.findById({_id: _id});
        if (booking) {
            booking.status_payment = "PAID";
            booking.save();
        }

        return res.redirect('http://localhost:3000/payment/success');
    }

    return res.redirect('http://localhost:3000/payment/error');
    // return res.status(200).json({ data: req.query, status: 200 });
}

exports.cancel = async (req, res) => {
    try {
        const booking = await Booking.findOne({ _id: req.params.id });
        booking.status = 'CANCEL';

        let room = await Room.findById({ _id: booking.room_id });
        room.status = "EMPTY";
        room.save();

        await booking.save();
        return res.status(200).json({ data: booking, status: 200 });
    } catch (e){
        console.log('------------------ e',e);
        res.status(404)
        res.send({ error: "Booking doesn't exist!" })
    }
};

exports.index = async (req, res) => {
    const page = req.query.page || 1; const page_size = req.query.page_size || 10;
    try {
        // execute query with page and limit values
        const condition = {};
        if (req.query.user_id) condition.user_id = req.query.user_id;
        if (req.query.room_id) condition.room_id = req.query.room_id;

        const bookings = await Booking.find()
            .where(condition)
            .limit(page_size)
            .skip((page - 1) * page_size)
            .populate(['room'])
            .sort({ created_at: 'desc' })
            .exec();

        // get total documents in the Posts collection
        const count = await Booking.find().where(condition).count();

        // return response with posts, total pages, and current page
        const meta = {
            total_page: Math.ceil(count / page_size),
            total: count,
            current_page: parseInt(page),
            page_size: parseInt(page_size)
        }
        const status = 200;
        const data = {
            bookings: bookings
        }
        res.json({
            data,
            meta,
            status
        });
    } catch (err) {
        console.error(err.message);
    }
};

exports.show = async (req, res) => {
    try {
        const service = await Booking.findOne({ _id: req.params.id })
        return res.status(200).json({ data: service, status: 200 });
    } catch {
        res.status(404)
        res.send({ error: "Booking doesn't exist!" })
    }
};

exports.delete = async (req, res) => {
    try {
        await Booking.deleteOne({ _id: req.params.id })
        return res.status(200).json({ data: [], status: 200 });
    } catch {
        res.status(404)
        res.send({ error: "Booking doesn't exist!" })
    }
};


exports.update = async (req, res) => {
    try {
        const booking = await Booking.findOne({ _id: req.params.id })

        if (req.body.status) {
            booking.status = req.body.status;
        }

        await booking.save();
        return res.status(200).json({ data: booking, status: 200 });
    } catch {
        res.status(404)
        res.send({ error: "Booking doesn't exist!" })
    }
};

exports.updatePaymentStatus = async (req, res) => {
    try {
        const booking = await Booking.findOne({ _id: req.params.id });

        // if (req.body.status_payment) {
        //     booking.status_payment = req.body.status_payment;
        // }

        await booking.save();
        return res.status(200).json({ data: booking, status: 200 });
    } catch {
        res.status(404).send({ error: "Booking doesn't exist!" });
    }
};

exports.add = async (req, res) => {
    try {
        let data = req.body;
        console.log('data--------> ', data);
        // xử lý thời gian
        var now = moment(data.check_out); //todays date
        var end = moment(data.check_in); // another date
        var duration = moment.duration(now.diff(end));
        var days = duration.asDays();

        let roomID = data.room_id;
        let room = await Room.findById({ _id: roomID });
        room.status = "USER";
        room.save();

        data.room = roomID;
        data.price = room.price;
        data.total_money = room.price * days;
        data.status = "SUCCESS";
        data.status_payment = "PAID";

        const booking = new Booking(data);
        await booking.save();

        console.log('--------------- booking: ', booking);
        // tiến hành gủi email
        var transporter = nodemailer.createTransport({ // config mail server
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'tranngocquy02032002@gmail.com', //Tài khoản gmail vừa tạo
                pass: 'lvdavurvnxrqwtog' //Mật khẩu tài khoản gmail vừa tạo
            },
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false
            }
        });
        var content = '';
        content += `
            <div style="background-color: #003375; margin: 0 auto; max-width: 600px; ">
                <div style="padding: 10px; background-color: white;">
                    <h4 style="color: #0d6efd">Xin chào ${data.customer_name}</h4>
                    <p style="color: black">HomeStay Managerment xin chân thành cảm ơn bạn đã chọn chúng tôi là địa điểm lưu trú trong chuyến đi của bạn. Chúng tôi xin gửi đến bạn một email về việc đặt phòng của bạn đã được xác nhận và thanh toán thành công tại Resort của chúng tôi. Dưới đây là thông tin chi tiết về đặt phòng của bạn:</p>
                    
                    <span style="color: black">Tên khách hàng <b>${data.customer_name}</b></span> <br>
                    <span style="color: black">Ngày nhận phòng: <b>${data.check_in}</b></span> <br>
                    <span style="color: black">Ngày trả phòng: <b>${data.check_out}</b></span><br>
                    <span style="color: black">Hạng phòng: <b>${room.name}</b></span> <br>
                    <span style="color: black">Số lượng người: <b>${data.amount_of_people}</b></span><br>
                    <span style="color: black">Tổng tiền: <b>${data.total_money} VNĐ</b></span><br>
                    <span style="color: black">Phương thức thanh toán: <b>Chuyển khoản</b></span><br>
                    <p>Vui lòng kiểm tra thông tin trên và đảm bảo rằng chúng là chính xác. Nếu có bất kỳ sai sót nào hoặc bạn có bất kỳ yêu cầu nào khác, xin hãy liên hệ với chúng tôi ngay để chúng tôi có thể hỗ trợ bạn tốt nhất.</p>
                    <p>Nếu bạn có bất kỳ câu hỏi hoặc yêu cầu bổ sung nào, xin hãy liên hệ với chúng tôi bằng cách gọi số điện thoại <b>0909.555.888</b> hoặc gửi email về địa chỉ haan.resort@gmail.com. Chúng tôi sẽ sẵn lòng giúp đỡ bạn.</p>
                    <p>
                        <img src="https://www.techopedia.com/wp-content/uploads/2023/03/aee977ce-f946-4451-8b9e-bba278ba5f13.png" style="width: 150px;height: auto" alt="">
                    </p>
                    <p>Vui lòng đưa mã QR này tại quầy lễ tân để làm thủ tục nhận phòng.</p>
                    <p>Trân trọng,</p>
                    <p><b>HomeStay Managerment</b></p>
                </div>
            </div>
        `;
        var mainOptions = {
            from: 'tranngocquy02032002@gmail.com',
            to: 'kiet7cvl@gmail.com',
            subject: '[BOOKING] đặt phòng thành công',
            html: content
        }
        transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log(' SUCCESS ' + info.response);
            }
        });
        if (data.payment_type === 2) {
            try {
                let newData = {
                    order_id: booking._id,
                    url_return: 'http://localhost:9998/api/v1/booking/callback',
                    amount: data.total_money,
                    // url_callback: 'http://localhost:3053/api/v1/booking/callback'
                }
                const response = await axios.post("https://123code.net/api/v1/payment/add", newData);
                if (response.data.link) {
                    data.link = response.data.link;
                }

            } catch (err) {
                res.status(500).json({ message: err });
            }
        }
        return res.status(200).json({ data: booking, status: 200 });
    } catch (e) {
        res.status(501)
        res.send({ error: e })
    }
};

exports.createBooking = async (req, res) => {
    try {
        const booking = new Booking({
            user_id: req.body.user_id,
            room_id: req.body.room_id,
            discount_id: req.body.discount_id,
            discount_code: req.body.discount_code,
            discount: req.body.discount,
            status: req.body.status,
            status_payment: req.body.status_payment,
            price: req.body.price,
            total_money: req.body.total_money,
            amount_of_people: req.body.amount_of_people,
            payment_type: req.body.payment_type,
            note: req.body.note,
            check_in: req.body.check_in,
            check_out: req.body.check_out,
            customer_name: req.body.customer_name,
            customer_email: req.body.customer_email,
            customer_phone: req.body.customer_phone,
        });
        await booking.save().then((booking) => {
            const formResponse = mailService.generateHtmlContent(
                req.body.customer_name,
                booking
            );
            mailService.sendMail(req.body.customer_email, formResponse);
            res.status(201).json({ data: booking, status: 201 });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ error: "Internal Server Error" });
    }
};