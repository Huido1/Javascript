const FACTORES_CONVERSION = {
    temperatura: { CtoK: 273.15, KtoC: 273.15 },
    distancia: { metrosAPies: 3.28084, piesAMetros: 1 / 3.28084 },
    volumen: { litrosAGalones: 0.264172, galonesALitros: 1 / 0.264172 },
    masa: { kilosALibras: 2.20462, librasAKilos: 1 / 2.20462 }
};

function conversion(valor, factor, operacion) {
    if (operacion === "suma") return valor + factor;
    if (operacion === "resta") return valor - factor;
    if (operacion === "multiplicacion") return valor * factor;
}

let continuar = true;

while (continuar) {
    let tipo = prompt("¿Qué tipo de unidad quieres convertir?\nOpciones: temperatura, distancia, volumen, masa.").toLowerCase();
    let valor, resultado;

    switch (tipo) {
        case "temperatura":
            let unidadTemp = prompt("¿Vas a convertir Celsius o Kelvin? (C/K)").toUpperCase();
            if (unidadTemp !== "C" && unidadTemp !== "K") {
                alert("Unidad no válida para temperatura.");
                break;
            }
            valor = Number(prompt(`Ingrese la temperatura en ${unidadTemp === "C" ? "Celsius" : "Kelvin"}`));
            resultado = conversion(valor, FACTORES_CONVERSION.temperatura[unidadTemp === "C" ? "CtoK" : "KtoC"], unidadTemp === "C" ? "suma" : "resta");
            alert(`Son ${resultado.toFixed(2)} ${unidadTemp === "C" ? "Kelvin" : "Celsius"}`);
            break;

        case "distancia":
            let unidadDist = prompt("¿Vas a convertir Metros o Pies? (M/FT)").toUpperCase();
            if (unidadDist !== "M" && unidadDist !== "FT") {
                alert("Unidad no válida para distancia.");
                break;
            }
            valor = Number(prompt(`Ingrese la distancia en ${unidadDist === "M" ? "Metros" : "Pies"}`));
            resultado = conversion(valor, FACTORES_CONVERSION.distancia[unidadDist === "M" ? "metrosAPies" : "piesAMetros"], "multiplicacion");
            alert(`Son ${resultado.toFixed(2)} ${unidadDist === "M" ? "Pies" : "Metros"}`);
            break;

        case "volumen":
            let unidadVol = prompt("¿Vas a convertir Litros o Galones? (L/G)").toUpperCase();
            if (unidadVol !== "L" && unidadVol !== "G") {
                alert("Unidad no válida para volumen.");
                break;
            }
            valor = Number(prompt(`Ingrese el volumen en ${unidadVol === "L" ? "Litros" : "Galones"}`));
            resultado = conversion(valor, FACTORES_CONVERSION.volumen[unidadVol === "L" ? "litrosAGalones" : "galonesALitros"], "multiplicacion");
            alert(`Son ${resultado.toFixed(2)} ${unidadVol === "L" ? "Galones" : "Litros"}`);
            break;

        case "masa":
            let unidadMasa = prompt("¿Vas a convertir Kilos o Libras? (KG/LB)").toUpperCase();
            if (unidadMasa !== "KG" && unidadMasa !== "LB") {
                alert("Unidad no válida para masa.");
                break;
            }
            valor = Number(prompt(`Ingrese la masa en ${unidadMasa === "KG" ? "Kilos" : "Libras"}`));
            resultado = conversion(valor, FACTORES_CONVERSION.masa[unidadMasa === "KG" ? "kilosALibras" : "librasAKilos"], "multiplicacion");
            alert(`Son ${resultado.toFixed(2)} ${unidadMasa === "KG" ? "Libras" : "Kilos"}`);
            break;

        default:
            alert("Tipo de unidad no válido. Por favor, elige entre temperatura, distancia, volumen o masa.");
            break;
    }

    continuar = confirm("¿Quieres realizar otra conversión?");
}

alert("Gracias por usar el simulador de conversión.");

