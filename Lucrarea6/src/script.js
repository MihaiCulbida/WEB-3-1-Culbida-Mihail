const form = document.getElementById("formElev");
const eroare = document.getElementById("eroare");
const cardContainer = document.getElementById("cardContainer");
const numarElevi = document.getElementById("numarElevi");
const inputCauta = document.getElementById("inputCauta");
const btnCauta = document.getElementById("btnCauta");

let cautare = "";

let elevi = JSON.parse(localStorage.getItem("elevi")) || [];

function salvare() {
    localStorage.setItem("elevi", JSON.stringify(elevi));
}

function afisare() {
    numarElevi.textContent = "Elevi pe lista [" + elevi.length + "]";

    const lista = elevi.filter(elev => elev.nume.toLowerCase().includes(cautare));

    if (lista.length === 0) {
        cardContainer.innerHTML = elevi.length === 0
            ? "<p>Nui nimeni in catalog</p>"
            : "<p>Nu exista asa elev</p>";
        return;
    }

    cardContainer.innerHTML = lista.map(elev => `
        <div class="bg-white p-4 rounded w-64">
            <h2 class="font-semibold">${elev.nume}</h2>
            <p>Varsta: ${elev.varsta}</p>
            <p>Grupa: ${elev.grupa}</p>
            <p class="break-all">Email: ${elev.email}</p>
            <button data-id="${elev.id}" class="bg-red-600 text-white rounded px-3 py-1 mt-2">Șterge</button>
        </div>
    `).join("");
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const nume = document.getElementById("inputNume").value.trim();
    const varsta = document.getElementById("inputVarsta").value.trim();
    const grupa = document.getElementById("inputGrupa").value.trim();
    const email = document.getElementById("inputEmail").value.trim();

    if (nume === "" || varsta === "" || grupa === "" || email === "") {
        eroare.textContent = "Careva input e gol";
        return;
    }
    if (isNaN(varsta) || Number(varsta) <= 0) {
        eroare.textContent = "Varsta trebuie să fie > 0";
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        eroare.textContent = "Emailul nu e valid";
        return;
    }

    elevi.push({ id: Date.now(), nume, varsta: Number(varsta), grupa, email });
    salvare();
    afisare();
    form.reset();
    eroare.textContent = "";
});

cardContainer.addEventListener("click", function (event) {
    if (event.target.tagName !== "BUTTON") {
        return;
    }
    const id = Number(event.target.dataset.id);
    elevi = elevi.filter(elev => elev.id !== id);
    salvare();
    afisare();
});

btnCauta.addEventListener("click", function () {
    cautare = inputCauta.value.trim().toLowerCase();
    afisare();
});

afisare();