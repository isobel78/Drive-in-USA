import React, { useState, useEffect } from 'react';
import { auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged, User } from '../firebase';
import { AddTheaterForm } from '../components/AddTheaterForm';
import { motion } from 'motion/react';
import { LogIn, LogOut, Shield, Plus, ArrowLeft, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const ADMIN_EMAIL = "isobel78@gmail.com";

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-retro-navy">
        <div className="w-12 h-12 border-4 border-retro-cyan border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const isAdmin = user?.email === ADMIN_EMAIL;

  return (
    <div className="min-h-screen bg-retro-navy text-white p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <Link to="/" className="flex items-center gap-2 text-retro-cyan md:hover:text-white transition-colors font-retro uppercase text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          {user && (
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-retro-pink md:hover:text-white transition-colors font-retro uppercase text-sm"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          )}
        </header>

        {!user ? (
          <div className="text-center py-20">
            <Shield className="w-20 h-20 text-retro-pink mx-auto mb-6 animate-pulse" />
            <h1 className="font-display text-5xl mb-4 neon-text">RESTRICTED AREA</h1>
            <p className="text-gray-400 font-sans mb-8 max-w-md mx-auto">
              This page is for theater administrators only. Please sign in with your authorized Google account to continue.
            </p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleLogin}
              className="bg-white text-retro-navy font-retro px-8 py-4 rounded-xl flex items-center gap-3 mx-auto shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              <LogIn className="w-5 h-5" />
              SIGN IN WITH GOOGLE
            </motion.button>
          </div>
        ) : isAdmin ? (
          <div className="space-y-12">
            <div className="text-center">
              <div className="inline-block p-3 bg-retro-cyan/20 rounded-full border-2 border-retro-cyan mb-4">
                <Shield className="w-8 h-8 text-retro-cyan" />
              </div>
              <h1 className="font-display text-6xl mb-2 text-white">ADMIN PANEL</h1>
              <p className="text-retro-yellow font-retro uppercase tracking-widest">Welcome back, {user.displayName}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsAddFormOpen(true)}
                className="bg-retro-navy/50 border-4 border-dashed border-retro-cyan/30 rounded-2xl p-12 text-center cursor-pointer md:hover:border-retro-cyan transition-all group"
              >
                <div className="w-16 h-16 bg-retro-cyan/10 rounded-full flex items-center justify-center mx-auto mb-4 md:group-hover:bg-retro-cyan/20 transition-colors">
                  <Plus className="w-8 h-8 text-retro-cyan" />
                </div>
                <h3 className="font-display text-2xl mb-2">ADD NEW THEATER</h3>
                <p className="text-gray-500 text-sm">Contribute a new drive-in location to the database.</p>
              </motion.div>

              <div className="bg-retro-navy/50 border-4 border-retro-pink/30 rounded-2xl p-12 text-center opacity-50">
                <div className="w-16 h-16 bg-retro-pink/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-retro-pink" />
                </div>
                <h3 className="font-display text-2xl mb-2 uppercase">Manage Existing</h3>
                <p className="text-gray-500 text-sm italic">Coming soon: Edit and remove existing locations.</p>
              </div>
            </div>

            <AddTheaterForm 
              isOpen={isAddFormOpen}
              onClose={() => setIsAddFormOpen(false)}
              onAdd={(t) => {
                console.log("Theater added:", t);
                // You could add a toast notification here
              }}
            />
          </div>
        ) : (
          <div className="text-center py-20">
            <X className="w-20 h-20 text-retro-red mx-auto mb-6" />
            <h1 className="font-display text-5xl mb-4 text-retro-red">ACCESS DENIED</h1>
            <p className="text-gray-400 font-sans mb-8 max-w-md mx-auto">
              Your account (<strong>{user.email}</strong>) is not authorized to access the admin panel.
            </p>
            <button 
              onClick={handleLogout}
              className="text-retro-cyan font-retro uppercase underline"
            >
              Sign in with a different account
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
