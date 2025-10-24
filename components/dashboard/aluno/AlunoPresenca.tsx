import React from 'react';
import { StatCard } from '../StatCard';
import { alunoPresencaData } from '../../../alunoData';

export const AlunoPresenca: React.FC = () => {
    const { totalAulas, presencas, faltas, historicoFaltas } = alunoPresencaData;
    const frequencia = totalAulas > 0 ? ((presencas / totalAulas) * 100).toFixed(1) : 0;

    return (
        <div className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 <StatCard 
                    title="Total de Aulas" 
                    value={totalAulas.toString()}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                    color="bg-gray-500"
                />
                <StatCard 
                    title="Presenças" 
                    value={presencas.toString()}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                    color="bg-green-500"
                />
                <StatCard 
                    title="Faltas" 
                    value={faltas.toString()}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                    color="bg-red-500"
                />
                 <StatCard 
                    title="Frequência" 
                    value={`${frequencia}%`}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" /></svg>}
                    color="bg-blue-500"
                />
            </div>
            <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Histórico de Faltas</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matéria</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {historicoFaltas.map((falta, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{new Date(falta.data).toLocaleDateString('pt-BR')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{falta.materia}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {historicoFaltas.length === 0 && (
                        <div className="text-center py-10 text-gray-500">
                            Nenhuma falta registrada. Parabéns!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};