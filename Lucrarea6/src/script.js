const form = document.getElementById("formElev");
const eroare = document.getElementById("eroare");
const cardContainer = document.getElementById("cardContainer");
const numarElevi = document.getElementById("numarElevi");
const inputCauta = document.getElementById("inputCauta");
const btnCauta = document.getElementById("btnCauta");
const modal = document.getElementById("modal");
const formEdit = document.getElementById("formEdit");
const eroareEdit = document.getElementById("eroareEdit");
const btnAnuleaza = document.getElementById("btnAnuleaza");

let cautare = "";
let idEditat = null;
let elevi = JSON.parse(localStorage.getItem("elevi")) || [];

function salvare() {
    localStorage.setItem("elevi", JSON.stringify(elevi));
}

function validare(nume, varsta, grupa, email) {
    if (nume === "" || varsta === "" || grupa === "" || email === "") {
        return "Careva input e gol";
    }
    if (isNaN(varsta) || Number(varsta) <= 0) {
        return "Varsta trebuie să fie > 0";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return "Emailul nu e valid";
    }
    return "";
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
            <div class="flex gap-2 mt-2">
                <button data-id="${elev.id}" data-actiune="edit" class="bg-gray-400 text-white rounded px-3 py-1">Edit</button>
                <button data-id="${elev.id}" data-actiune="sterge" class="bg-red-600 text-white rounded px-3 py-1">Șterge</button>
            </div>
        </div>
    `).join("");
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const nume = document.getElementById("inputNume").value.trim();
    const varsta = document.getElementById("inputVarsta").value.trim();
    const grupa = document.getElementById("inputGrupa").value.trim();
    const email = document.getElementById("inputEmail").value.trim();

    const mesaj = validare(nume, varsta, grupa, email);
    if (mesaj !== "") {
        eroare.textContent = mesaj;
        return;
    }

    elevi.push({ id: Date.now(), nume, varsta: Number(varsta), grupa, email });
    salvare();
    afisare();
    form.reset();
    eroare.textContent = "";
});

cardContainer.addEventListener("click", function (event) {
    const id = Number(event.target.dataset.id);
    const actiune = event.target.dataset.actiune;

    if (actiune === "sterge") {
        elevi = elevi.filter(elev => elev.id !== id);
        salvare();
        afisare();
    }

    if (actiune === "edit") {
        const elev = elevi.find(elev => elev.id === id);
        idEditat = id;
        document.getElementById("editNume").value = elev.nume;
        document.getElementById("editVarsta").value = elev.varsta;
        document.getElementById("editGrupa").value = elev.grupa;
        document.getElementById("editEmail").value = elev.email;
        eroareEdit.textContent = "";
        modal.classList.remove("hidden");
    }
});

formEdit.addEventListener("submit", function (event) {
    event.preventDefault();
    const nume = document.getElementById("editNume").value.trim();
    const varsta = document.getElementById("editVarsta").value.trim();
    const grupa = document.getElementById("editGrupa").value.trim();
    const email = document.getElementById("editEmail").value.trim();

    const mesaj = validare(nume, varsta, grupa, email);
    if (mesaj !== "") {
        eroareEdit.textContent = mesaj;
        return;
    }

    const elev = elevi.find(elev => elev.id === idEditat);
    elev.nume = nume;
    elev.varsta = Number(varsta);
    elev.grupa = grupa;
    elev.email = email;

    salvare();
    afisare();
    modal.classList.add("hidden");
});

btnAnuleaza.addEventListener("click", function () {
    modal.classList.add("hidden");
});

btnCauta.addEventListener("click", function () {
    cautare = inputCauta.value.trim().toLowerCase();
    afisare();
});

afisare();