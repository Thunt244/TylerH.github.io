/*
    Gallery Script for The Breakfast Embassy
    Tyler Hunt
    04/19/26
*/

// Array of gallery items 
const galleryItems = [
    {
        title: "French Room",
        image: "images/french-room.jpg",
        description: "Romantic French-themed room with elegant decor and balcony view"
    },
    {
        title: "Russian Room",
        image: "images/russian-room.jpg",
        description: "Cozy Russian decor featuring traditional Blini breakfast"
    },
    {
        title: "German Room",
        image: "images/german-room.jpg",
        description: "Bavarian style room with Weisswurst and hearty breakfast"
    },
    {
        title: "American Room",
        image: "images/american-room.jpg",
        description: "Classic American cowboy theme with Biscuits & Gravy"
    },
    {
        title: "Beef Bourguignon",
        image: "images/bourguignon.jpg",
        description: "Tender beef slow-cooked in Burgundy wine with carrots, mushrooms, and herbs, served with crusty baguette"
    },
    {
        title: "Beef Stroganoff",
        image: "images/stroganoff.jpg",
        description: "Classic Russian Beef Stroganoff with fresh herbs"
    },
    {
        title: "Crêpes Two Ways",
        image: "images/crepe.jpg",
        description: "One savory (ham & Gruyère) and one sweet (Nutella & banana) from the French menu"
    },
    {
        title: "Classic Beef Borsch Dinner",
        image: "images/borsch.jpg",
        description: "Rich beet soup with tender beef, cabbage, potatoes, and dill — served with rye bread and sour cream"
    },
    {
        title: "Osso Buco alla Milanese",
        image: "images/osso.jpg",
        description: "Braised veal shank with saffron risotto and gremolata"
    },
    {
        title: "Schweinhaxe (Crispy Pork Knuckle)",
        image: "images/schweinhaxe.jpg",
        description: "Oven-roasted pork shank with crackling skin, sauerkraut, mashed potatoes, and dark beer gravy"
    }
];

let currentSlide = 0;
let autoPlayInterval;
// creating slides for the slides... lol
function createSlides() {
    const container = document.getElementById("slideshow");
    container.innerHTML = "";

    galleryItems.forEach((item, index) => {
        const slide = document.createElement("div");
        slide.className = `slide ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `
            <div class="gallery-card">
                <img src="${item.image}" alt="${item.title}" class="gallery-image">
                <div class="card-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </div>
        `;
        container.appendChild(slide);
    });
}
// showing said slides 
function showSlide(index) {
    const slides = document.querySelectorAll(".slide");
    
    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;

    slides.forEach(slide => slide.classList.remove("active"));
    slides[currentSlide].classList.add("active");
}
/* Adding the buttons for next and last and what not */

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
}

function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 7000);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}
// the actual sliding of the show
function initSlideshow() {
    createSlides();

    document.getElementById("prevBtn").addEventListener("click", () => {
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
    });

    document.getElementById("nextBtn").addEventListener("click", () => {
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
    });

    const slideshow = document.getElementById("slideshow");
    slideshow.addEventListener("mouseenter", stopAutoPlay);
    slideshow.addEventListener("mouseleave", startAutoPlay);

    startAutoPlay();
}
// running said show
initSlideshow();