"use strict";
const greet = (name) => {
    console.log(`안녕하세요, ${name}!`);
};
function minus(x, y) {
    return x - y;
}
const getFullname = (firstName, lastName) => {
    return firstName + lastName;
};
greet('홍길동');
console.log(minus(99, 4));
const fullName = getFullname('김', '용민');
console.log(fullName);
var A;
(function (A) {
    const a = 1;
    A.b = a + 10;
})(A || (A = {}));
(function (A) {
    A.c = 2;
    A.b = 20;
})(A || (A = {}));
console.log(A.b);
