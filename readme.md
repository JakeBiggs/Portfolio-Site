

## Quickstart Guide

### install dependencies:

```
$ npm install
```

### run the app:

```
$ DEBUG=comp280-web:* npm start
```

### Dependencies & Accessibility:

Using Node-Express and MySQL-Apache for backend with handlebars and SCSS for front-end, as well as JQuery for some animations.

All my data for my jobs and projects are imported via JSON. I created my own custom JSON parser for this project which can be found at https://github.com/JakeBiggs/Custom-JSON-Parser or in the plugins section of this repository.

I am using MySQL and Apache for storing my user database users, and JWT for session handling. 
I am using XAMPP for running the MySQL & Apache.

Bootstrap has been used for some elements.

Originally, I was going to be using Next.js for my full stack but I decided on going for a more involved approach as I will get more into Next.js on further projects. 

#### Accessibility
I have included SCSS mixins that change the colour of text so that users will not have to strain their eyes. I am also using a colour palette that falls within the WCAG reccommended range. 

Furthermore, all my pages should scale correctly on different devices, so that you are able to access the site no matter what your screen size or browsing setup.

## References:

https://jquery.com/
https://www.mysql.com/
https://nodemon.io/
https://www.apachefriends.org/
https://jwt.io/
https://getbootstrap.com/
https://michalsnik.github.io/aos/ 

