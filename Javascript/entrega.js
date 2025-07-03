    document.addEventListener("DOMContentLoaded", initApp);

    async function initApp() {
    const tipoEl = document.getElementById("tipo");
    const unidadEl = document.getElementById("unidad");
    const valorEl = document.getElementById("valor");
    const formEl = document.getElementById("form-conversion");
    const resultadoEl = document.getElementById("resultado");
    const historialEl = document.getElementById("historial");

    const datos = await fetch("javascript/datos.json").then(res => res.json());

    Object.keys(datos).forEach(tipo => {
        const opt = document.createElement("option");
        opt.value = tipo;
        opt.textContent = tipo.charAt(0).toUpperCase() + tipo.slice(1);
        tipoEl.appendChild(opt);
    });

    tipoEl.addEventListener("change", () => {
        unidadEl.innerHTML = "";
        datos[tipoEl.value].opciones.forEach(op => {
        const option = document.createElement("option");
        option.value = op;
        option.textContent = op;
        unidadEl.appendChild(option);
        });
    });

    tipoEl.dispatchEvent(new Event("change"));
    mostrarHistorial();

    formEl.addEventListener("submit", (e) => {
        e.preventDefault();
        convertir();
    });

    function convertir() {
        const tipo = tipoEl.value;
        const operacion = unidadEl.value;
        const valor = parseFloat(valorEl.value);

        if (isNaN(valor)) {
        Swal.fire("Error", "Ingresá un número válido.", "warning");
        return;
        }

        const formula = eval(datos[tipo].formulas[operacion]);
        const resultado = formula(valor).toFixed(2);
        const unidadDestino = datos[tipo].unidadFinal[operacion];

        resultadoEl.textContent = `${valor} → ${resultado} ${unidadDestino}`;

        Swal.fire("Conversión exitosa", `${valor} → ${resultado} ${unidadDestino}`, "success");

        guardarHistorial({ tipo, operacion, valor, resultado, unidadDestino });
        mostrarHistorial();
        valorEl.value = "";
    }

    function guardarHistorial(entry) {
        const historial = JSON.parse(localStorage.getItem("conversiones")) || [];
        historial.push(entry);
        localStorage.setItem("conversiones", JSON.stringify(historial));
    }

    function mostrarHistorial() {
        historialEl.innerHTML = "";
        const historial = JSON.parse(localStorage.getItem("conversiones")) || [];
        historial.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.valor} → ${item.resultado} ${item.unidadDestino} (${item.operacion})`;
        historialEl.appendChild(li);
        });
    }
    }