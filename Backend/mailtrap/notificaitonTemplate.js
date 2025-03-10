export const NEW_TASK_NOTIFICATION_TEMPLATE = (taskMessage) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
    <h2 style="color: #007BFF; text-align: center;">📢 New Cleaning Task Available</h2>
    <p style="font-size: 16px;">Dear Peon,</p>
    <p style="font-size: 16px;">A new cleaning task has been assigned. Please check the app for more details.</p>
    <p style="font-size: 16px; font-weight: bold;">Task Details:</p>
    <p style="font-size: 16px; background: #f8f9fa; padding: 10px; border-radius: 5px;">${taskMessage}</p>
    <p style="font-size: 16px;">Click the button below to view the task:</p>
    <div style="text-align: center;">
      <a href="https://your-app-url.com/tasks" style="background-color: #007BFF; color: #ffffff; padding: 10px 20px; text-decoration: none; font-size: 16px; border-radius: 5px;">View Task</a>
    </div>
    <p style="font-size: 14px; color: #777; text-align: center; margin-top: 20px;">This is an automated email. Please do not reply.</p>
  </div>
`;
