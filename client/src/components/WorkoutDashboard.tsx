import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';

export default function WorkoutDashboard() {
  // Simulando o uso daquela nossa função de cálculo testada
  const cargaTotalHoje = 1000; // 4 séries x 10 repetições x 25kg
  const metaSemanal = 5000;
  const progresso = (cargaTotalHoje / metaSemanal) * 100;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard de Evolução</h1>
      <p className="text-muted-foreground">
        Acompanhe seu progresso e mantenha a consistência. (ODS 3: Saúde e Bem-Estar)
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Card 1: Volume de Treino (Conectado ao Teste Unitário) */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Volume Total Hoje</CardTitle>
            <span className="text-2xl">🏋️‍♂️</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cargaTotalHoje} kg</div>
            <p className="text-xs text-muted-foreground">
              +15% em relação ao último treino
            </p>
          </CardContent>
        </Card>

        {/* Card 2: Meta */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Meta Semanal</CardTitle>
            <span className="text-2xl">🎯</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progresso}%</div>
            <Progress value={progresso} className="mt-2" />
          </CardContent>
        </Card>

        {/* Card 3: Consistência */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Dias Seguidos</CardTitle>
            <span className="text-2xl">🔥</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4 Dias</div>
            <p className="text-xs text-muted-foreground">
              Você está no caminho certo!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}