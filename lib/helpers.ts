function euclidesMCD(a: number, b: number) {
  var iaux; //auxiliar
  a = Math.abs(a); //tomamos valor absoluto
  b = Math.abs(b);
  var i1 = Math.max(a, b); //i1 = el más grande
  var i2 = Math.min(a, b); //i2 = el más pequeño

  do {
    iaux = i2; //guardar divisor
    i2 = i1 % i2; //resto pasa a divisor
    i1 = iaux; //divisor pasa a dividendo
  } while (i2 !== 0);
  return i1; //ultimo resto no nulo
}

function euclidesExtend(
  alpha: string,
  n: string
): { mcd: number; inverso: number } {
  let x = parseInt(alpha) % parseInt(n);
  let y = parseInt(n);

  if (x < y) {
    const z = x;
    x = y;
    y = z;
  }
  let gx = x;
  let gy = y;
  let u1 = 1;
  let u2 = 0;
  let v1 = 0;
  let v2 = 1;
  let u = 0;
  let v = 1;
  while (y != 0) {
    let q = Math.floor(x / y);
    let r = x % y;
    x = y;
    y = r;
    if (r != 0) {
      u = u1 - q * u2;
      v = v1 - q * v2;
      u1 = u2;
      v1 = v2;
      u2 = u;
      v2 = v;
    }
  }

  let mcd = x;
  let us = "";
  let vs = "";
  //   formula.mcd.value = mcd;
  let sv = v;
  if (u < 0) {
    us = "(" + u + ")";
  }
  if (v < 0) {
    vs = "(" + v + ")";
  }
  let cadena = us + "" + gx + " + " + vs + "" + gy + " = " + mcd;
  //   formula.expresion.value = cadena;
  if (sv < 0) sv = gx + sv;
  //   formula.caja1.value = gy;
  //   formula.caja2.value = gx;
  //   if (mcd == 1) formula.caja3.value = sv;
  //   else formula.caja3.value = "No existe.";
  console.log(cadena);
  return { mcd, inverso: sv };
}

export { euclidesMCD, euclidesExtend };
