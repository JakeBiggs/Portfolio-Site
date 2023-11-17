//Select DOM Items

document.addEventListener("DOMContentLoaded", function () {


///MENU CODE

    //Assigns Elements to variables using document query selector (class IDs)
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu');
    const menuNav = document.querySelector('.menu-nav');
    const menuBranding = document.querySelector('.menu-branding');
    const navItems = document.querySelectorAll(".nav-item")

    //Set Initial Sate of Menu
    let showMenu = false;
    menuBtn.addEventListener("click", toggleMenu);

    function toggleMenu() {
        //Toggles each element of menu
        menuBtn.classList.toggle("close");
        menu.classList.toggle("show");
        menuNav.classList.toggle("show");
        menuBranding.classList.toggle("show");

        navItems.forEach(item => item.classList.toggle("show"));

    }

});