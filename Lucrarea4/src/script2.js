let elevi = [
    { nume: "Culbida Mihail", varsta: 17, nota: 10 },
    { nume: "Boico Razvan", varsta: 18, nota: 10 },
    { nume: "Bogatu Alexei", varsta: 17, nota: 10 }
];

function afiseazaElevi() {
    catalog.innerHTML = "";

    elevi.forEach(function (elev, index) {
        catalog.innerHTML += (index + 1) + ". " + elev.nume + " - Varsta: " + elev.varsta + ", Nota: " + elev.nota + "<br>";
    });
    numarElevi.textContent = "Nr elevi: " + elevi.length;
}

btnAdaugaElev.addEventListener("click", function () {
    let elevNou = {
        nume: inputNume.value,
        varsta: inputVarsta.value,
        nota: inputNota.value
    };

    elevi.push(elevNou);
    afiseazaElevi();
});

btnStergeElev.addEventListener("click", function () {
    const index = elevi.findIndex(elev => elev.nume === inputNumeStergere.value);

    if (index !== -1) {
        elevi.splice(index, 1);
    }

    afiseazaElevi();
});

btnCautaElev.addEventListener("click", function () {
    const elevGasit = elevi.find(elev => elev.nume === inputNumeCautare.value);

    if (elevGasit) {
        rezultatCautare.textContent = "Elevul gasit - Nume: " + elevGasit.nume +
            ", Varsta: " + elevGasit.varsta + ", Nota: " + elevGasit.nota;
    } else {
        rezultatCautare.textContent = "Elevul nu a fost gasit";
    }
});

afiseazaElevi();