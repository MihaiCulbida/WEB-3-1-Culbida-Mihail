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