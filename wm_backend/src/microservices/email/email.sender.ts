import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'girasuportwm@gmail.com',
        pass: 'cdyx ehqw gwoa fvws '
    },
});
export async function sendEmail(to: string, subject: string, text: string): Promise<void> {
    try {
      const info = await transporter.sendMail({
        from: 'girasuportwm@gmail.com',
        to,
        subject,
        text,
      });
  
      console.log('Correo enviado:', info.response);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
  }
