let mainNav = document.getElementById("js-menu");
let navBarToggle = document.getElementById("js-navbar-toggle");

navBarToggle.addEventListener("click", function() {
  mainNav.classList.toggle("active");
});

let current_page = document.getElementsByTagName("a")

for (i = 0; i < current_page.length; i++) {
    console.log(current_page[i].href)
    var x = current_page[i].href.includes("#");
    if(x){
        current_page[i].classList.add("current-page");
    }
}

let myLink = "http://digitalkenga.com/wp3/wp-json/wp/v2/";
const template = document.querySelector("template").content;
const parent = document.querySelector("div.event-list");
const urlParms = new URLSearchParams(window.location.search);
const catID = urlParms.get("cat");
const catnav = document.querySelector(".navcat");


function loadData(link) {
    console.log(link + "instapost?per_page=20&_embed");
    fetch(link + "instapost?per_page=20&_embed").then(e => e.json()).then(data => show(data));
}

function show(data) {
    data.forEach(object => {
        const clone = template.cloneNode(true);
        clone.querySelector("a").href = "details.html?eventID=" + object.id;
        clone.querySelector("a.detail-btn").textContent = object.external_link.rendered;
        clone.querySelector("img.thumbnail").src = object._embedded["wp:featuredmedia"][0].source_url;
        parent.appendChild(clone);

    });
}



function loadCats() {
    fetch(myLink + "categories?per_page=20").then(e => e.json()).then(buildCatMenu);
}

function loadByCat(cat) {
    fetch(myLink + "instapost?categories=" + cat + "&per_page=20&_embed").then(e => e.json()).then(show);
}

function loadAll() {
    fetch(myLink + "instapost?per_page=20&_embed").then(e => e.json()).then(show);
}

loadCats();

if (catID) {
    loadByCat(catID)
} else {
    loadAll()
}

function buildCatMenu(data) {
    data.forEach(cat => {
        const newBTN = document.createElement("button");
        const newA = document.createElement("a");
        newA.textContent = cat.name;

        newA.href = "?cat=" + cat.id;
        newBTN.appendChild(newA);
        catnav.appendChild(newBTN);
    })
}