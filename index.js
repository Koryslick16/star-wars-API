  
const actorsImages = [
    { image: "https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/1.jpg" },
    { image: "https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/2.jpg" },
    { image: "https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/3.jpg" },
    { image: "https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/4.jpg" },
    { image: "https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/5.jpg" },
    { image: "https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/6.jpg" },
    { image: "https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/7.jpg" },
    { image: "https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/8.jpg" },
    { image: "https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/9.jpg" },
    { image: "https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/10.jpg" }
];

document.addEventListener("DOMContentLoaded", () => {
    const displayActors = () => {
        fetch("https://swapi.dev/api/people")
            .then((response) => response.json())
            .then((data) => {
                let starDiv = document.getElementById("divStar");
                let actorsContent = "";

                // Construct HTML content for all actors
                data.results.forEach((item, index) => {
                    actorsContent += `
                        <img class="starImage" src="${actorsImages[index].image}" />
                        <h4 id="starName" class="name">${item.name}</h4>
                        <button class="view" data-name="${item.name}">View More</button>
                    `;
                });

                starDiv.innerHTML = actorsContent;

                const viewButtons = starDiv.querySelectorAll(".view");
                viewButtons.forEach((each) => {
                    each.addEventListener("click", () => {
                        const name = each.getAttribute("data-name");
                        addInfo(data, name);
                    });
                });
            });
    };

    const modal = document.getElementById("modalBox");
    const modalContent = document.querySelector(".addInfo");

    const addInfo = (data, chosenName) => {
        const actor = data.results.find((indiv) => indiv.name === chosenName);
        const actorIndex = data.results.indexOf(actor); 
        const actorImage = actorsImages[actorIndex]?.image; // Use optional chaining to handle undefined case

        if (actor) {
            modal.style.display = "flex";
            modal.style.alignItems = "center";
            modal.style.justifyContent = "center";

            modalContent.innerHTML = `
                <img src="${actorImage}" alt="${actor.name}" />
                <button class="close">&cross;</button>
                <div class="infoList">
                    <li style="font-weight: bolder;">${actor.name}</li>
                    <li>Gender: ${actor.gender}</li>
                    <li>Height: ${actor.height}m</li>
                </div>
            `;

            const closeButton = modalContent.querySelector(".close");
            closeButton.addEventListener("click", closeModal);
        }
    };

    const closeModal = () => {
        modal.style.display = "none";
    };

    displayActors();
});
