const greet = (name: string): void => {
  console.log(`안녕하세요, ${name}!`);
}

function minus(x: number, y: number): number {
	return x - y;
}

const getFullname = (firstName: string, lastName: string): string => {
  return firstName + lastName;
};


greet('홍길동');
console.log(minus(99,4));

const fullName = getFullname('김', '용민');
console.log(fullName); 


namespace A {
  const a = 1;
  export let b = a + 10;
}

namespace A {
  export const c = 2;
  b = 20;
}

console.log(A.b);