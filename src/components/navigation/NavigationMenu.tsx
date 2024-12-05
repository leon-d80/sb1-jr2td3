import React from 'react';

interface NavigationItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface NavigationMenuProps {
  isOpen: boolean;
  items: NavigationItem[];
  onSelect: (href: string) => void;
  onClose: () => void;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  isOpen,
  items,
  onSelect,
  onClose,
}) => {
  return (
    <div
      className={`absolute left-0 bottom-0 bg-white rounded-r-lg shadow-xl transition-all duration-300 transform ${
        isOpen ? 'translate-x-12' : '-translate-x-full'
      }`}
    >
      <nav className="py-2">
        {items.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              onSelect(item.href);
            }}
          >
            <span className="text-blue-600">{item.icon}</span>
            <span className="ml-3 whitespace-nowrap">{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
};