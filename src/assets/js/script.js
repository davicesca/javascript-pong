import {load, update, draw} from './pong.js';

window.onload = () => {
    load();

    const FPS = 60;
    // Game Loop
    setInterval(() => {
        update();
        draw();
    }, 1000/FPS);
};