import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { auth, db } from '@/firebase';
import { updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const regions = ['Asia Pacific', 'North America', 'Europe', 'Latin America', 'Middle East & Africa'];

const ProfileSetup = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [formData, setFormData] = useState({
    fullName: user?.displayName || '',
    photoURL: user?.photoURL || '',
    region: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFormData(prev => ({
            ...prev,
            region: userData.region || ''
          }));
        }
      }
      setLoading(false);
    };
    fetchUserData();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  
  const handleRegionChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      region: value
    }));
  };

  const handleSaveProfile = async () => {
    if (user) {
      try {
        setLoading(true);
        // Update Firebase Auth profile
        await updateProfile(user, {
          displayName: formData.fullName,
          photoURL: formData.photoURL,
        });
        
        // Save additional data to Firestore
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, {
          fullName: formData.fullName,
          email: user.email,
          photoURL: formData.photoURL,
          region: formData.region,
        }, { merge: true });

        console.log('Profile updated successfully!');
        navigate('/dashboard');
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const getUserInitials = (name: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#141110] via-[#2a1f1a] to-back p-4 relative overflow-hidden font-chakra">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 bg-[#EE5946]/5 rounded-full blur-xl animate-pulse"
            style={{
              left: `${12 * (i + 1)}%`,
              top: `${10 * (i + 1)}%`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30"></div>
      </div>
      
      <Card className="w-full max-w-4xl bg-white/10 border border-white/20 text-white rounded-2xl shadow-2xl backdrop-blur-xl z-10">
        <div className="grid md:grid-cols-2">
          {/* Left Side - Visuals and Welcome Text */}
          <div className="p-8 hidden md:flex flex-col items-center justify-center bg-black/30 rounded-l-2xl">
            <h1 className="text-4xl font-bold text-accent mb-2">Welcome to Skor AI</h1>
            <p className="text-lg text-gray-400 text-center">
              Create your profile to unlock a world of competitive gaming.
            </p>
            
          </div>

          {/* Right Side - Profile Setup Form */}
          <div className="p-8 md:p-12">
            <CardHeader className="p-0 text-center mb-6">
              <div className="flex justify-center mb-4">
                <Avatar className="w-24 h-24 border-2 border-accent transition-all duration-300 transform hover:scale-105">
                  <AvatarImage src={formData.photoURL} alt={formData.fullName} />
                  <AvatarFallback className="bg-accent text-white text-3xl">
                    {getUserInitials(formData.fullName)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-3xl font-bold text-white">Complete Your Profile</CardTitle>
              <CardDescription className="text-gray-400">Add a few more details to get started.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-white/80">Full Name</Label>
                <Input 
                  id="fullName"
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleChange} 
                  placeholder="Your Name" 
                  className="w-full bg-white/5 border-white/20 text-white placeholder-gray-500 focus:ring-accent focus:border-accent transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="photoURL" className="text-white/80">Profile Picture URL</Label>
                <Input 
                  id="photoURL"
                  name="photoURL" 
                  value={formData.photoURL} 
                  onChange={handleChange} 
                  placeholder="Enter image URL" 
                  className="w-full bg-white/5 border-white/20 text-white placeholder-gray-500 focus:ring-accent focus:border-accent transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="region" className="text-white/80">Region</Label>
                <Select onValueChange={handleRegionChange} value={formData.region}>
                  <SelectTrigger id="region" className="w-full bg-white/5 border-white/20 text-white placeholder-gray-500 focus:ring-accent focus:border-accent transition-colors">
                    <SelectValue placeholder="Select a region" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/20 text-white">
                    {regions.map(region => (
                      <SelectItem key={region} value={region} className="hover:bg-accent/20 cursor-pointer">
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="pt-4">
                <Button 
                  onClick={handleSaveProfile}
                  className="w-full bg-accent hover:bg-accent/90 transition-all duration-300 transform hover:scale-105"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Profile'}
                </Button>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileSetup;