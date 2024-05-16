document.addEventListener('DOMContentLoaded', (event) => {
    const dropdown = document.querySelector('.dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    dropdown.addEventListener('mouseover', () => {
        dropdownMenu.style.display = 'block';
    });

    dropdown.addEventListener('mouseout', () => {
        dropdownMenu.style.display = 'none';
    });
});

function scrollToElement() {
    document.getElementById('targetElement').scrollIntoView({ behavior: 'smooth' });
}