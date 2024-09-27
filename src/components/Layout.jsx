import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Plus, BookmarkPlus, HelpCircle } from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home },
    { path: '/upload', icon: Plus },
    { path: '/bookmark', icon: BookmarkPlus },
    { path: '/faq', icon: HelpCircle },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation Bar */}
      <header className="bg-blue-500 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">Open س</h1>
      </header>

      <main className="flex-grow w-full">{children}</main>

      {/* Bottom Navigation Bar */}
      <nav className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex justify-around">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center py-4 px-3 ${
                  location.pathname === item.path
                    ? 'text-blue-500'
                    : 'text-gray-500 hover:text-blue-500'
                }`}
              >
                <item.icon className="h-6 w-6" />
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Layout;