import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const sendEmail = async recipient =>{
    const msg = {
        to: recipient,
        from: 'tomibeb14@gmail.com', 
        subject: 'hello! interesting',
        text:'meeting in 15 minutes',
        html: '<strong>dear Tomas,  please bring your laptop with you</strong>',
      };
      await sgMail.send(msg)
}