import React from 'react';
import type { UserProfile } from '../types';

interface ProfileCardProps {
  profile: UserProfile;
  onSelect: (profile: UserProfile) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onSelect }) => {
  const { name, description, icon, colorClasses } = profile;
  
  return (
    <div 
        className={`flex flex-col text-center items-center p-6 bg-white rounded-xl shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl cursor-pointer hover:ring-2 ${colorClasses.ring}`} 
        onClick={() => onSelect(profile)}
    >
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${colorClasses.bg} ${colorClasses.button}`}>
        {icon}
      </div>
      <h3 className={`text-lg font-bold mb-2 ${colorClasses.text}`}>{name}</h3>
      <p className="text-sm text-gray-500 flex-grow mb-4">{description}</p>
      <div 
        className={`w-full mt-auto text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 ${colorClasses.button} ${colorClasses.buttonHover}`}
      >
        Acessar
      </div>
    </div>
  );
};
