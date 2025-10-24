import React, { useState, useMemo, useEffect } from 'react';
import { institutionsData, Institution } from '../../instituicoesData';

const statusColors: Record<Institution['status'], string> = {
    Ativa: 'bg-green-100 text-green-800',
    Inativa: 'bg-red-100 text-red-800',
    Pendente: 'bg-yellow-100 text-yellow-800',
};

export const Institutions: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    const filteredInstitutions = useMemo(() => {
        return institutionsData.filter(inst =>
            inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inst.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inst.cnpj.includes(searchTerm)
        );
    }, [searchTerm]);

    useEffect(() => {
      setCurrentPage(1);
    }, [searchTerm]);

    const totalPages = Math.ceil(filteredInstitutions.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const paginatedItems = filteredInstitutions.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page: number) => setCurrentPage(page);
    const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg animate-fade-in">
             <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 md:mb-0">Gerenciar Instituições</h2>
                <div className="w-full md:w-auto flex items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Pesquisar..."
                        className="block w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <button className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                        Nova Instituição
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instituição</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CNPJ</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Localização</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Ações</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedItems.map((inst) => (
                            <tr key={inst.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img className="h-10 w-10 rounded-full object-cover" src={inst.logo} alt={`${inst.name} logo`} />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{inst.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inst.cnpj}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inst.city}, {inst.state}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[inst.status]}`}>
                                        {inst.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-teal-600 hover:text-teal-900">Gerenciar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {filteredInstitutions.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        Nenhuma instituição encontrada.
                    </div>
                )}
            </div>
            
            {totalPages > 1 && (
                <div className="flex items-center justify-between py-4 px-2">
                    <div className="text-sm text-gray-700">
                        Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a <span className="font-medium">{Math.min(indexOfLastItem, filteredInstitutions.length)}</span> de <span className="font-medium">{filteredInstitutions.length}</span> resultados
                    </div>
                    <div className="flex items-center space-x-1">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-3 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Anterior
                        </button>
                        {[...Array(totalPages).keys()].map(number => (
                            <button
                                key={number + 1}
                                onClick={() => handlePageChange(number + 1)}
                                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${currentPage === number + 1 ? 'z-10 bg-teal-50 border-teal-500 text-teal-600' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                            >
                                {number + 1}
                            </button>
                        ))}
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className="relative inline-flex items-center px-3 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Próximo
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
