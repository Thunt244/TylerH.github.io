/*
            script for reviews page 
    author:     Tyler Hunt
    date started: 04/11/26
*/

let reviewers = [
    "Sophia Rivera",
    "Liam Thompson",
    "Ava Patel",
    "Noah Kim",
    "Mia Johnson",
    "Ethan Wong",
    "Harper Lopez"
];

let stars = [5, 5, 5, 4, 5, 3, 3];

let reviewDates = [
    "03/28/2026",
    "02/18/2026",
    "04/02/2026",
    "03/12/2026",
    "01/30/2026",
    "03/20/2026",
    "02/25/2026"
];

let reviews = [
    "Absolutely loved our stay in the French room! The Crêpes Two Ways and Classic French Breakfast were heavenly. The room decor was so charming and romantic. Best B&B experience ever!",
    "The Italian room was perfect. Woke up to fresh Cornetto & Cappuccino — felt like we were in Tuscany. Dinner was amazing too, the Chicken Parmigiana was spot on. Highly recommend!",
    "Stayed in the Russian-themed room and it was magical. The Traditional Blini Breakfast and Beef Stroganoff for dinner were incredible. Everything felt authentic and cozy. Five stars!",
    "German room was really nice and the Weisswurst Frühstück was tasty. Sauerbraten dinner was solid too. Only small complaint is the portions were a bit small for the price, but overall a great stay.",
    "The American room felt like home but elevated! Biscuits & Gravy Deluxe and the Cowboy Ribeye were fantastic. Super clean, friendly staff, and the themed experience is unique. We’ll be back!",
    "The place is cute and the food is fine (tried the German Farmers Breakfast), but the prices are absurdly overpriced for what you get. A simple get away like this shouldn’t cost that much. Would only return if they lower the rates.",
    "Stayed in the Russian room. The Blini Breakfast was good, but the Syrniki was just odd. Cool concept, but the overall experience felt a little overhyped and overpriced."
];

let reviewTitles = [
    "French Royalty",
    "Beautifully Italian",
    "A True Russian Queen",
    "Germany's Competition",
    "American Antiques",
    "TOO EXPENSIVE",
    "Decent But Overhyped"
];

function starImages(rating) {
    let imageText = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            imageText += "<img src='images/star.png' alt='filled star' class='star'>";
        } 
    }
    return imageText;
}

// Clear the article first (in case script runs multiple times)
document.querySelector("article").innerHTML = "";

// Generate the review tables
for (let i = 0; i < reviewers.length; i++) {
    let reviewCode = `
        <table class="review-table">
            <caption>${reviewTitles[i]}</caption>
            <tr>
                <th>By</th>
                <td>${reviewers[i]}</td>
            </tr>
            <tr>
                <th>Review Date</th>
                <td>${reviewDates[i]}</td>
            </tr>
            <tr>
                <th>Rating</th>
                <td>${starImages(stars[i])}</td>
            </tr>
            <tr>
                <td colspan="2" class="review-text">${reviews[i]}</td>
            </tr>
        </table>
    `;

   document.getElementsByTagName("article")[0].insertAdjacentHTML("beforeend", reviewCode);
}