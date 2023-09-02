const formularioPeliculas = document.getElementById("formulario");
const inputTitulo = document.getElementById("titulo");
const inputDirector = document.getElementById("director");
const inputGenero = document.getElementById("genero");
const listaPeliculas = document.getElementById("lista");
const selectGenero = document.getElementById("seleccionar-genero");
const selectDirector = document.getElementById("seleccionar-director");



//constante para peliculas almacenadas en localStorage
const peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];

//Clase peliculas
class Pelicula {
    constructor(titulo, director, genero) {
        this.titulo = titulo;
        this.director = director;
        this.genero = genero;
        this.vista = false;
    }
}
//agregar peliculas por input
formularioPeliculas.addEventListener("submit", (e) => {
    e.preventDefault();
    const titulo = inputTitulo.value;
    const director = inputDirector.value;
    const genero = inputGenero.value;
    //obliga a comentar los campos
    if (titulo && director && genero) {
        const nuevaPelicula = new Pelicula(titulo, director, genero);
        peliculas.push(nuevaPelicula);
        inputTitulo.value = "";
        inputDirector.value = "";
        inputGenero.value = "";
        actualizarListas();
        // Guardar peliculas en localStorage
        localStorage.setItem("peliculas", JSON.stringify(peliculas));
        //Sweet alert pelicula agregada
        Swal.fire({
            icon: 'success',
            title: 'Pelicula Agregada',
            text: 'La pelicula se ha agregado con exito a la lista.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        });
    }
});
//funcion para actualizar las peliculas 
function actualizarListas() {
    listaPeliculas.innerHTML = "";
    selectGenero.innerHTML = '<option value="">Todos</option>';
    selectDirector.innerHTML = '<option value="">Todos</option>';
    //funcion para recorrer la lista de peliculas con titulo, directo, genero y si fue vista o no
    peliculas.forEach((pelicula, index) => {
        const listItem = document.createElement("li");
        listItem.classList.add("mt-2", "border", "borde-2", "p-3", "shadow", "shadow-md")
        listItem.textContent = `Titulo: ${pelicula.titulo},\n Director: ${pelicula.director},\n Genero: ${pelicula.genero},\n Vista: ${pelicula.vista ? 'Si' : 'No'} \n`;
        //funcion y boton para marcar las peliculas como vistas
        const marcarVistaButton = document.createElement("button");
        marcarVistaButton.classList.add("btn", "btn-success","btn-sm", "me-md-2")
        marcarVistaButton.innerHTML = "Marcar como vista";
        marcarVistaButton.addEventListener("click", () => {
            pelicula.vista = true;
            actualizarListas();
            // Actualizar peliculas en localStorage
            localStorage.setItem("peliculas", JSON.stringify(peliculas));
            Swal.fire({
                icon: 'success',
                title: 'Pelicula marcada como vista!',
                text: 'La pelicula ya se marco como vista',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            });
        });
        //funcion  y boton para eliminar peliculas
        const eliminarButton = document.createElement("button");
        eliminarButton.classList.add("btn", "btn-danger", "btn-sm",  "me-md-2")
        eliminarButton.innerHTML = "Eliminar";
        eliminarButton.addEventListener("click", () => {
            //sweet alert pregunta la confirmacion de eliminar pelicula o cancelar
            Swal.fire({
                title: 'Estas seguro?',
                text: "No podras revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, deseo eliminarla'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Si el usuario confirma, elimina la película
                    peliculas.splice(index, 1);
                    actualizarListas();
                    // Actualiza películas en localStorage
                    localStorage.setItem("peliculas", JSON.stringify(peliculas));
                    Swal.fire(
                        'Eliminada!',
                        'La pelicula ha sido eliminada.',
                        'success'
                    );
                }
            });
        });
        //llamo a las funciones
        listItem.appendChild(marcarVistaButton);
        listItem.appendChild(eliminarButton);

        listaPeliculas.appendChild(listItem);

        if (!selectGenero.querySelector(`option[value="${pelicula.genero}"]`)) {
            const optionGenero = document.createElement("option");
            optionGenero.value = pelicula.genero;
            optionGenero.textContent = pelicula.genero;
            selectGenero.appendChild(optionGenero);
        }

        if (!selectDirector.querySelector(`option[value="${pelicula.director}"]`)) {
            const optionDirector = document.createElement("option");
            optionDirector.value = pelicula.director;
            optionDirector.textContent = pelicula.director;
            selectDirector.appendChild(optionDirector);
        }
    });
}

selectGenero.addEventListener("change", () => {
    const selectedGenero = selectGenero.value;
    if (selectedGenero) {
        const filteredPeliculas = peliculas.filter((pelicula) => pelicula.genero === selectedGenero);
        mostrarPeliculasFiltradas(filteredPeliculas);
    } else {
        mostrarPeliculasFiltradas(peliculas);
    }
});

selectDirector.addEventListener("change", () => {
    const selectedDirector = selectDirector.value;
    if (selectedDirector) {
        const filteredPeliculas = peliculas.filter((pelicula) => pelicula.director === selectedDirector);
        mostrarPeliculasFiltradas(filteredPeliculas);
    } else {
        mostrarPeliculasFiltradas(peliculas);
    }
});
//funcion para mostrar las peliculas filtradas
function mostrarPeliculasFiltradas(peliculasFiltradas) {
    listaPeliculas.innerHTML = "";
    peliculasFiltradas.forEach((pelicula, index) => {
        const listItem = document.createElement("li");
        listItem.classList.add("mt-2", "border", "borde-2", "p-3", "shadow", "shadow-md")
        listItem.textContent = `Titulo: ${pelicula.titulo},\n Director: ${pelicula.director},\n Genero: ${pelicula.genero},\n Vista: ${pelicula.vista ? 'Si' : 'No'} \n`;
        //funcion y boton para las peliculas una vez filtradas
        const marcarVistaButton = document.createElement("button");
        marcarVistaButton.classList.add("btn", "btn-success", "btn-sm",  "me-md-2")
        marcarVistaButton.innerHTML = "Marcar como vista";
        marcarVistaButton.addEventListener("click", () => {
            pelicula.vista = true;
            actualizarListas();
            // Actualizar peliculas en localStorage
            localStorage.setItem("peliculas", JSON.stringify(peliculas));
            Swal.fire({
                icon: 'success',
                title: 'Pelicula marcada como vista!',
                text: 'La pelicula ya se marco como vista',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            });
        });
        //funcion y boton para las peliculas una vez filtradas
        const eliminarButton = document.createElement("button");
        eliminarButton.classList.add("btn", "btn-danger", "btn-sm",  "me-md-2")
        eliminarButton.innerHTML = "Eliminar";
        eliminarButton.addEventListener("click", () => {
            Swal.fire({
                title: 'Estas seguro?',
                text: "No podras revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, deseo eliminar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Si el usuario confirma, elimina la película
                    peliculas.splice(index, 1);
                    actualizarListas();
                    // Actualiza peliculas en localStorage
                    localStorage.setItem("peliculas", JSON.stringify(peliculas));
                    Swal.fire(
                        'Eliminada!',
                        'La película ha sido eliminada.',
                        'success'
                    );
                }
            });
        });


        listItem.appendChild(marcarVistaButton);
        listItem.appendChild(eliminarButton);
        

        listaPeliculas.appendChild(listItem);
    });
}
//funcion para cargar los datos a trves de fetch
function cargarJSON() {
    fetch("./db/peliculas.json")
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            // combina los datos del archivo JSON con los datos existente
            const peliculasJSON = data.map((pelicula) => new Pelicula(pelicula.titulo, pelicula.director, pelicula.genero));

            // agrega las nuevas películas al arreglo existente
            peliculas.push(...peliculasJSON);

            // actualiza la lista en el navegador
            actualizarListas();
        });
}

// Llama a cargarJSON al cargar la página para obtener datos iniciales desde el archivo JSON
cargarJSON();
//llamo a la funcion de la lista de peliculas actualizadas
actualizarListas();