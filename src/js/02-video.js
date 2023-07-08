import Player from "@vimeo/player";
import throttle from 'lodash.throttle';


const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const VIDEOPLAYER_CURRENT_TIME = 'videoplayer-current-time';
const savedTime = localStorage.getItem(VIDEOPLAYER_CURRENT_TIME);



if (savedTime) {
    player.setCurrentTime(savedTime).catch(function (error) {
        console.log(error);
    });
}

player.on('timeupdate', throttle(function (data) {
    const currentTime = data.seconds;
    localStorage.setItem(VIDEOPLAYER_CURRENT_TIME, currentTime)
}, 1000));

console.log(JSON.parse(localStorage.getItem(VIDEOPLAYER_CURRENT_TIME)))