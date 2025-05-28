import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Instagram, Home, Search, Heart, PlusSquare, User, LogOut } from 'lucide-react';

export default function Header() {
  const { user, logout } = useAuth();
  
  if (!user) return null;
  
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link to="/feed" className="flex items-center space-x-2">
          <Instagram className="w-8 h-8 text-pink-500" />
          <span className="hidden text-xl font-semibold sm:inline-block">Instaclone</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/feed" className="p-2 text-gray-700 hover:text-pink-500">
            <Home className="w-6 h-6" />
          </Link>
          <button className="p-2 text-gray-700 hover:text-pink-500">
            <Search className="w-6 h-6" />
          </button>
          <button className="p-2 text-gray-700 hover:text-pink-500">
            <PlusSquare className="w-6 h-6" />
          </button>
          <button className="p-2 text-gray-700 hover:text-pink-500">
            <Heart className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-2">
            <img 
              src={user.avatar} 
              alt={user.username}
              className="w-8 h-8 rounded-full"
            />
            <span className="hidden text-sm font-medium md:inline-block">{user.username}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={logout}
              className="text-gray-700 hover:text-red-500"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}