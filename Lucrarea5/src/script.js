let studenti = [
    { id: 1, nume: "Culbida Mihail", grupa: "DAW-241", varsta: 17, avatar: "img/avatar.png" },
    { id: 2, nume: "Boico Misa", grupa: "DAW-241", varsta: 18, avatar: "img/avatar.png" },
    { id: 3, nume: "Utagob Alexei", grupa: "DAW-241", varsta: 17, avatar: "img/avatar.png" }
];

function afiseazaStudenti() {
    if (studenti.length === 0) {
        cardContainer.innerHTML = "Nimic in lista";
        numarStudenti.textContent = "Studenti : 0";
        return;
    }

    cardContainer.innerHTML = "";

    studenti.forEach(function (student) {
        cardContainer.innerHTML += '<div class="card">' 
        + '<img src="' + student.avatar + '">' + '<p>' + student.nume + '</p>' +'<p>Grupa: ' + student.grupa + '</p>' + '<p>Varsta: ' + student.varsta + '</p>' + '<button onclick="stergeStudent(' + student.id + ')">Sterge</button>' +
            '</div>';
    });

    numarStudenti.textContent = "Studenti : " + studenti.length;
}

afiseazaStudenti();

btnAdauga.addEventListener("click", function () {
    const nume = inputNume.value.trim();
    const grupa = inputGrupa.value.trim();
    const varsta = inputVarsta.value.trim();
    const avatar = inputAvatar.value.trim();

    if (nume === "" || grupa === "" || varsta === "") {
        eroare.textContent = "Careva input e gol";
        return;
    }

    if (varsta < 14 || varsta > 100) {
        eroare.textContent = "Varsta intre 14 si 100";
        return;
    }

    let studentNou = {
        id: Date.now(),
        nume: nume,
        grupa: grupa,
        varsta: Number(varsta),
        avatar: avatar
    };

    studenti.push(studentNou);

    inputNume.value = "";
    inputGrupa.value = "";
    inputVarsta.value = "";
    inputAvatar.value = "";
    eroare.textContent = "";

    afiseazaStudenti();
});


function stergeStudent(id) {
    const index = studenti.findIndex(student => student.id === id);

    if (index !== -1) {
        studenti.splice(index, 1);
    }

    afiseazaStudenti();
}


btnStart.addEventListener("click", () => cardContainer.style.justifyContent = "flex-start");
btnCenter.addEventListener("click", () => cardContainer.style.justifyContent = "center");
btnEnd.addEventListener("click", () => cardContainer.style.justifyContent = "flex-end");
btnBetween.addEventListener("click", () => cardContainer.style.justifyContent = "space-between");
btnAround.addEventListener("click", () => cardContainer.style.justifyContent = "space-around");
btnEvenly.addEventListener("click", () => cardContainer.style.justifyContent = "space-evenly");

btnAlignStart.addEventListener("click", () => cardContainer.style.alignItems = "flex-start");
btnAlignCenter.addEventListener("click", () => cardContainer.style.alignItems = "center");
btnAlignEnd.addEventListener("click", () => cardContainer.style.alignItems = "flex-end");
btnStretch.addEventListener("click", () => cardContainer.style.alignItems = "stretch");

