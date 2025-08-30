import React from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ theme, onThemeChange }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-medium text-slate-900 dark:text-white">Theme</span>
      <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        <Button
          variant={theme === "light" ? "default" : "ghost"}
          size="sm"
          onClick={() => onThemeChange("light")}
          className={`rounded-none ${
            theme === "light" 
              ? "bg-blue-500 hover:bg-blue-600 text-white" 
              : "text-slate-600 dark:text-slate-400"
          }`}
        >
          <Sun className="w-4 h-4 mr-2" />
          Light
        </Button>
        <Button
          variant={theme === "dark" ? "default" : "ghost"}
          size="sm"
          onClick={() => onThemeChange("dark")}
          className={`rounded-none border-l border-slate-200 dark:border-slate-700 ${
            theme === "dark" 
              ? "bg-blue-500 hover:bg-blue-600 text-white" 
              : "text-slate-600 dark:text-slate-400"
          }`}
        >
          <Moon className="w-4 h-4 mr-2" />
          Dark
        </Button>
      </div>
    </div>
  );
}
