let produse = ["Paine", "Lapte", "Oua"];

function afiseazaProduse() {
    if (produse.length === 0) {
        listaProduse.textContent = "Lista e goala";
    } else {
        listaProduse.textContent = produse.join(", ");
    }
}

btnAdaugaSfarsit.addEventListener("click", function () {
    if (inputProdus.value.trim() !== "") {
        produse.push(inputProdus.value);
        inputProdus.value = "";
        afiseazaProduse();
    }
});

btnAdaugaInceput.addEventListener("click", function () {
    if (inputProdus.value.trim() !== "") {
        produse.unshift(inputProdus.value);
        inputProdus.value = "";
        afiseazaProduse();
    }
});

btnStergePrimul.addEventListener("click", function () {
    produse.shift();
    afiseazaProduse();
});

btnStergeUltimul.addEventListener("click", function () {
    produse.pop();
    afiseazaProduse();
});

afiseazaProduse();