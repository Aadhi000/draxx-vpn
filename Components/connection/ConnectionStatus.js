import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Clock, Zap, Shield } from "lucide-react";

export default function ConnectionStatus({ isConnected, selectedServer, connectionTime }) {
  const [currentIp, setCurrentIp] = useState("Loading...");
  const [latency, setLatency] = useState(0);

  useEffect(() => {
    // Simulate IP fetching
    const fetchIp = async () => {
      try {
        if (isConnected) {
          setCurrentIp("203.0.113.42"); // Mock connected IP
        } else {
          setCurrentIp("192.168.1.100"); // Mock local IP
        }
      } catch (error) {
        setCurrentIp("Unable to fetch");
      }
    };

    fetchIp();
  }, [isConnected]);

  useEffect(() => {
    // Simulate latency updates
    if (isConnected && selectedServer) {
      const interval = setInterval(() => {
        setLatency(selectedServer.lastLatencyMs + Math.floor(Math.random() * 20 - 10));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isConnected, selectedServer]);

  const formatUptime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    }
    return `${secs}s`;
  };

  return (
    <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Globe className="w-5 h-5 text-blue-500 mr-2" />
              <Badge 
                variant={isConnected ? "default" : "secondary"}
                className={`${
                  isConnected 
                    ? "bg-green-500 hover:bg-green-600" 
                    : "bg-slate-500 hover:bg-slate-600"
                }`}
              >
                {isConnected ? "Connected" : "Disconnected"}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Status</p>
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Shield className="w-5 h-5 text-blue-500 mr-2" />
              <span className="font-mono text-sm text-slate-900 dark:text-white">
                {currentIp}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Public IP</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Zap className="w-5 h-5 text-blue-500 mr-2" />
              <span className="font-mono text-sm text-slate-900 dark:text-white">
                {isConnected ? `${latency}ms` : "—"}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Latency</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-5 h-5 text-blue-500 mr-2" />
              <span className="font-mono text-sm text-slate-900 dark:text-white">
                {isConnected ? formatUptime(connectionTime) : "—"}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Uptime</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
