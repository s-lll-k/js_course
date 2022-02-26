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
        const menu = document.querySelector('menu');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };
        document.body.addEventListener('click', event => {
            let target = event.target;
            if (menu.classList.contains('active-menu')) {
                let menuArea = target.closest('menu');
                if (!menuArea || target.classList.contains('close-btn') || target.tagName === 'A') {
                    handlerMenu();
                }
            } else {
                target = target.closest('.menu');
                if (target) {
                    handlerMenu();
                }
            }
        });
    };
    toggleMenu();

    // popup

    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn');

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

        popup.addEventListener('click', event => {
            let target = event.target;
            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');

                if (!target) {
                    popup.style.display = 'none';
                }
            }
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

    // Табы

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');
        
        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', event => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();

    // Slider

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            slider = document.querySelector('.portfolio-content');

        let currentSlide = 0,
            interval,
            dot;

        const initDots = () => {
            slide.forEach((elem, index) => {
                let newDot = document.createElement('li');
                newDot.classList.add('dot');
                if (elem.classList.contains('portfolio-item-active')) {
                    newDot.classList.add('dot-active');
                }
                document.querySelector('.portfolio-dots').append(newDot);
            });
            dot = document.querySelectorAll('.dot');
        };
        initDots();

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };
        
        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };


        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', event => {
            event.preventDefault();

            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
               return; 
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            
            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(1500);
    };

    slider();

    // Photos, data-attribute

    const photosBlock = document.querySelector('.command .row');
    let srcImg;

    photosBlock.addEventListener('mouseover', event => {
        let target = event.target;
        if (target.classList.contains('command__photo')) {
            srcImg = target.src;
            target.src = target.dataset.img;
        }
    });
    photosBlock.addEventListener('mouseout', event => {
        let target = event.target;
        if (target.classList.contains('command__photo')) {
            target.src = srcImg;
        }
    });

    // Validation

    const inputSquare = document.querySelector('.calc-item.calc-square'),
        inputCount = document.querySelector('.calc-item.calc-count'),
        inputDay = document.querySelector('.calc-item.calc-day'),
        inputEmail = document.querySelector('#form2-email'),
        inputTel = document.querySelector('#form2-phone'),
        inputName = document.querySelector('#form2-name'),
        inputMessage = document.querySelector('#form2-message'),
        onlyDigitsExp = /\D/,
        emailExp = /[^A-Za-z@-_\.!~\*']/,
        telExp = /[^0-9\()-\+]/,
        textExp = /[^А-Яа-яЁё-\s,]/;
    
    const validateInputs = (validateStr, ...el) => {
        el.forEach(item => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(validateStr, '');
            });
        });
    };
    validateInputs(onlyDigitsExp, inputCount, inputDay, inputSquare);
    validateInputs(emailExp, inputEmail);
    validateInputs(telExp, inputTel);
    validateInputs(textExp, inputName, inputMessage);

    // Calculator

    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            totalValue = document.getElementById('total');

        const animateSum = num => {
            let count = 0;
            let interval = setInterval(() => {
                if (count >= num) {
                    totalValue.textContent = Math.round(num);
                    clearInterval(interval);
                } else {
                    count += 9;
                    totalValue.textContent = count;
                }
            }, 5);
        };

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +inputSquare.value;

            if (inputCount.value > 1) {
                countValue += (inputCount.value - 1) / 10;
            }

            if (inputDay.value && inputDay.value < 5) {
                dayValue *= 2;
            } else if (inputDay.value && inputDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            animateSum(total);
        };

        calcBlock.addEventListener('change', (event) => {
            const target = event.target;

            if (target.matches('.calc-type') ||
            target.matches('.calc-square') ||
            target.matches('.calc-count') ||
            target.matches('.calc-day')) {
                countSum();
            }
        });
    };

    calc();

    // send-ajax-form
    const sendForm = () => {
        const errorMessage = 'Что то пошло не так...',
            loadMessage = 'Загрузка...',
            successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

        const form = document.querySelector('#form1');

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem;'

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            form.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;
            const formData = new FormData(form);
            let body = {};

            formData.forEach((val, key) => {
                body[key] = val;
            });
            postData(body)
                .then(success => statusMessage.textContent = success)
                .catch(errMessage => statusMessage.textContent = errMessage);
        });

        const postData = (body) => {
            return new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();
                request.addEventListener('readystatechange', () => {
    
                    if (request.readyState !== 4) {
                        return;
                    }
    
                    if (request.status === 200) {
                        resolve(successMessage);
                    } else {
                        reject(errorMessage);
                    }
                });
                request.open('POST', './server.php');
                request.setRequestHeader('Content-Type', 'applicaion/json');
                
    
                request.send(JSON.stringify(body));
            });
        }
    };
    sendForm();
});