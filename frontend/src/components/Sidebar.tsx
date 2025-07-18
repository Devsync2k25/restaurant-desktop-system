import React from 'react';
import NotificationBell from './NotificationBell';

interface NavItem {
  name: string;
  icon: React.ReactNode;
  roles?: string[];
}

interface SidebarProps {
  currentUser: any;
  activePage: string;
  setActivePage: (page: string) => void;
  handleLogout: () => void;
  navItems: NavItem[];
  uploadedLogo?: string | null;
  settingsLogo?: string;
  orderNotifications?: any[];
  onAcknowledgeNotification?: (id: string) => void;
  onCompleteNotification?: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentUser, 
  activePage, 
  setActivePage, 
  handleLogout, 
  navItems,
  uploadedLogo,
  settingsLogo,
  orderNotifications = [],
  onAcknowledgeNotification = () => {},
  onCompleteNotification = () => {}
}) => {
  return (
    <aside className="fixed top-0 left-0 h-full w-60 bg-slate-900 text-white flex flex-col py-8 px-4 z-20">
      <div className="text-xl font-bold mb-10 pl-2">Coral Gardens</div>
      <div className="text-sm text-gray-400 mb-4 pl-2">
        Welcome, {currentUser.name}
        <div className="text-xs text-gray-500 mt-1">{currentUser.role}</div>
        {['Warehouse Manager', 'Stores Manager'].includes(currentUser.role) && (
          <div className="mt-2">
            <NotificationBell
              notifications={orderNotifications}
              onAcknowledge={onAcknowledgeNotification}
              onComplete={onCompleteNotification}
              currentUserRole={currentUser.role}
            />
          </div>
        )}
      </div>
      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => (
          <div
            key={item.name}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all
              ${activePage === item.name ? 'bg-slate-800 text-blue-400 font-bold' : 'hover:bg-slate-800 text-slate-300'}`}
            onClick={() => setActivePage(item.name)}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </nav>
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-800 text-slate-300 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
      {(uploadedLogo || settingsLogo) && (
        <div className="flex justify-center mb-4">
          <img
            src={uploadedLogo || settingsLogo}
            alt="Logo"
            className="h-16 w-auto object-contain rounded"
            style={{ maxHeight: 64 }}
          />
        </div>
      )}
    </aside>
  );
};

export default Sidebar; 