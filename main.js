document.querySelector('.adv').remove();

const book = document.querySelectorAll('.book'); 
const books = document.querySelector('.books');
const secondBook = book[0].querySelectorAll('ul > li');
const fifthBook = book[5].querySelectorAll('ul > li');
const sixthBook = book[2].querySelectorAll('ul > li');

const newChapter = document.createElement('li');
newChapter.textContent = 'Глава 8: За пределами ES6';


book[1].after(book[0]);
book[0].after(book[4]);
books.append(book[2]);

document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

book[4].querySelector('h2 a').textContent = 'Книга 3. this и Прототипы Объектов';

secondBook[3].after(secondBook[6]);
secondBook[6].after(secondBook[8]);
secondBook[10].before(secondBook[2]);

fifthBook[1].after(fifthBook[9]);
fifthBook[4].after(fifthBook[2]);
fifthBook[8].before(fifthBook[5]);

sixthBook[8].after(newChapter);
