import React from 'react';
import { professorTurmas, Turma } from '../../../professorData';

const TurmaCard: React.FC<{ turma: Turma }> = ({ turma }) => {
  const colors = {
    Manhã: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-500' },
    Tarde: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-500' }
  };
  const color = colors[turma.periodo];

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:-translate-y-1 hover:shadow-xl border-l-4 ${color.border}`}>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{turma.nome}</h3>
            <p className="text-gray-500">{turma.serie}</p>
          </div>
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${color.bg} ${color.text}`}>
            {turma.periodo}
          </span>
        </div>
        <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
          <div className="flex items-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 21a6 6 0 004.77-2.764" />
            </svg>
            <span>{turma.alunos} Alunos</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{turma.horario}</span>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <button className="text-sm font-semibold text-green-600 hover:text-green-800 transition-colors">
          Acessar Turma
        </button>
      </div>
    </div>
  );
};

export const MinhasTurmas: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Minhas Turmas</h2>
         <button className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            Criar Turma
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {professorTurmas.map(turma => (
          <TurmaCard key={turma.id} turma={turma} />
        ))}
      </div>
    </div>
  );
};
