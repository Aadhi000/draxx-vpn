import React, { useState, useEffect, useCallback } from "react";
import { VpnServer, AppSettings } from "@/entities/all";
import ConnectionButton from "../components/connection/ConnectionButton";
import ConnectionStatus from "../components/connection/ConnectionStatus";

export default function Dashboard() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedServer, setSelectedServer] = useState(null);
  const [connectionTime, setConnectionTime] = useState(0);
  const [servers, setServers] = useState([]);

  const loadServers = useCallback(async () => {
    const serverList = await VpnServer.list();
    setServers(serverList);
    
    // Auto-select first server if none selected
    // Only auto-select if selectedServer is null, to avoid re-selecting when a server is already chosen.
    if (serverList.length > 0 && !selectedServer) {
      setSelectedServer(serverList[0]);
    }
  }, [selectedServer]); // selectedServer is a dependency because its value is used in the if condition.

  useEffect(() => {
    loadServers();
  }, [loadServers]); // loadServers is now a stable function thanks to useCallback

  useEffect(() => {
    let interval;
    if (isConnected) {
      interval = setInterval(() => {
        setConnectionTime(prev => prev + 1);
      }, 1000);
    } else {
      setConnectionTime(0);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  const handleConnect = async () => {
    if (!selectedServer) return;

    setIsConnecting(true);
    
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsConnected(true);
    setIsConnecting(false);
  };

  const handleDisconnect = async () => {
    setIsConnecting(true);
    
    // Simulate disconnection process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsConnected(false);
    setIsConnecting(false);
    setConnectionTime(0);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:hidden">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">DR</span>
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">DRAXX VPN</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">Secure Connection</p>
            </div>
          </div>
        </div>

        {/* Main Connection Area */}
        <div className="bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm rounded-3xl p-8 mb-6 text-center">
          <ConnectionButton
            isConnected={isConnected}
            isConnecting={isConnecting}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
            selectedServer={selectedServer}
          />
        </div>

        {/* Connection Status */}
        <ConnectionStatus
          isConnected={isConnected}
          selectedServer={selectedServer}
          connectionTime={connectionTime}
        />

        {/* Quick Server Selection */}
        {selectedServer && (
          <div className="mt-6 bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Current Server</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedServer.flag}</span>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {selectedServer.name}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {selectedServer.city}, {selectedServer.country}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-600 dark:text-slate-400">Latency</p>
                <p className="font-semibold text-green-500">{selectedServer.lastLatencyMs}ms</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
