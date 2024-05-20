document.addEventListener('DOMContentLoaded', (event) => {
    const dropdown = document.querySelector('.dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    dropdown.addEventListener('mouseover', () => {
        dropdownMenu.style.display = 'block';
    });

    dropdown.addEventListener('mouseout', () => {
        dropdownMenu.style.display = 'none';
    });

    const subscribeButton = document.getElementById('headerSubscribe');
    if (subscribeButton) {
        subscribeButton.addEventListener('click', (event) => {
            event.preventDefault();
            const footerContent = document.getElementById('footer-content');
            if (footerContent) {
                footerContent.scrollIntoView({ behavior: 'smooth' });
            } else {
                console.error('Footer content not found');
            }
        });
    } else {
        console.error('Subscribe button not found');
    }
});

function scrollToElement() {
    const targetElement = document.getElementById('targetElement');
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.error('Target element not found');
    }
}