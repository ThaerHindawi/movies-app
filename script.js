const menu = document.getElementById('menu');
const icon = document.getElementById('icon');
const searchIcon = document.getElementById('search-icon');
const nav = document.querySelector('nav');
const search = document.querySelector('.search');

let clicks = false;

icon.addEventListener('click', (event) => {
    // menu.style.display = 'block';
    // event.preventDefault();
    // if(!clicks) {
    //     menu.style.display = 'block';
    //     clicks = true;
    // } else {
    //     menu.style.display = 'none';
    //     clicks = false;
    // }

    // menu.classList.toggle('hide');
    // menu.classList.toggle('show');

    const isOpened = menu.getAttribute('data-state') === 'opened';
    isOpened ? closeMenu() : openMenu();

});

function openMenu() {
    menu.setAttribute('data-state', 'opened');
}

function closeMenu() {
    menu.setAttribute('data-state', 'closing');
    
    menu.addEventListener('animationend', () => {
        menu.setAttribute('data-state', 'closed');

    }, {once: true});
}

searchIcon.addEventListener('click', () => {
    if(!search.classList.toggle('hide')) search.focus();
});