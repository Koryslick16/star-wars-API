
document.addEventListener("DOMContentLoaded", () => {
    const clickIcon = () => {
      const icon = document.getElementById("icon");
      const ulList = document.querySelector(".ul-name");
  
      // Initialize the icon with the down arrow
      icon.innerHTML = `<i class="bi bi-caret-down-fill"></i>`;
  
      icon.addEventListener("click", () => {
        if (!ulList) return;
  
        ulList.classList.toggle("display");
  
        if (ulList.classList.contains("display")) {
          displayActors();
          icon.innerHTML = `<i class="bi bi-caret-up-fill"></i>`;
        } else {
          icon.innerHTML = `<i class="bi bi-caret-down-fill"></i>`;
        }
      });
    };
  
    const displayActors = () => {
      fetch("https://swapi.dev/api/people")
        .then((response) => response.json())
        .then((data) => {
          const ulList = document.querySelector(".ul-name");
          let listItems = "";
  
          data.results.forEach((item) => {
            listItems += `<li class="listSec" id="">${item.name}</li>`;
          });
  
          if (ulList) {
            ulList.innerHTML = listItems;
            displayInfo(data);
          }
        })
        .catch((error) => console.error("Error fetching data:", error));
    };
  
    const displayInfo = (data) => {
      const list = document.querySelectorAll(".listSec");
      list.forEach((item) => {
        item.addEventListener("click", () => {
            const chosenName = item.textContent;
          addInfo(data, chosenName); 
        });
      });
    };
  
    const addInfo = (data, chosenName) => {
      let addItems = "";
      const addDiv = document.querySelector(".addInfo");
  
      const actor = data.results.find((indiv) => indiv.name === chosenName);
      if(actor) {
        addItems += `
        <img src="starProfile.jpeg" alt="${actor.name}"/>
          <div class="infoList">
          <li style="font-weight: bolder;">${actor.name}</li>
          <li>Gender: ${actor.gender}</li>
          <li>Height: ${actor.height}m</li>
          </div>
        `;
    }
    addDiv.innerHTML = addItems;
      };
  
    clickIcon();
  });
  