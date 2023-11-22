//Select DOM Items

document.addEventListener("DOMContentLoaded", function () {


///MENU CODE

    //Assigns Elements to variables using document query selector (class IDs)
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu');
    const menuNav = document.querySelector('.menu-nav');
    const menuBranding = document.querySelector('.menu-branding');
    const navItems = document.querySelectorAll(".nav-item")
    const themeBtn = document.querySelector('.theme-button');

    //Set Initial Sate of Menu
    let showMenu = false;
    menuBtn.addEventListener("click", toggleMenu);
    themeBtn.addEventListener("click", toggleTheme);


    function toggleMenu() {
        //Toggles each element of menu
        menuBtn.classList.toggle("close");
        menu.classList.toggle("show");
        menuNav.classList.toggle("show");
        menuBranding.classList.toggle("show");

        navItems.forEach(item => item.classList.toggle("show"));

    }

    function toggleTheme() {
        const themeIcon = document.getElementById('theme-icon');
        const body = document.body;

        if (body.classList.contains('dark-mode')) {
          body.classList.remove('dark-mode');
          themeIcon.classList.remove('fa-moon');
          themeIcon.classList.add('fa-sun');
        } else {
          body.classList.add('dark-mode');
          themeIcon.classList.remove('fa-sun');
          themeIcon.classList.add('fa-moon');
        }
      }

});