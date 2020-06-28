import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import registerEvents from 'serviceworker-webpack-plugin/lib/browser/registerEvents';

document.addEventListener('DOMContentLoaded', () => {
    const parallax = document.querySelectorAll('.parallax');
    M.Parallax.init(parallax);
    document.querySelector('app-bar').togglePreloader();
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        const registration = runtime.register();
        registerEvents(registration);
    });
    requestPermission();
} else {
    console.log('ServiceWorker is not supported in this browser.');
}

function requestPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(result => {
            if (result === 'denied') {
                console.log('Notification feature not permitted.');
                return;
            } else if (result === 'default') {
                console.log('User closing the request permission dialog');
                return;
            }

            if ('PushManager' in window) {
                navigator.serviceWorker.getRegistration().then(registration => {
                    registration.pushManager
                        .subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array(
                                'BGI2ATfn34mWkKQA8UOxXq6mEH-1RGLZsFDJx3GjGLeXJ19W2_JMmnKGimTnksDpskFjIhjlyI5L64-IuCQne-I'
                            ),
                        })
                        .then(subscribe => {
                            console.log('Success. Endpoint: ', subscribe.endpoint);
                            console.log(
                                'p256dh key: ',
                                btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('p256dh'))))
                            );
                            console.log(
                                'auth key: ',
                                btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('auth'))))
                            );
                        })
                        .catch(error => {
                            console.error('Cant subscribe ', error.message);
                        });
                });
            }
        });
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
