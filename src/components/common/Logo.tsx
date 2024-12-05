import React from 'react';
import { useSettingsStore } from '../../stores/settingsStore';
import { Upload } from 'lucide-react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showUpload?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'medium', showUpload = false }) => {
  const { logo, updateLogo } = useSettingsStore();

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const sizeClasses = {
    small: 'h-8 w-auto',
    medium: 'h-12 w-auto',
    large: 'h-16 w-auto'
  };

  return (
    <div className="flex flex-col items-center">
      {logo ? (
        <img
          src={logo}
          alt="咔咔染 Logo"
          className={`${sizeClasses[size]} object-contain`}
        />
      ) : (
        <div className={`${sizeClasses[size]} flex items-center justify-center text-2xl font-bold text-gray-700`}>
          咔咔染
        </div>
      )}
      
      {showUpload && (
        <div className="mt-4">
          <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <Upload className="w-4 h-4 mr-2" />
            上传 Logo
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  );
};