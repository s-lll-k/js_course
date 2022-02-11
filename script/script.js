window.addEventListener('DOMContentLoaded', function () {
   'use strict';

    //    Timer
    function countTimer(deadline) {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
        function getTimeRemaining() {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
                return {timeRemaining, hours, minutes, seconds};
        }
        function addNull(num) {
            let str = String(num);
            if (str.length === 1) {
                return '0' + str;
            } else {
                return str;
            }
        }
        function updateClock() {
            let timer = getTimeRemaining();
            if (timer.timeRemaining > 0) {
                timerHours.textContent = addNull(timer.hours);
                timerMinutes.textContent = addNull(timer.minutes);
                timerSeconds.textContent = addNull(timer.seconds);    
            } else {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
                clearInterval(timerInterval);
            }
        }
        let timerInterval = setInterval(updateClock, 1000);
    }

    countTimer('8 febrary 2022 21:46');

});