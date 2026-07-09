import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  //service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  from: process.env.EMAIL_USER,
});

export async function sendAdminBookingNotification(bookingId: string) {
  await transporter.sendMail({
    from: `Blacarklimo <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    bcc: process.env.ADMIN_EMAIL,
    subject: "Blacarklimo | New Paid Booking",
    html: `
    <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Blacarklimo | New Paid Booking</title>

            <link rel="shortcut icon" href="https://blacarklimo.com/favicon.ico" type="image/x-icon" />
        </head>
        <body style="background:#020202; padding:20px;">
          <h2 style="color: #f5f5f5; text-align: center;">New Booking Payment Received</h2>
          <p style="color: #c4c4c4; text-align: center;">A booking has been paid for successfully.</p>
          <br /><br />
          <p style="color: #c4c4c4; text-align: center;"><strong>${bookingId}</strong></p>
          <br /><br />
          <p style="color: #c4c4c4; text-align: center;">Please log in to the admin dashboard and review it with the above booking ID.</p>
        </body>
        </html>
    `,
  });
}

export async function sendContactMessage(
  fullname: string,
  email: string,
  phone: string,
  message: string,
) {
  await transporter.sendMail({
    from: `Blacarklimo <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    bcc: process.env.ADMIN_EMAIL,
    subject: "Blacarklimo | Customer Enquiry",
    html: `
    <!DOCTYPE html>
      <html>
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Blacarklimo | Customer Enquiry</title>

            <link rel="shortcut icon" href="https://blacarklimo.com/favicon.ico" type="image/x-icon" />
        </head>
        <body style="background:#020202; padding:20px;">
          <h2 style="color: #f5f5f5; text-align: center;">Customer Enquiry Received</h2>
          <p style="color: #c4c4c4; text-align: center;">A customer has sent an enquiry from the contact form. Use the provided contact information to respond.</p>
          <br /><br /><br />
          <p style="color: #c4c4c4;"><strong style="color: #f5f5f5;">Full Name: </strong> ${fullname}</p>
          <p style="color: #c4c4c4;"><strong style="color: #f5f5f5;">Email Address: </strong> ${email}</p>
          <p style="color: #c4c4c4;"><strong style="color: #f5f5f5;">Phone Number: </strong> ${phone}</p>
          <p style="color: #c4c4c4;"><strong style="color: #f5f5f5;">Customer Message: </strong> ${message}</p>
        </body>
      </html>
    `,
  });
}
