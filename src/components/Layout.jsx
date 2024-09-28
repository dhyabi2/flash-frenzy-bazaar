import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Plus, BookmarkPlus, HelpCircle } from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home },
    { path: '/upload', icon: Plus },
    { path: '/bookmarks', icon: BookmarkPlus },
    { path: '/faq', icon: HelpCircle },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-elegant-light">
      {/* Top Navigation Bar */}
      <header className="bg-deal-dark text-white p-4 text-center shadow-lg">
        <h1 className="text-2xl font-bold">مسقط اليوم</h1>
      </header>

      <main className="flex-grow w-full">{children}</main>

      {/* Bottom Navigation Bar */}
      <nav className="bg-white border-t border-elegant-dark fixed bottom-0 left-0 right-0 shadow-lg">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex justify-around">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center py-4 px-3 ${
                  location.pathname === item.path
                    ? 'text-deal-dark'
                    : 'text-elegant-dark hover:text-deal transition-colors'
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