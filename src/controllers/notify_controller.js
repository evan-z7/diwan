import admin from '../../firebase/services.js';

export const sendNotification = async (req, res) => {
  const { token, title, body } = req.body

  const message = {
    notification: {
      title: "najeb",
      body: "najeb" 
    }, 
    token: "clwD8BNSQj-kAuH1etdbKl:APA91bGBiFVYcZ8Zge8dA8HoXi5oWMQ0zKqcIxYENjwkYeurRVhATkp0xmj9qBXSg9vBxxa1T8hLiIJYQAIFnhBG_nc1PmCnuDopx-Jas4JX_5ssA3e1im754s7egpFmQFcqN7F4Znv8"
  };

  try {
    const response = await admin.messaging().send(message);
    res.status(200).send({ success: true, message: 'Notification sent', response: response });
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: 'Notification failed', error: error.message });
  }
};
 
