const formulario = document.getElementById("formulario");
const contenedor = document.getElementById("entradas");

let entradas = JSON.parse(localStorage.getItem("diario")) || [];

function guardarLocal() {
    localStorage.setItem("diario", JSON.stringify(entradas));
}



function setCookie(nombre, valor, dias) {

    const fecha = new Date();

    fecha.setTime(
        fecha.getTime() + (dias * 24 * 60 * 60 * 1000)
    );

    const expiracion = "expires=" + fecha.toUTCString();

    document.cookie =
        nombre + "=" + valor + ";" +
        expiracion + ";path=/";
}


function getCookie(nombre) {

    const n = nombre + "=";

    const cookies = document.cookie.split(";");

    for(let c of cookies) {

        c = c.trim();

        if(c.indexOf(n) === 0) {
            return c.substring(n.length);
        }
    }

    return "";
}

function mostrarEntradas() {
    contenedor.innerHTML = "";
    entradas.forEach(e => {
        const div = document.createElement("div");
        div.className = "entrada";
        div.innerHTML = `<h3>${e.titulo}</h3>
                         <strong>${e.tipo}</strong>
                         <pre>${e.contenido}</pre>`;
        contenedor.appendChild(div);
    });
}

formulario.addEventListener("submit", e => {
    e.preventDefault();

    const entrada = {
        titulo: document.getElementById("titulo").value,
        tipo: document.getElementById("tipo").value,
        contenido: document.getElementById("contenido").value
    };

    entradas.push(entrada);
    guardarLocal();
    mostrarEntradas();
    formulario.reset();
});

function cambiarTema(tema) {
    const root = document.documentElement;

    if (tema === "oscuro") {
        root.style.setProperty('--fondo', '#0d1117');
        root.style.setProperty('--panel', '#161b22');
        root.style.setProperty('--texto', '#e6edf3');
        root.style.setProperty('--acento', '#00ffcc');
    }
    if (tema === "neon") {
        root.style.setProperty('--fondo', '#050510');
        root.style.setProperty('--panel', '#0d0d1a');
        root.style.setProperty('--texto', '#ffffff');
        root.style.setProperty('--acento', '#00bfff');
    }
    if (tema === "claro") {
        root.style.setProperty('--fondo', '#f0f2f5');
        root.style.setProperty('--panel', '#ffffff');
        root.style.setProperty('--texto', '#111');
        root.style.setProperty('--acento', '#007acc');
    }
}

mostrarEntradas();

