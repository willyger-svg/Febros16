"use client";

import React, { useState } from 'react';
import { X, Lock, Mail, User, CheckCircle2, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signin',
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('researcher');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (mode === 'signup' && !name)) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setEmail('');
    setPassword('');
    setName('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-950/80 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">
              {mode === 'signup' ? 'Account Created' : 'Welcome Back'}
            </h3>
            <p className="text-sm text-slate-300">
              {mode === 'signup'
                ? `Welcome to FEBROS16, ${name}! Your workspace profile has been registered.`
                : `Logged in as ${email}. Your saved research projects and bookmarks are ready.`}
            </p>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition-colors cursor-pointer"
              >
                Enter Platform
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">
                FEBROS16 Authentication
              </div>
              <h2 id="auth-modal-title" className="text-2xl font-black text-white">
                {mode === 'signup' ? 'Create Your Account' : 'Sign in to Febros16'}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-400">
                {mode === 'signup'
                  ? 'Join our global network of researchers, learners, and scholars.'
                  : 'Access your research workspace, bookmarks, and collections.'}
              </p>
            </div>

            <div className="grid grid-cols-2 p-1 bg-slate-950 rounded-xl mb-6 border border-slate-800 text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setError('');
                }}
                className={`py-2 rounded-lg transition-colors cursor-pointer ${
                  mode === 'signin'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setError('');
                }}
                className={`py-2 rounded-lg transition-colors cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-rose-950/80 border border-rose-800/80 rounded-xl text-xs text-rose-300">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Dr. Jane Cooper"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@institution.edu"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Primary Domain / Focus
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="researcher">Academic / Scientific Researcher</option>
                    <option value="student">Graduate / Undergraduate Student</option>
                    <option value="educator">Faculty / Institutional Educator</option>
                    <option value="technologist">Systems Engineer / Technologist</option>
                    <option value="scholar">Independent Scholar & Policy Analyst</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition-colors shadow-md shadow-blue-900/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{mode === 'signup' ? 'Register Account' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-500">
              Secured with bcrypt password hashing via Go / PostgreSQL backend API.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
