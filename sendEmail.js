// sendEmail.js
import express from 'express';
import sgMail from '@sendgrid/mail';
import bodyParser from 'body-parser';
import cors from 'cors';

sgMail.setApiKey('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');

const app = express();
app.use(cors({
  origin: 'https://5032-ass2.pages.dev' 
}));


app.use(bodyParser.json());

app.get('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  const msg = {
    to,
    from: 'titiale327@gmail.com',
    subject,
    text,
  };

  try {
    await sgMail.send(msg);
    res.status(200).send('Email sent successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});