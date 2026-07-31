/**
 * Utility to simulate or handle sending emails for password reset
 */
const sendEmail = async ({ email, subject, message, resetUrl }) => {
  console.log(`\n================ EMAIL NOTIFICATION ================`);
  console.log(`To: ${email}`);
  console.log(`Subject: ${subject}`);
  console.log(`Message: ${message}`);
  if (resetUrl) {
    console.log(`Reset URL: ${resetUrl}`);
  }
  console.log(`====================================================\n`);
  return true;
};

module.exports = sendEmail;
