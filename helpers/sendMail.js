import  sgMail from '@sendgrid/mail'
import "dotenv/config"
const {SENDGRID_API , SENDGRID_FROM }=process.env

sgMail.setApiKey(SENDGRID_API)


const sendEmail = async (data) => {
    const msg = {...data,      
      from: SENDGRID_FROM,           
    };
  
    try {
      await sgMail.send(msg);
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      if (error.response) {
        console.error(error.response.body);
      }
    }
  };

  export default sendEmail;

