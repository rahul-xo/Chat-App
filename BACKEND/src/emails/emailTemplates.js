export function createWelcomeEmailTemplate(name, clientURL) {
 
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Messenger</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
    </style>
  </head>
  <body style="font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f8f8f8; margin: 0; padding: 20px;">
    
    <div style="max-width: 580px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.08); overflow: hidden;">
      
      <!-- Header -->
      <div style="background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
        <img src="https://i.ibb.co/6rCj5xT/messenger-icon-white.png" alt="Messenger Icon" style="width: 65px; height: 65px; margin-bottom: 15px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 600;">You're In! Welcome Aboard.</h1>
      </div>
      
      <!-- Content -->
      <div style="padding: 35px 30px;">
        <p style="font-size: 18px; color: #444; margin-top: 0;"><strong>Hi ${name},</strong></p>
        <p style="font-size: 16px; color: #555;">We're so excited to have you join the community. You're all set to start connecting!</p>
        
        <!-- Quick Tip -->
        <div style="background-color: #f5f6fa; border-left: 4px solid #6A60E2; margin: 30px 0; padding: 20px;">
            <p style="margin: 0; font-size: 15px; color: #555;">
                <strong>Quick Tip:</strong> Set up your profile picture so your friends can recognize you easily!
            </p>
        </div>
        
        <!-- CTA Button -->
        <div style="text-align: center; margin: 40px 0;">
          <a href="${clientURL}" style="background-color: #6A60E2; color: white; text-decoration: none; padding: 14px 35px; border-radius: 50px; font-weight: 600; font-size: 16px; display: inline-block;">Start Chatting Now</a>
        </div>
        
        <p style="font-size: 16px; color: #555; margin-bottom: 0;">Cheers,<br>The Messenger Team</p>
      </div>
      
      <!-- Footer -->
      <div style="text-align: center; padding: 25px; background-color: #f8f8f8; border-top: 1px solid #e0e0e0;">
        <p style="color: #aaa; font-size: 12px; margin: 0;">© 2025 Messenger. All Rights Reserved.</p>
        <p style="margin-top: 10px;">
          <a href="#" style="color: #6A60E2; text-decoration: none; margin: 0 8px; font-size: 12px;">Privacy Policy</a> &bull;
          <a href="#" style="color: #6A60E2; text-decoration: none; margin: 0 8px; font-size: 12px;">Unsubscribe</a>
        </p>
      </div>
      
    </div>
  </body>
  </html>
  `;
}
