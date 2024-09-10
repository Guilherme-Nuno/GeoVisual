const initialPointNamesList = ['A', 'B', 'C', 'D', 'E', 'G', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const initialLineNamesList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const initialPlaneNamesList = [
    'α', // Alfa
    'β', // Beta
    'γ', // Gama
    'δ', // Delta
    'ε', // Epsilon
    'ζ', // Zeta
    'η', // Eta
    'θ', // Teta
    'ι', // Iota
    'κ', // Kappa
    'λ', // Lambda
    'μ', // Mu
    'ν', // Nu
    'ξ', // Xi
    'ο', // Omicron
    'π', // Pi
    'ρ', // Rho
    'σ', // Sigma
    'τ', // Tau
    'υ', // Upsilon
    'φ', // Phi
    'χ', // Chi
    'ψ', // Psi
    'ω'  // Omega
  ];

export const pointNamesList = [];
export const existingPointList = [];

export const lineNamesList = [];
export const existingLineList = [];

export const planeNamesList = [];
export const existingPlaneList = [];

export function createNamesLists() {
  existingPointList.length = 0;
  existingLineList.length = 0;
  existingPlaneList.length = 0;
  pointNamesList.length = 0;
  lineNamesList.length = 0;
  planeNamesList.length = 0;

  pointNamesList.push(...initialPointNamesList);
  lineNamesList.push(...initialLineNamesList);
  planeNamesList.push(...initialPlaneNamesList);

}