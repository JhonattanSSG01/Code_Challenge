let accessKey = "4YDYB4jGe0iqE7PcMmM1hFG1DpvsyuBpGc2dWJR-PZk"; // Clave de acceso a la api
const form = document.getElementById("header__form");
const formInput = document.getElementById("header__form-input");
const fromGrid = document.getElementById("grid");

const moreImages = document.getElementById("more__btn");
const search = document.getElementById("search");

let page = 1;

changeView = () => {
  formInput.classList.toggle("noShow");
  formInput.classList.toggle("Show");
  if (formInput.classList.contains("Show")) {
    search.style.display = "none";
  } else {
    search.style.display = "block";
  }
}

// Petición para obtener las imagenes
loadImagesRandom = () => {
  let keyword = formInput.value;
  let apiUrl = `https://api.unsplash.com/search/photos/?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`; // Url de la api generadora de imagenes

  // Agregar o remover clase a un elemento
  let links = document.querySelectorAll(".option");

  for (let [i, li] of links.entries()) {
    li.addEventListener("click", () => {
      resetStatus();
      li.classList.add("active");
    });
  };

  resetStatus = () => (links.forEach((link) => link.classList.remove("active")));

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      viewImages(data.results);
    })
    .catch(error => {
      console.error("Error al obtener datos:", error);
    });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  changeView();
  loadImagesRandom();
});

moreImages.addEventListener("click", () => {
  page++;
  loadImagesRandom();
});


// Mostrar las imagenes generadas en el html creando la etiqueta img y agrgandola al padre del contenedor
viewImages = (images) => {
  const containerImages = document.getElementById("grid");
  let icons = document.querySelectorAll(".grid__icon");

  if (page === 1) {
    containerImages.innerHTML = ""; // Limpiar contenido anterior
  }

  images.map(image => {
    const imageElement = document.createElement("img");
    imageElement.src = image.urls.small;
    imageElement.alt = "Imagen api";
    imageElement.classList.add("grid__image");
    containerImages.appendChild(imageElement);
  });

  let imagesGrid = document.querySelectorAll(".grid__image");
  for (let [i, ic] of icons.entries()) {
    ic.addEventListener("click", () => {
      resetStatusIcons();
      ic.classList.add("grid__active");
      if (i === 0) {
        grid.style.gridTemplateColumns = "repeat(3,1fr)";
        for (let [i, im] of imagesGrid.entries()) {
          im.style.height = "100%";
          if (i === 1 || i === 3 || i === 5 || i === 7 || i === 8 || i === 9) {
            im.style.gridRowStart = "span 2";
          }
        };
      } else {
        grid.style.gridTemplateColumns = "850px";
        grid.style.gridTemplateRows = "auto";
        imagesGrid.forEach(image => {
          image.style.height = "250px";
          if (i === 1 || i === 3 || i === 5 || i === 7 || i === 8 || i === 9) {
            image.style.gridRowStart = "span 1";
          }
        });
      }
    });
  };
  resetStatusIcons = () => {
    icons.forEach((icon) => icon.classList.remove("grid__active"))
  };

}

function toggleMenu() {
  const menu = document.querySelector("#menu");
  menu.classList.toggle("show");
}
