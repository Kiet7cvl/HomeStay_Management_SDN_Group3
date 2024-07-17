const Booking = require("./../../models/Booking.model")
const mailService = require("../../services/SendMail.service");

exports.index = async (req, res) => {
    const page = req.query.page || 1; const page_size = req.query.page_size  || 10;
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
            .sort({created_at: 'desc'})
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
        const status =  200;
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


const createBooking = async (req, res) => {
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

module.exports = {
    createBooking,
};