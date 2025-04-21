// Menu javascript
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navbarLinks = document.querySelector('.navbar-links');

hamburgerMenu.addEventListener("click",()=>{
    navbarLinks.classList.toggle('show');
    hamburgerMenu.classList.toggle('active');
});

// slider Javascript
let slideIndex = 0;
function showSlides() {
    const slides = document.getElementsByClassName("mySlides");
    for(let i = 0; i< slides.length;i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides,4000);
}

document.addEventListener("DOMContentLoaded",()=>{
    showSlides();
});

function changeSlide(n) {
    slideIndex += n;
    const slides = document.getElementsByClassName("mySlides");
    if(slideIndex > slides.length) {
        slideIndex = 1;
    }
    if(slideIndex < 1) {
        slideIndex = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}


// time and day javascript
function updateDateTime() {
    const now = new Date();
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const dayName = days[now.getDay()];
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    const greeting =
    now.getHours() < 12
    ? "Good Morning!"
    : now.getHours() < 18
    ? "Good Afternoon!"
    : "Good Evening!";
    const infoMessage = 
        "Keep track of your bus schedule easily with OnTimeRoutes.";
    const dateTimeString = `<h3>${greeting}</h3>
                            <p>Today is ${dayName}, ${date}.</p>
                           <p>Current Time: ${time}</p>
                           <p>${infoMessage}</p>`;
    
    document.getElementById("datetime").innerHTML = dateTimeString;
}

setInterval(updateDateTime,1000);
updateDateTime();
