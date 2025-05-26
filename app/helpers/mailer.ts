import nodemailer from "nodemailer";
interface IsendMail {
  email: string;
  emailType: string;
  UserId: string;
}
export const sendMail = async ({ email, emailType, UserId }: IsendMail) => {
  //TODO: configure  mail for usage
  try {
    const transporter = nodemailer.createTransport({
      host: "",
      port: 445,
      secure: true,
      auth: {
        user: "example@email.com",
        pass: "Replace"
      }
    });

    const mailOptions = {
      from: "irfan@gmail.com", //sender
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your Email" : "Reset your Password",
      html: "<b>Email</b>"
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
    console.log("error while sending email" + error);
  }
};
