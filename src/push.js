const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BGI2ATfn34mWkKQA8UOxXq6mEH-1RGLZsFDJx3GjGLeXJ19W2_JMmnKGimTnksDpskFjIhjlyI5L64-IuCQne-I",
    "privateKey": "sGLomI53Pg0wrkVJLD7T9DY2MV1rCdrFKHchSDD6f_U"
};


webPush.setVapidDetails(
    'mailto:ryanrumapea@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dYU6k3-VBvk:APA91bF35SDdo9-VgG9XNNWoUe1Pbg6DDXAurdUuVo8BCAuRzlupSB7QkjKaJhCZ434IrA3xF-_OsXzK3kMfsnMaAlCJy6lSvl46CtOjSwUe58xTHBN39dxpcAyT1lXHyUMxGFF5Vh_m",
    "keys": {
        "p256dh": "BG46NayJJ0AYRJwp6OjLYXEsuVATI3DmyrEcgfLKxAN0TvwXzYCE6MHNmqFK+HzM2YKn58imbPEO4BJGk4EFgtE=",
        "auth": "oMtjYf7oVjukyd7j1+hUIg=="
    }
};
const payload = 'Congrats! Your application can get push notification now.!';

const options = {
    gcmAPIKey: '233511798113',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);