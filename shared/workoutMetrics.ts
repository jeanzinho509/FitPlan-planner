export function calcularCargaTotal(series: number, repeticoes: number, peso: number): number {
  if (series <= 0 || repeticoes <= 0 || peso < 0) {
    throw new Error("Valores inválidos");
  }
  return series * repeticoes * peso;
}