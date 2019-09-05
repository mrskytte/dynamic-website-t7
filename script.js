// Fetch data

//fetch("https://kea-alt-del.dk/t5/api/productids")
//    .then(e => e.json())
//    .then(function (ids) {
//        ids.forEach(showIds)
//    });
//
//function showIds(oneId) {
//    fetch("https://kea-alt-del.dk/t5/api/product?id=" + (oneId))

let starters = document.querySelector(".dataStarters");
let mains = document.querySelector(".dataMains");
let sides = document.querySelector(".dataSides");
let desserts = document.querySelector(".dataDesserts");
let drinks = document.querySelector(".dataDrinks");

fetch("https://kea-alt-del.dk/t5/api/productlist")
    .then(e => e.json())
    .then(e => e.forEach(showProducts)
    )

function showProducts(products) {

    console.log(products)

    const imageName = products.image;
    const base = "https://kea-alt-del.dk/t5/site/imgs/";
    const smallImg = base + "small/" + imageName + "-sm.jpg";
    const mediumImg = base + "medium/" + imageName + "-md.jpg";
    const largeImg = base + "large/" + imageName + ".jpg";

    const template = document.querySelector("template").content;
    const myCopy = template.cloneNode(true);
    myCopy.querySelector("article").setAttribute("id", products.id);
    myCopy.querySelector(".dataName").textContent = products.name;
    myCopy.querySelector(".dataPrice").textContent = products.price + " Kr";
    myCopy.querySelector(".dataShortTxt").textContent = products.shortdescription;
    if (products.discount) {
        myCopy.querySelector(".dataPrice").classList.add("discount");
        myCopy.querySelector(".dataDiscount").classList.toggle("hide");
        myCopy.querySelector(".dataDiscount").textContent = Math.round(products.price * ((100 - products.discount) / 100)) + " Kr";
    } else{
        myCopy.querySelector(".dataDiscount").remove();
    }
    if (products.soldout) {
        myCopy.querySelector("article").classList.add("soldout");
        myCopy.querySelector(".dataSoldoutlogo").classList.remove("hide");
    } else{
        myCopy.querySelector(".dataSoldoutlogo").remove();
    }
    myCopy.querySelector(".dataImg").setAttribute("src", smallImg);
    myCopy.querySelector(".dataImg").setAttribute("srcset", smallImg + ", " + largeImg);
    myCopy.querySelector(".dataImg").setAttribute("alt", "This is a picture of " + products.name);

    if (!products.vegetarian) {
        myCopy.querySelector(".dataVeggie").remove();
    }

    // Append Child to Correct Section

    if (products.category == "starter") {
        starters.appendChild(myCopy);
    }
    if (products.category == "main") {
        mains.appendChild(myCopy);
    }
    if (products.category == "sideorders") {
        sides.appendChild(myCopy);
    }
    if (products.category == "dessert") {
        desserts.appendChild(myCopy);
    }
    if (products.category == "drinks") {
        drinks.appendChild(myCopy);
    }



}