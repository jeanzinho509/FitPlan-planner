import { describe, it, expect } from 'vitest';
import { calcularCargaTotal } from './workoutMetrics';

describe('Cálculo de Carga Total', () => {
  it('deve calcular o volume total corretamente', () => {
    expect(calcularCargaTotal(4, 10, 25)).toBe(1000);
  });

  it('deve lançar erro se valores forem negativos', () => {
    expect(() => calcularCargaTotal(0, 10, -5)).toThrow("Valores inválidos");
  });
});