
let client_ID = "wH1pmlTaHlsyFukkKuFWOg-Rs4T3Zjjvn5c4S4loPYs"; // Clave de acceso a la api
let api_Url = `https://api.unsplash.com/photos/random?count=12&client_id=${client_ID}`; // Url de la api generadora de imagenes


// Petición para obtener las imagenes
loadImagesRandom = () => {

  // Agregar o remover clase a un elemento
  let links = document.querySelectorAll(".option");

  for (let [i, li] of links.entries()) {
    li.addEventListener("click", () => {
      resetStatus();
      li.classList.add("active");
    });
  };
  resetStatus = () => (links.forEach((link) => link.classList.remove("active")));

  fetch(api_Url)
    .then(response => response.json())
    .then(data => {
      viewImages(data);
    })
    .catch(error => {
      console.error('Error al obtener datos:', error);
    });
}

// Mostrar las imagenes generadas en el html creando la etiqueta img y agrgandola al padre del contenedor
viewImages = (images) => {
  const containerImages = document.getElementById('grid');
  containerImages.innerHTML = ''; // Limpiar contenido anterior

  images.forEach(image => {
    const imageElement = document.createElement('img');
    imageElement.src = image.urls.regular;
    imageElement.alt = 'Imagen api';
    imageElement.classList.add('grid__image');
    containerImages.appendChild(imageElement);
  });
}

function toggleMenu() {
  const menu = document.querySelector('#menu');
  menu.classList.toggle('show');
}

// Cargar imagenes al inicio
loadImagesRandom();