const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
// const Booking = db.Booking;

const generateHtmlContent = (customerName, booking) => {
    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h1 style="color: #4CAF50;">Cảm ơn bạn đã đặt phòng tại khách sạn chúng tôi</h1>
            <p>Chào <strong>${customerName}</strong>,</p>
            <p>Chúng tôi rất vui thông báo rằng bạn đã đặt phòng thành công tại khách sạn của chúng tôi. Dưới đây là chi tiết đặt phòng của bạn:</p>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">Phòng</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">Deluxe</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">Ngày nhận phòng</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${booking.checkin}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">Ngày trả phòng</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${booking.checkout}</td>
                </tr>
            </table>
            <p><img src="cid:receiptImage" alt="Biên lai" style="max-width: 100%; height: auto;"></p>
            <p>Chúng tôi mong được đón tiếp bạn!</p>
            <p>Trân trọng cảm ơn bạn đã sử dụng dịch vụ của chúng tôi</p>
        </div>
    `;
};

const becomeOwnerSuccess = (customerName) => {
    return `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chào mừng OWNER mới!</title>
  <style>
    /* Basic styling */
    body {
      font-family: sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }

    .container {
      width: 600px;
      margin: 0 auto;
      background-color: #fff;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .header {
      text-align: center;
      margin-bottom: 20px;
    }

    .logo {
      width: 100px;
      height: auto;
      margin-bottom: 10px;
    }

    .title {
      font-size: 24px;
      font-weight: bold;
    }

    .content {
      line-height: 1.5;
    }

    .message {
      margin-bottom: 20px;
    }

    .details {
      font-weight: bold;
    }

    .cta-button {
      display: block;
      margin: 20px auto;
      padding: 10px 20px;
      background-color: #007bff;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .footer {
      text-align: center;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://stackoverflow.com/questions/18010480/how-to-get-the-website-logo-path-from-the-link-of-the-website" alt="Your Company Logo" class="logo">
      <h1 class="title">Chào mừng OWNER mới!</h1>
    </div>

    <div class="content">
      <p class="message">Chào ${customerName},</p>

      <p>Tin vui! Chúng tôi rất vui mừng thông báo rằng bạn đã chính thức trở thành OWNER trên hệ thống của chúng tôi.</p>

      <p class="message">Với tư cách là OWNER, bạn có thể:</p>
      <ul>
        <li>Đăng tin cho thuê phòng</li>
        <li>Quản lý danh sách tin đăng</li>
        <li>Tương tác với khách thuê</li>
        <li>Truy cập các tính năng dành riêng cho OWNER</li>
      </ul>

      <a href="https://www.example.com/owner/listings" class="cta-button">Bắt đầu đăng tin</a>

      <p class="message">Hãy bắt đầu hành trình trở thành nhà cung cấp dịch vụ lưu trú thành công trên hệ thống của chúng tôi.</p>

      <p>Trân trọng,</p>
      <p>Đội ngũ HomeStay Managerment</p>
    </div>

    <div class="footer">
      <p>&copy; 2024, HomeStay Managerment. Mọi quyền được bảo lưu.</p>
    </div>
  </div>
</body>
</html>
`;
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const mailOptions = (recipientMail, formResponse) => {
    return {
        from: process.env.EMAIL_ACCOUNT,
        to: recipientMail,
        subject: "Sending Email using Node.js",
        html: formResponse,
    };
};

const sendMail = (recipientMail, formResponse) => {
    transporter.sendMail(
        mailOptions(recipientMail, formResponse),
        (error, info) => {
            if (error) {
                console.log("Error occurred:", error.message);
            } else {
                console.log("Email sent successfully!");
                console.log("Message ID:", info.messageId);
            }
        }
    );
};

module.exports = {
    sendMail,
    generateHtmlContent,
    becomeOwnerSuccess
};