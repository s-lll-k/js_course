window.addEventListener('DOMContentLoaded', function () {
    const dayTime = document.querySelector('.day-time'),
        weekDay = document.querySelector('.week-day'),
        time = document.querySelector('.time'),
        goodNews = document.querySelector('.good-news');
    function doFirstCapital(str) {
        return str[0].toLocaleUpperCase() + str.slice(1);
    }
    function getDayWordEnd(num){
        if (num % 10 === 1) {
            return num + ' день';
        } else if (num % 10 >= 2 && num % 10 <= 4) {
            return num + ' дня';
        } else {
            return num + ' дней';
        }
    }
    function getTime() {
        let timeNow = new Date();
        let newYear = new Date(`January 1 ${timeNow.getFullYear() + 1}`).getTime();

        let daysBeforeNY = Math.floor((newYear - timeNow.getTime()) / 1000 / 60 / 60 / 24);

        goodNews.textContent = getDayWordEnd(daysBeforeNY);
        if (timeNow.getHours() < 12 && timeNow.getHours() >= 4) {
            dayTime.textContent = 'Доброе утро';
        } else if (timeNow.getHours() >= 12 && timeNow.getHours() <= 18) {
            dayTime.textContent = 'Добрый день';
        } else if(timeNow.getHours() > 18 && timeNow.getHours() <= 23){
            dayTime.textContent = 'Добрый вечер';
        } else {
            dayTime.textContent = 'Спокойной ночи';
        }
        weekDay.textContent = doFirstCapital(timeNow.toLocaleString('ru-RU', {weekday: 'long'}));
        time.textContent = timeNow.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true});
        setTimeout(getTime, 1000);
    }
    getTime();

});