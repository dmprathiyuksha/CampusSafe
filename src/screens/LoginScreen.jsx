import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Lock, Eye, EyeOff, ShieldCheck, GraduationCap } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function LoginScreen() {
  const navigate = useNavigate();
  const { login } = useApp();

  const [studentId, setStudentId] = useState('RA2411003010142');
  const [password, setPassword] = useState('srmist@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login();
      navigate('/home');
    }, 400);
  };

  const handleDemoFill = () => {
    setStudentId('RA2411003010142');
    setPassword('srmist@2026');
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-white dark:bg-slate-950 transition-colors">
      
      {/* Top Header with Back Arrow */}
      <div>
        <div className="flex items-center justify-between pt-2 mb-6">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-semibold text-slate-400">SRM IST Portal</span>
        </div>

        {/* Welcome Text matching prototype */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
            Welcome Back!
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Login to stay connected and stay safe.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Student ID / Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
              Student ID / Email
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                required
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="e.g. RA2411003010142"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-mono"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-11 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Log In Button (Red full-width) */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-2xl bg-red-600 hover:bg-red-700 active:scale-98 text-white font-bold text-sm shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <span>Log In</span>
              )}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => alert('Demo project: any credentials are valid for login.')}
              className="text-xs font-semibold text-red-600 hover:text-red-700 dark:text-red-400"
            >
              Forgot Password?
            </button>
          </div>

          {/* OR Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />
            <span className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              OR
            </span>
            <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />
          </div>

          {/* Continue with SRM button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-3 px-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 text-xs font-bold text-slate-800 dark:text-white flex items-center justify-center gap-2.5 transition-all shadow-xs"
          >
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black">
              SRM
            </div>
            <span>Continue with SRM</span>
          </button>

        </form>
      </div>

      {/* Footer */}
      <div className="pt-6 pb-2 text-center space-y-2">
        <p className="text-xs text-slate-500">
          New here?{' '}
          <button
            onClick={handleSubmit}
            className="font-bold text-red-600 hover:underline dark:text-red-400"
          >
            Create an account
          </button>
        </p>

        <button
          type="button"
          onClick={handleDemoFill}
          className="text-[11px] text-slate-400 hover:text-slate-600 underline"
        >
          Prefill Demo Student Credentials
        </button>
      </div>

    </div>
  );
}
