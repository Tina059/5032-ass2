// sendEmail.js
import express from 'express';
import sgMail from '@sendgrid/mail';
import bodyParser from 'body-parser';
import cors from 'cors';

sgMail.setApiKey('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');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
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

app.listen(3000, () => {
  console.log('Server running on port 3000');
});