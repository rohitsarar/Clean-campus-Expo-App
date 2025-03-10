import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { NEW_TASK_NOTIFICATION_TEMPLATE} from './notificaitonTemplate.js';

dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sender = `"Clean Campus" <${process.env.EMAIL_USER}>`;

/**
 * Send notification email to multiple recipients with a template
 * @param {string[]} recipientEmails - List of recipient email addresses
 * @param {string} taskMessage - Message containing task details
 */
export const sendNotificationEmail = async (recipientEmails, taskMessage) => {
  const mailOptions = {
    from: sender,
    to: recipientEmails.join(','),
    subject: '📢 New Cleaning Task Assigned',
    html: NEW_TASK_NOTIFICATION_TEMPLATE(taskMessage),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Notification email sent to peons: ${recipientEmails.join(', ')}`);
  } catch (error) {
    console.error('❌ Error sending notification email:', error);
  }
};
