import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Power, Loader2 } from "lucide-react";

export default function ConnectionButton({ 
  isConnected, 
  isConnecting, 
  onConnect, 
  onDisconnect,
  selectedServer 
}) {
  const handleClick = () => {
    if (isConnecting) return;
    
    if (isConnected) {
      onDisconnect();
    } else {
      onConnect();
    }
  };

  const getButtonText = () => {
    if (isConnecting) return "Connecting...";
    if (isConnected) return "Disconnect";
    return "Connect";
  };

  const getStatusColor = () => {
    if (isConnected) return "from-green-500 to-green-600";
    if (isConnecting) return "from-blue-500 to-blue-600";
    return "from-slate-500 to-slate-600";
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <Button
          onClick={handleClick}
          disabled={isConnecting || !selectedServer}
          className={`w-32 h-32 rounded-full bg-gradient-to-br ${getStatusColor()} hover:scale-105 transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isConnecting ? (
            <Loader2 className="w-12 h-12 text-white animate-spin" />
          ) : (
            <Power className="w-12 h-12 text-white" />
          )}
        </Button>

        {/* Pulse animation for connected state */}
        {isConnected && (
          <div className="absolute inset-0 rounded-full bg-green-500/30 animate-ping"></div>
        )}
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
          {getButtonText()}
        </h2>
        {selectedServer && (
          <p className="text-slate-600 dark:text-slate-400">
            {selectedServer.flag} {selectedServer.name}
          </p>
        )}
      </div>
    </div>
  );
}
