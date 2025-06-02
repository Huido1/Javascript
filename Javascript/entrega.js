const FACTORES = {
    temperatura: {
        opciones: ["Celsius a Kelvin", "Kelvin a Celsius"],
        formulas: {
        "Celsius a Kelvin": (v) => v + 273.15,
        "Kelvin a Celsius": (v) => v - 273.15,
        },
        unidadFinal: {
        "Celsius a Kelvin": "K",
        "Kelvin a Celsius": "°C",
        },
    },
    distancia: {
        opciones: ["Metros a Pies", "Pies a Metros"],
        formulas: {
        "Metros a Pies": (v) => v * 3.28084,
        "Pies a Metros": (v) => v / 3.28084,
        },
        unidadFinal: {
        "Metros a Pies": "ft",
        "Pies a Metros": "m",
        },
    },
    volumen: {
        opciones: ["Litros a Galones", "Galones a Litros"],
        formulas: {
        "Litros a Galones": (v) => v * 0.264172,
        "Galones a Litros": (v) => v / 0.264172,
        },
        unidadFinal: {
        "Litros a Galones": "gal",
        "Galones a Litros": "l",
        },
    },
    masa: {
        opciones: ["Kilos a Libras", "Libras a Kilos"],
        formulas: {
        "Kilos a Libras": (v) => v * 2.20462,
        "Libras a Kilos": (v) => v / 2.20462,
        },
        unidadFinal: {
        "Kilos a Libras": "lb",
        "Libras a Kilos": "kg",
        },
    },
    };


const tipo = document.getElementById("tipo");
const unidad = document.getElementById("unidad");
const valor = document.getElementById("valor");
const form = document.getElementById("form-conversion");
const resultado = document.getElementById("resultado");
const historialLista = document.getElementById("historial");


    tipo.addEventListener("change", () => {
    unidad.innerHTML = "";
    FACTORES[tipo.value].opciones.forEach((opcion) => {
        const opt = document.createElement("option");
        opt.value = opcion;
        opt.textContent = opcion;
        unidad.appendChild(opt);
    });
    });


tipo.dispatchEvent(new Event("change"));


    form.addEventListener("submit", (e) => {
    e.preventDefault();
    const categoria = tipo.value;
    const conversionElegida = unidad.value;
    const numero = parseFloat(valor.value);

    if (isNaN(numero)) {
        resultado.textContent = "Por favor, ingresá un número válido.";
        return;
    }

    const resultadoFinal = FACTORES[categoria].formulas[conversionElegida](numero);
    const unidadDestino = FACTORES[categoria].unidadFinal[conversionElegida];

    resultado.textContent = `${numero} convertido con "${conversionElegida}" es ${resultadoFinal.toFixed(2)} ${unidadDestino}`;

    guardarEnHistorial({
        tipo: categoria,
        conversion: conversionElegida,
        valorOriginal: numero,
        resultado: resultadoFinal.toFixed(2),
        unidadDestino,
    });

    mostrarHistorial();
    });


    function guardarEnHistorial(entry) {
    const historial = JSON.parse(localStorage.getItem("conversiones")) || [];
    historial.push(entry);
    localStorage.setItem("conversiones", JSON.stringify(historial));
    }


    function mostrarHistorial() {
    historialLista.innerHTML = "";
    const historial = JSON.parse(localStorage.getItem("conversiones")) || [];
    historial.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.valorOriginal} → ${item.resultado} ${item.unidadDestino} (${item.conversion})`;
        historialLista.appendChild(li);
    });
    }


mostrarHistorial();