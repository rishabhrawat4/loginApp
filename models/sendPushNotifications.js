async function sendPushNotification(expoPushToken, messageTitle, messageBody) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: messageTitle,
      body: messageBody,
      data: { someData: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
}


export default sendPushNotification;