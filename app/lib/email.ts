import nodemailer from 'nodemailer';

export async function sendNewUserNotification(userEmail: string, userName: string | null) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'larsvermeulen05@gmail.com',
    subject: 'Nieuw Account Registratie - Portfolio',
    html: `
      <h1>Nieuwe Account Registratie</h1>
      <p>Er is een nieuw account geregistreerd op je portfolio website.</p>
      <p><strong>Details:</strong></p>
      <ul>
        <li>Naam: ${userName || 'Niet opgegeven'}</li>
        <li>Email: ${userEmail}</li>
      </ul>
      <p>Je kunt dit account goedkeuren via het admin dashboard.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Notification email sent successfully');
  } catch (error) {
    console.error('Error sending notification email:', error);
  }
} 