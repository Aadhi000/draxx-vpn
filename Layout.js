import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, Server, Settings } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const navigationItems = [
    {
      title: "Dashboard",
      url: createPageUrl("Dashboard"),
      icon: Home,
    },
    {
      title: "Servers", 
      url: createPageUrl("Servers"),
      icon: Server,
    },
    {
      title: "Settings",
      url: createPageUrl("Settings"),
      icon: Settings,
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Main Content */}
      <main className="pb-20 md:pb-0">
        {children}
      </main>

      {/* Bottom Navigation for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-700 md:hidden">
        <div className="flex justify-around items-center py-2">
          {navigationItems.map((item) => (
            <Link
              key={item.title}
              to={item.url}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${
                location.pathname === item.url
                  ? "text-blue-500 bg-blue-50 dark:bg-blue-500/10"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.title}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <nav className="hidden md:fixed md:left-0 md:top-0 md:h-full md:w-64 md:flex md:flex-col md:bg-white/80 md:dark:bg-slate-900/80 md:backdrop-blur-xl md:border-r md:border-slate-200 md:dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">DR</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">DRAXX VPN</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Secure Connection</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                to={item.url}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  location.pathname === item.url
                    ? "bg-blue-500 text-white shadow-lg"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Legal Notice:</strong> DRAXX VPN is intended for secure, legal use only. Do not use it to break laws or access restricted content illegally. You are responsible for usage in your region.
            </p>
          </div>
        </div>
      </nav>

      {/* Desktop Main Content */}
      <div className="hidden md:block md:ml-64">
        {children}
      </div>

      <style jsx>{`
        .dark {
          color-scheme: dark;
        }
      `}</style>
    </div>
  );
}
