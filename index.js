


// function displayActors (){
//     fetch("https://swapi.dev/api/people")
//     .then((response) => response.json())
//     .then((data) => {
//         const starsDiv = document.getElementById("starsDiv");
//         data.results.forEach((item, index) => {
//             const stars = `
//         <div class="starsAct">
//         <div class="profile"><img src="starProfile.jpeg" alt="${item.name}" />
//         <div class="actor">${item.name}</div>
//         <button class="view" id="view" onclick="displayModal()"> View More </button>
//         </div>
//         `
//         starsDiv.innerHTML += stars;
//         });
//     })
// }

document.addEventListener("DOMContentLoaded", () => {
    const clickIcon = () => {
      const icon = document.getElementById("icon");
      const ulList = document.querySelector(".ul-name");
  
      icon.addEventListener("click", () => {
        if (!ulList) return; 

        ulList.classList.toggle("display");
        if (ulList.classList.contains("ul-name")) {
          displayActors();
        }
      });
    };
  
    const displayActors = () => {
      fetch("https://swapi.dev/api/people")
        .then((response) => response.json())
        .then((data) => {
          const starsDiv = document.getElementById("starsDiv");
          let listItems = "";
         
          data.results.forEach((item) => {
            listItems += `<li class="listSec" data-id="">${item.name}</li>`;
          });

          const ulList = document.querySelector(".ul-name");
          if (ulList) {
            ulList.innerHTML = listItems;
          }

          displayInfo();
        })
        .catch((error) => console.error("Error fetching data:", error));
    };

    const displayInfo = () => {
        const list = document.querySelectorAll(".listSec")
        list.forEach((item) => {
           item.addEventListener("click", () => {
           addInfo();
           })
        })
    
    }

    const addInfo = () => {
        fetch("https://swapi.dev/api/people")
        .then((response) => response.json())
        .then((data) => {
        let addItems = "";
        const addDiv = document.querySelector(".addInfo");
        data.results.forEach((indiv) => {
            addItems  += `
           <li>${indiv.name}</li>
           <li>${indiv.gender}</li>
           <li>${indiv.height}</li>
                `
        }) 
        addDiv.innerHTML = addItems;
    })
    }
  
    clickIcon();
  });
  