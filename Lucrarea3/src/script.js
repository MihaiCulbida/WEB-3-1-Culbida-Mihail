function calculateSum(a, b) {
    let c = a + b;
    return c;
}

console.log(calculateSum(2, 8));
console.log(calculateSum(600, 400));

const student = {
    name: "Mihail",
    age: 17,
    grade: 2,
};

function introduce() {
    console.log("Salut, numele meu este " + student.name + ", am " + student.age + " ani și am nota " + student.grade);
}

student.introduce = introduce;
student.introduce();
student.grade = 10;
console.log(student.grade);

const variante = ["piatra", "hartia", "foarfeca"];

const imagini = {
    piatra: "img/rock.png",
    hartia: "img/paper.png",
    foarfeca: "img/scissors.png"
};

const nume = {
    piatra: "Piatra",
    hartia: "Hârtia",
    foarfeca: "Foarfeca"
};

const gameScore = {
    player: 0,
    computer: 0,
    draws: 0
};

function displayScore() {
    document.getElementById("scorCalculator").textContent = this.computer;
    document.getElementById("scorEgalitati").textContent = this.draws;
    document.getElementById("scorJucator").textContent = this.player;
}

gameScore.displayScore = displayScore;
gameScore.displayScore();

function getComputerChoice() {
    const index = Math.floor(Math.random() * 3);
    return variante[index];
}

function getWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        gameScore.draws++;
        return "Egalitate!";
    }

    if (
        (userChoice === "piatra" && computerChoice === "foarfeca") ||
        (userChoice === "foarfeca" && computerChoice === "hartia") ||
        (userChoice === "hartia" && computerChoice === "piatra")
    ) {
        gameScore.player++;
        return "Ai câștigat!";
    }

    gameScore.computer++;
    return "Calculatorul a câștigat!";
}

function checkWinner() {
    const mesaj = document.getElementById("mesajCalculator");

    if (gameScore.player === 5) {
        mesaj.style.display = "none";
        showModal("Tu ai acumulat 5 puncte!");
    } else if (gameScore.computer === 5) {
        mesaj.style.display = "block";
        showModal("Calculatorul a acumulat 5 puncte!");
    }
}

function showModal(text) {
    document.getElementById("modalText").textContent = text;
    document.getElementById("modal").style.display = "flex";
}

function playRound(userChoice) {
    const computerChoice = getComputerChoice();
    const result = getWinner(userChoice, computerChoice);

    document.getElementById("imgJucator").src = imagini[userChoice];
    document.getElementById("imgJucator").style.display = "inline";
    document.getElementById("textJucator").textContent = nume[userChoice];
    document.getElementById("imgCalculator").src = imagini[computerChoice];
    document.getElementById("imgCalculator").style.display = "inline";
    document.getElementById("textCalculator").textContent = nume[computerChoice];
    document.getElementById("rezultat").textContent = result;

    gameScore.displayScore();
    checkWinner();
}

document.getElementById("btnPiatra").addEventListener("click", function () {
    playRound("piatra");
});

document.getElementById("btnHartia").addEventListener("click", function () {
    playRound("hartia");
});

document.getElementById("btnFoarfeca").addEventListener("click", function () {
    playRound("foarfeca");
});

document.getElementById("btnModal").addEventListener("click", function () {
    document.getElementById("modal").style.display = "none";
    gameScore.player = 0;
    gameScore.computer = 0;
    gameScore.draws = 0;
    gameScore.displayScore();
});