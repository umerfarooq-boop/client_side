import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'local',
    cluster: 'mt1',
    forceTLS: false,
    wsHost: window.location.hostname,
    wsPort: 6001,
    disableStats: true,
});


export default Echo;
