let starters = document.querySelector(".dataStarters");
let mains = document.querySelector(".dataMains");
let sides = document.querySelector(".dataSides");
let desserts = document.querySelector(".dataDesserts");
let drinks = document.querySelector(".dataDrinks");

let modalBackground = document.querySelector(".modalbackground");
let modal = document.querySelector(".modal");

modalBackground.addEventListener("click", () => {
    modalBackground.classList.add("hide");
    modal.querySelector(".starone").classList.remove("hide")
    modal.querySelector(".startwo").classList.remove("hide")
    modal.querySelector(".starthree").classList.remove("hide")
    modal.querySelector(".starfour").classList.remove("hide")
    modal.querySelector(".starfive").classList.remove("hide")
    modal.querySelector(".dataLactose").classList.remove("hide")
    modal.querySelector(".dataNuts").classList.remove("hide")
    modal.querySelector(".dataPotato").classList.remove("hide")
    modal.querySelector(".dataAlcohol").classList.remove("hide")
})

fetch("https://kea-alt-del.dk/t5/api/productlist")
    .then(e => e.json())
    .then(e => e.forEach(showProducts))

function showProducts(product) {

    const imageName = product.image;
    const base = "https://kea-alt-del.dk/t5/site/imgs/";
    const smallImg = base + "small/" + imageName + "-sm.jpg";
    const mediumImg = base + "medium/" + imageName + "-md.jpg";
    const largeImg = base + "large/" + imageName + ".jpg";

    const template = document.querySelector("template").content;
    const myCopy = template.cloneNode(true);
    myCopy.querySelector(".dataName").textContent = product.name;
    myCopy.querySelector(".dataPrice").textContent = product.price + " Kr";
    myCopy.querySelector(".dataShortTxt").textContent = product.shortdescription;
    if (product.discount) {
        myCopy.querySelector(".dataPrice").classList.add("discount");
        myCopy.querySelector(".dataDiscount").classList.toggle("hide");
        myCopy.querySelector(".dataDiscount").textContent = Math.round(product.price * ((100 - product.discount) / 100)) + " Kr";
    } else {
        myCopy.querySelector(".dataDiscount").remove();
    }
    if (product.soldout) {
        myCopy.querySelector("article").classList.add("soldout");
        myCopy.querySelector(".dataSoldoutlogo").classList.remove("hide");
    } else {
        myCopy.querySelector(".dataSoldoutlogo").remove();
    }
    myCopy.querySelector(".dataImg").setAttribute("src", smallImg);
    myCopy.querySelector(".dataImg").setAttribute("srcset", smallImg + ", " + largeImg);
    myCopy.querySelector(".dataImg").setAttribute("alt", "This is a picture of " + product.name);

    if (!product.vegetarian) {
        myCopy.querySelector(".dataVeggie").remove();
    }
    myCopy.querySelector("button").addEventListener("click", () => {
        fetch("https://kea-alt-del.dk/t5/api/product?id=" + product.id).then(e => e.json())
            .then(showDetails)
    })

    // Append Child to Correct Section (^Add all myCopy Content Above^)

    if (product.category == "starter") {
        starters.appendChild(myCopy);
    }
    if (product.category == "main") {
        mains.appendChild(myCopy);
    }
    if (product.category == "sideorders") {
        sides.appendChild(myCopy);
    }
    if (product.category == "dessert") {
        desserts.appendChild(myCopy);
    }
    if (product.category == "drinks") {
        drinks.appendChild(myCopy);
    }
}

function showDetails(data) {

    const imageName = data.image;
    const base = "https://kea-alt-del.dk/t5/site/imgs/";
    const smallImg = base + "small/" + imageName + "-sm.jpg";
    const mediumImg = base + "medium/" + imageName + "-md.jpg";
    const largeImg = base + "large/" + imageName + ".jpg";


    modal.querySelector(".dataLongTxt").textContent = data.longdescription;
    modal.querySelector(".dataName").textContent = data.name;
    modal.querySelector(".dataRegion").textContent = "Region: " + data.region;
    modal.querySelector(".dataImg").setAttribute("src", smallImg);
    modal.querySelector(".dataImg").setAttribute("srcset", smallImg + ", " + largeImg);
    modal.querySelector(".dataImg").setAttribute("alt", "This is a picture of " + data.name);
    if (data.discount) {
        modal.querySelector(".dataPrice").classList.add("discount");
        modal.querySelector(".dataDiscount").textContent = Math.round(data.price * ((100 - data.discount) / 100)) + " Kr";
    } else {
        modal.querySelector(".dataDiscount").classList.add("hide");
    }
    if (!data.vegetarian) {
        modal.querySelector(".dataVeggie").classList.add("hide")
    }

    const allergens = data.allergens;

    if (allergens != "laktose") {
        modal.querySelector(".dataLactose").classList.add("hide")
    }
    if (allergens != "nødder") {
        modal.querySelector(".dataNuts").classList.add("hide")
    }
    if (allergens != "kartofler") {
        modal.querySelector(".dataPotato").classList.add("hide")
    }
    if (allergens != "alcohol") {
        modal.querySelector(".dataAlcohol").classList.add("hide")
    }

    if (data.stars == 0) {
        modal.querySelector(".starone").classList.add("hide")
        modal.querySelector(".startwo").classList.add("hide")
        modal.querySelector(".starthree").classList.add("hide")
        modal.querySelector(".starfour").classList.add("hide")
        modal.querySelector(".starfive").classList.add("hide")
    }

    if (data.stars == 1) {
        modal.querySelector(".starone").classList.add("hide")
        modal.querySelector(".startwo").classList.add("hide")
        modal.querySelector(".starthree").classList.add("hide")
        modal.querySelector(".starfour").classList.add("hide")
    }

    if (data.stars == 2) {
        modal.querySelector(".starone").classList.add("hide")
        modal.querySelector(".startwo").classList.add("hide")
        modal.querySelector(".starthree").classList.add("hide")
    }

    if (data.stars == 3) {
        modal.querySelector(".starone").classList.add("hide")
        modal.querySelector(".startwo").classList.add("hide")
    }

    if (data.stars == 4) {
        modal.querySelector(".starone").classList.add("hide")
    }

    modalBackground.classList.remove("hide");
}
