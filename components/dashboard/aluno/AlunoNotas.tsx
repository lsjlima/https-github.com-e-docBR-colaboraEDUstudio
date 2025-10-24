import React from 'react';
import { alunoNotas, AlunoNota } from '../../../alunoData';

const calcularMedia = (notas: AlunoNota) => {
    const notasValidas = Object.values(notas).filter(n => typeof n === 'number') as number[];
    // Fix: Ensure a consistent string return type for `calcularMedia` by returning '0.0' instead of 0. This resolves the TypeScript error on line 30 where parseFloat expects a string.
    if (notasValidas.length === 0) return '0.0';
    const soma = notasValidas.reduce((acc, curr) => acc + curr, 0);
    return (soma / notasValidas.length).toFixed(1);
};

export const AlunoNotas: React.FC = () => {
  return (
    <div className="animate-fade-in bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Minhas Notas</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matéria</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">1º Bimestre</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">2º Bimestre</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">3º Bimestre</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">4º Bimestre</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Média Final</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {alunoNotas.map((nota, index) => {
              const media = parseFloat(calcularMedia(nota));
              const isAprovado = media >= 7;
              return (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{nota.materia}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{nota.n1?.toFixed(1) ?? '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{nota.n2?.toFixed(1) ?? '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{nota.n3?.toFixed(1) ?? '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{nota.n4?.toFixed(1) ?? '-'}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold text-center ${isAprovado ? 'text-blue-600' : 'text-red-600'}`}>{media.toFixed(1)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${isAprovado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {isAprovado ? 'Aprovado' : 'Recuperação'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};