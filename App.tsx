import React, { useState, useEffect } from 'react';
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
import { ForgotPasswordSuccessMessage } from './components/ForgotPasswordSuccessMessage';

// New Logo Component
const Logo = ({ className }: { className?: string }) => (
  <div className={`flex items-center space-x-2 ${className}`}>
    <svg
      className="h-8 w-8 text-slate-900"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 7L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 22V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 7L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 4.5L7 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <span className="text-2xl font-bold text-slate-900 tracking-tighter">colaboraEDU</span>
  </div>
);

// New Animated Text Component (Magic UI inspired)
const AnimatedShinyText = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`inline-flex animate-background-shine items-center justify-center rounded-lg border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 py-2 text-slate-400 transition-colors ${className}`}>
    {children}
  </div>
);

// New Footer Component
const Footer = () => (
  <footer className="w-full mt-24 border-t border-slate-200 py-8">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-y-4">
      <Logo />
      <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm text-slate-600">
        <a href="#" className="hover:text-slate-900 transition-colors">Termos de Serviço</a>
        <a href="#" className="hover:text-slate-900 transition-colors">Política de Privacidade</a>
        <a href="#" className="hover:text-slate-900 transition-colors">Sobre Nós</a>
        <a href="#" className="hover:text-slate-900 transition-colors">Contato</a>
      </div>
      <p className="text-sm text-slate-500">
        &copy; {new Date().getFullYear()} colaboraEDU. Todos os direitos reservados.
      </p>
    </div>
  </footer>
);

const App: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  const [modalView, setModalView] = useState<'login' | 'forgotPassword' | 'forgotPasswordSuccess'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loggedInProfile, setLoggedInProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (modalView === 'forgotPasswordSuccess') {
      const timer = setTimeout(() => {
        setModalView('login');
      }, 4000); // Go back to login after 4 seconds

      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [modalView]);

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
    // In a real app, you would get the email from the form and send a request to your backend.
    // For this demo, we'll just show the success message.
    setModalView('forgotPasswordSuccess');
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
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased">
      <main className="flex flex-col items-center justify-between min-h-screen">
          <div className="w-full flex-grow flex flex-col items-center justify-center py-12 md:py-20 px-4">
            <header className="text-center mb-12 md:mb-16">
              <div className="inline-block mb-8">
                <Logo />
              </div>
              <AnimatedShinyText className="text-4xl md:text-5xl font-extrabold tracking-tight">
                 Bem-vindo ao colaboraEDU
              </AnimatedShinyText>
              <p className="mt-6 text-base md:text-lg max-w-2xl mx-auto text-slate-600">
                Uma plataforma integrada para gestão educacional, conectando toda a comunidade escolar em um ambiente digital colaborativo.
              </p>
            </header>

            <section id="profile-selection" className="w-full max-w-6xl p-8 bg-white rounded-2xl shadow-lg border border-slate-200">
              <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Selecione seu perfil de acesso</h2>
              <p className="text-center text-slate-500 mb-8">Escolha o tipo de usuário para acessar as funcionalidades específicas do seu perfil.</p>
              
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
         </div>

        {selectedProfile && (
          <Modal isOpen={!!selectedProfile} onClose={closeModal}>
            {modalView === 'login' ? (
              <LoginForm 
                profile={selectedProfile}
                onLogin={handleLogin}
                onShowForgotPassword={() => setModalView('forgotPassword')}
              />
            ) : modalView === 'forgotPassword' ? (
              <ForgotPasswordForm
                profile={selectedProfile}
                onSubmit={handleForgotPasswordSubmit}
                onBackToLogin={() => setModalView('login')}
              />
            ) : (
              <ForgotPasswordSuccessMessage
                profile={selectedProfile}
                onBackToLogin={() => setModalView('login')}
              />
            )}
          </Modal>
        )}
        
        <Footer />

      </main>
       <style>{`
            @keyframes background-shine {
              from { background-position: 0 0; }
              to { background-position: -200% 0; }
            }
            .animate-background-shine {
              animation: background-shine 2s linear infinite;
            }
          `}</style>
    </div>
  );
};

export default App;