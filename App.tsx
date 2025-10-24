import React, { useState } from 'react';
import type { UserProfile } from './types';
import { PROFILES } from './constants';
import { ProfileCard } from './components/ProfileCard';
import { LoginForm } from './components/LoginForm';
import { Modal } from './components/Modal';
import { ForgotPasswordForm } from './components/ForgotPasswordForm';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { validateCredentials } from './auth';
import { PlaceholderDashboard } from './components/dashboard/PlaceholderDashboard';
import { ProfessorDashboard } from './components/dashboard/professor/ProfessorDashboard';
import { AlunoDashboard } from './components/dashboard/aluno/AlunoDashboard';
import { CoordenadorDashboard } from './components/dashboard/coordenador/CoordenadorDashboard';
import { SecretarioDashboard } from './components/dashboard/secretario/SecretarioDashboard';
import { OrientadorDashboard } from './components/dashboard/orientador/OrientadorDashboard';
import { BibliotecarioDashboard } from './components/dashboard/bibliotecario/BibliotecarioDashboard';
import { ResponsavelDashboard } from './components/dashboard/responsavel/ResponsavelDashboard';

const Logo = () => (
  <div className="flex items-center justify-center space-x-4">
    <svg width="60" height="60" viewBox="0 0 100 100" className="flex-shrink-0">
      <path d="M0 20 L40 20 L40 0 L60 0 L60 60 L100 60 L100 80 L0 80 Z" fill="#3B82F6" />
      <path d="M40 40 L40 60 L20 60 L20 40 Z" fill="#10B981" />
      <rect x="85" y="5" width="10" height="10" fill="#FBBF24" />
      <rect x="85" y="85" width="10" height="10" fill="#FBBF24" />
    </svg>
    <div className="text-left">
      <span className="text-4xl font-bold text-gray-800 tracking-tight">colabora</span>
      <span className="text-4xl font-bold text-blue-600 tracking-tight">EDU</span>
    </div>
  </div>
);

const App: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  const [modalView, setModalView] = useState<'login' | 'forgotPassword'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loggedInProfile, setLoggedInProfile] = useState<UserProfile | null>(null);

  const handleProfileSelect = (profile: UserProfile) => {
    setSelectedProfile(profile);
    setModalView('login');
  };
  
  const handleLogin = async (email: string, password: string): Promise<void> => {
    if (!selectedProfile) {
      throw new Error('Nenhum perfil selecionado.');
    }

    // Simulate network delay for realism
    await new Promise(res => setTimeout(res, 500));

    const isValid = validateCredentials(selectedProfile.id, email, password);
    
    if (isValid) {
      setLoggedInProfile(selectedProfile);
      setIsLoggedIn(true);
      closeModal();
    } else {
      throw new Error('Email ou senha inválidos. Tente novamente.');
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInProfile(null);
  }

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Link de recuperação de senha enviado para o email fornecido para o perfil ${selectedProfile?.name}. (funcionalidade de demonstração)`);
    setModalView('login');
  }

  const closeModal = () => {
    setSelectedProfile(null);
  }

  if (isLoggedIn && loggedInProfile) {
    if (loggedInProfile.id === 'admin') {
      return <AdminDashboard profile={loggedInProfile} onLogout={handleLogout} />;
    }
    if (loggedInProfile.id === 'professor') {
      return <ProfessorDashboard profile={loggedInProfile} onLogout={handleLogout} />;
    }
     if (loggedInProfile.id === 'aluno') {
      return <AlunoDashboard profile={loggedInProfile} onLogout={handleLogout} />;
    }
     if (loggedInProfile.id === 'coordenador') {
      return <CoordenadorDashboard profile={loggedInProfile} onLogout={handleLogout} />;
    }
     if (loggedInProfile.id === 'secretario') {
      return <SecretarioDashboard profile={loggedInProfile} onLogout={handleLogout} />;
    }
    if (loggedInProfile.id === 'orientador') {
      return <OrientadorDashboard profile={loggedInProfile} onLogout={handleLogout} />;
    }
    if (loggedInProfile.id === 'bibliotecario') {
      return <BibliotecarioDashboard profile={loggedInProfile} onLogout={handleLogout} />;
    }
    if (loggedInProfile.id === 'responsavel') {
      return <ResponsavelDashboard profile={loggedInProfile} onLogout={handleLogout} />;
    }
    // For all other profiles, render the placeholder dashboard
    return <PlaceholderDashboard profile={loggedInProfile} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-100 font-sans text-gray-700">
      <main className="container mx-auto px-4 py-12 md:py-20">
        <header className="text-center mb-12">
          <div className="inline-block mb-6">
            <Logo />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
            Bem-vindo ao colabora<span className="text-blue-600">EDU</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-500">
            Sistema Educacional Colaborativo - Uma plataforma integrada para gestão educacional, conectando toda a comunidade escolar em um ambiente digital colaborativo.
          </p>
        </header>

        <section id="profile-selection" className="p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-center mb-2">Selecione seu perfil de acesso</h2>
          <p className="text-center text-gray-500 mb-8">Escolha o tipo de usuário para acessar as funcionalidades específicas do seu perfil.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {PROFILES.map(profile => (
              <ProfileCard 
                key={profile.id} 
                profile={profile} 
                onSelect={handleProfileSelect}
              />
            ))}
          </div>
        </section>

        {selectedProfile && (
          <Modal isOpen={!!selectedProfile} onClose={closeModal}>
            {modalView === 'login' ? (
              <LoginForm 
                profile={selectedProfile}
                onLogin={handleLogin}
                onShowForgotPassword={() => setModalView('forgotPassword')}
              />
            ) : (
              <ForgotPasswordForm
                profile={selectedProfile}
                onSubmit={handleForgotPasswordSubmit}
                onBackToLogin={() => setModalView('login')}
              />
            )}
          </Modal>
        )}

        <footer className="mt-16 text-center p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200">
          <h3 className="text-2xl font-bold mb-4">Sobre o colaboraEDU</h3>
          <p className="max-w-4xl mx-auto text-gray-600">
            O colaboraEDU é uma plataforma educacional completa que integra todos os setores da instituição de ensino. Com interfaces adaptadas para cada tipo de usuário, nosso sistema facilita a comunicação, otimiza processos administrativos e pedagógicos, e promove um ambiente de aprendizado mais eficiente e colaborativo.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;