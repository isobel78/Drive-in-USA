import React, { useState } from 'react';
import { X, Plus, MapPin, Globe, Info, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Theater } from '../services/theaterService';
import { db, collection, addDoc, serverTimestamp, auth } from '../firebase';

interface AddTheaterFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (theater: Theater) => void;
}

export const AddTheaterForm: React.FC<AddTheaterFormProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    state_long: '',
    lat: '',
    lng: '',
    description: '',
    website: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const newTheater: Theater = {
        ...formData,
        lat: parseFloat(formData.lat),
        lng: parseFloat(formData.lng)
      };

      // Add to Firestore
      const docRef = await addDoc(collection(db, 'theaters'), {
        ...newTheater,
        addedBy: auth.currentUser?.uid,
        createdAt: serverTimestamp()
      });

      onAdd({ ...newTheater, id: docRef.id });
      setFormData({
        name: '',
        address: '',
        city: '',
        state: '',
        state_long: '',
        lat: '',
        lng: '',
        description: '',
        website: ''
      });
      onClose();
    } catch (err) {
      console.error("Error adding theater:", err);
      setError("Failed to add theater. Please check your permissions.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-2xl bg-retro-navy border-4 border-retro-cyan rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,255,255,0.3)] my-8"
          >
            <div className="bg-retro-cyan p-4 flex justify-between items-center">
              <h2 className="font-display text-2xl text-retro-navy uppercase tracking-widest flex items-center gap-2">
                <Plus className="w-6 h-6" />
                Add New Drive-In
              </h2>
              <button 
                onClick={onClose}
                className="p-1 md:hover:bg-white/20 rounded-full transition-colors text-retro-navy cursor-pointer active:scale-90"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-retro text-retro-cyan uppercase">Theater Name</label>
                  <input
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Starlight Drive-In"
                    className="w-full bg-retro-navy border-2 border-retro-cyan/30 focus:border-retro-cyan p-3 rounded text-white outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-retro text-retro-cyan uppercase">Website URL</label>
                  <input
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full bg-retro-navy border-2 border-retro-cyan/30 focus:border-retro-cyan p-3 rounded text-white outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-retro text-retro-cyan uppercase">Street Address</label>
                <input
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Movie Lane"
                  className="w-full bg-retro-navy border-2 border-retro-cyan/30 focus:border-retro-cyan p-3 rounded text-white outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="col-span-2 space-y-1">
                  <label className="text-xs font-retro text-retro-cyan uppercase">City</label>
                  <input
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full bg-retro-navy border-2 border-retro-cyan/30 focus:border-retro-cyan p-3 rounded text-white outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-retro text-retro-cyan uppercase">State (Short)</label>
                  <input
                    required
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="VA"
                    maxLength={2}
                    className="w-full bg-retro-navy border-2 border-retro-cyan/30 focus:border-retro-cyan p-3 rounded text-white outline-none transition-all uppercase"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-retro text-retro-cyan uppercase">State (Long)</label>
                  <input
                    required
                    name="state_long"
                    value={formData.state_long}
                    onChange={handleChange}
                    placeholder="Virginia"
                    className="w-full bg-retro-navy border-2 border-retro-cyan/30 focus:border-retro-cyan p-3 rounded text-white outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-retro text-retro-cyan uppercase">Latitude</label>
                  <input
                    required
                    type="number"
                    step="any"
                    name="lat"
                    value={formData.lat}
                    onChange={handleChange}
                    placeholder="36.6763"
                    className="w-full bg-retro-navy border-2 border-retro-cyan/30 focus:border-retro-cyan p-3 rounded text-white outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-retro text-retro-cyan uppercase">Longitude</label>
                  <input
                    required
                    type="number"
                    step="any"
                    name="lng"
                    value={formData.lng}
                    onChange={handleChange}
                    placeholder="-82.0484"
                    className="w-full bg-retro-navy border-2 border-retro-cyan/30 focus:border-retro-cyan p-3 rounded text-white outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-retro text-retro-cyan uppercase">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell us about this theater..."
                  rows={3}
                  className="w-full bg-retro-navy border-2 border-retro-cyan/30 focus:border-retro-cyan p-3 rounded text-white outline-none transition-all resize-none"
                />
              </div>

              {error && (
                <p className="text-retro-pink text-xs font-retro text-center animate-pulse">
                  {error}
                </p>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-retro-pink text-white font-retro py-4 rounded-xl text-lg shadow-[0_0_20px_rgba(255,0,128,0.4)] md:hover:shadow-[0_0_30px_rgba(255,0,128,0.6)] transition-all touch-manipulation uppercase tracking-widest cursor-pointer active:scale-95 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Adding...' : 'Add to Collection'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
