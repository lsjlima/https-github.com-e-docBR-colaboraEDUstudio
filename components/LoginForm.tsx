import React, { useState, useEffect } from 'react';
import type { UserProfile } from '../types';
import { mockCredentials } from '../auth';

interface LoginFormProps {
  profile: UserProfile;
  onLogin: (email: string, password: string) => Promise<void>;
  onShowForgotPassword: () => void;
}

const REMEMBER_ME_KEY = 'colaboraEDU_remembered_email';

export const LoginForm: React.FC<LoginFormProps> = ({ profile, onLogin, onShowForgotPassword }) => {
  const { name, icon, colorClasses } = profile;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for a remembered email in localStorage
    const rememberedEmail = localStorage.getItem(REMEMBER_ME_KEY);
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    } else {
      // Pre-fill email for demo purposes if not remembered
      const profileId = profile.id as keyof typeof mockCredentials;
      if (mockCredentials[profileId]) {
        setEmail(mockCredentials[profileId].email);
      } else {
        setEmail('');
      }
      setRememberMe(false);
    }
    
    // Reset other form fields
    setPassword('');
    setError(null);
    setIsLoading(false);
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await onLogin(email, password);
      // On successful login, handle 'Remember Me' preference
      if (rememberMe) {
        localStorage.setItem(REMEMBER_ME_KEY, email);
      } else {
        localStorage.removeItem(REMEMBER_ME_KEY);
      }
      // Success is handled by the parent component re-rendering
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = error
    ? `block w-full px-3 py-2 border border-red-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 ring-red-500 focus:border-red-500 sm:text-sm`
    : `block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 ${colorClasses.ring} ${colorClasses.focusBorder} sm:text-sm`;

  return (
    <div className="p-8 pt-10">
      <div className="text-center mb-8">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${colorClasses.button} mx-auto shadow-lg ${colorClasses.ring} ring-4 ring-opacity-30`}>
          {/* FIX: Cast icon to React.ReactElement<any> to resolve overload error when cloning the element with a new className. */}
          {React.cloneElement(icon as React.ReactElement<any>, { className: "h-10 w-10 text-white" })}
        </div>
        <h2 className={`text-2xl font-bold ${colorClasses.text}`}>Login como {name}</h2>
        <p className="text-sm text-gray-500 mt-1">Acesse seu dashboard exclusivo.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 bg-red-100 border border-red-200 text-red-800 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email ou Usuário
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder="seu.email@exemplo.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Senha
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              placeholder="********"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className={`h-4 w-4 text-white ${colorClasses.button} focus:ring-transparent border-gray-300 rounded`}
              style={{ accentColor: 'currentColor' }}
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Lembrar-me
            </label>
          </div>
          <div className="text-sm">
            <button
              type="button"
              onClick={onShowForgotPassword}
              className={`${colorClasses.text} font-medium ${colorClasses.buttonHover} hover:underline focus:outline-none focus:underline`}
            >
              Esqueceu sua senha?
            </button>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${colorClasses.button} ${colorClasses.buttonHover} focus:outline-none focus:ring-2 focus:ring-offset-2 ${colorClasses.ring} transition-transform transform hover:scale-105 disabled:opacity-75 disabled:cursor-not-allowed`}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
      </form>
    </div>
  );
};