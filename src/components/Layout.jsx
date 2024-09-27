import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Upload, BookmarkPlus, HelpCircle } from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'الرئيسية' },
    { path: '/schedule', icon: Calendar, label: 'الجدول' },
    { path: '/upload', icon: Upload, label: 'رفع' },
    { path: '/bookmark', icon: BookmarkPlus, label: 'حفظ' },
    { path: '/faq', icon: HelpCircle, label: 'الأسئلة الشائعة' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">{children}</main>
      <nav className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex justify-around">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center py-2 px-3 text-xs ${
                  location.pathname === item.path
                    ? 'text-blue-500'
                    : 'text-gray-500 hover:text-blue-500'
                }`}
              >
                <item.icon className="h-6 w-6 mb-1" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Layout;