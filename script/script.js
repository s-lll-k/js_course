window.addEventListener('DOMContentLoaded', function () {
   'use strict';
   
    // let animate = (duration, target, action) => {
    //     let start = Date.now();
    //     let animationInterval = setInterval(() => {
    //         let timePassed = Date.now() - start;
    //         if (timePassed >= duration) {
    //             action = target;
    //             clearInterval(animationInterval);
    //             return;
    //         } else if (typeof target === 'string') {
    //             action = `${timePassed / (duration / +target)}`;
    //         } else{
    //             action = timePassed / (duration / target);
    //         }
    //     }, 10);
    // };

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

    // меню
    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', () => {
            handlerMenu();
        });
        closeBtn.addEventListener('click', () => {
            handlerMenu();
        });

        menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));
    };
    toggleMenu();

    // popup

    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close');

        // popup animation
        const popupAnim = (t) => {
            popup.style.opacity = '0';
            let start = Date.now();
            let animationInterval = setInterval(() => {
                let timePassed = Date.now() - start;
                if (timePassed >= t) {
                    popup.style.opacity = '1';
                    clearInterval(animationInterval);
                    return;
                } else {
                    popup.style.opacity = `${timePassed / t}`;
                }
            }, 10);
        };
        
        popupBtn.forEach(elem => elem.addEventListener('click', () => {
            popup.style.display = 'block';
            if (document.documentElement.offsetWidth > 768) {
                popupAnim(200);
            }
        }));

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    };
    togglePopUp();

    // smoothScrollTo animation

    const scrollTo = () => {
        const linksWithId = document.querySelectorAll('a[href^=\\#]'),
            anchorLinks = new Set();

        linksWithId.forEach(link => {
            if (link.getAttribute('href') !== '#' && document.querySelector(`${link.getAttribute('href')}`)){ 
                anchorLinks.add(link);
            }
        });
        const scrollAnim = (t, height) => {
            let start = Date.now();
            let animationInterval = setInterval(() => {
                let timePassed = Date.now() - start;
                if (timePassed >= t) {
                    document.documentElement.scrollTop = height;
                    clearInterval(animationInterval);
                    return;
                } else {
                    document.documentElement.scrollTop = timePassed / (t / height);
                }
            }, 10);
        };
        anchorLinks.forEach(link => link.addEventListener('click', () => {
            event.preventDefault();
            let block = document.querySelector(`${link.getAttribute('href')}`);
            scrollAnim(500, block.offsetTop);
        }));
    };

    scrollTo();
});