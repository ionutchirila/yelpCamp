let S = prompt('deschiderea dintre cei doi stalpi este S=1800');
let H = prompt('20% din rezistenta la rupere a conductorului H=8000');
let w = prompt('Greutatea liniara a conductorului w=2.510');
// 14.2
let D = H / w * (Math.cosh(w / H * S / 2) - 1);
console.log(D);
// 14.3
let T = H + w * D;
// 14.5
let L = (2 * H / w) * Math.sinh(S * w / 2 / H);
// 14.6
// L = s+ 8*D*D/3/S;
// 14.7
// L-S = S*S*S*(w*w/24/H/H);
// 14.8
D = Math.sqrt(3 * s8(L - S) / 8);
let h = prompt('diferenta de nivel dintre cei 2 stalpi este h=460');
// 14.10
let xL = S / 2 * (1 + h / 4 / D);
// 14.11
let xR = S / 2 * (1 - h / 4 / D);
// 14.12
L = S + (Math.pow(xR, 3) + Math.pow(xL, 3)) * w * w / 6 / H / H;
// 14.13
DR = w * xR * xR / 2 / H;
DL = w * xL * xL / 2 / H;
// 14.14
DR = D * Math.pow((1 - h / 4 / D), 2);
DL = D * Math.pow((1 + h / 4 / D), 2);
// 14.15
TR = H + w * DR;
TL = H + w * DL;
// 14.16
Tu = Tl + w * H;

