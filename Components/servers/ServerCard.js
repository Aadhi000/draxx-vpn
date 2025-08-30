import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Zap, Users, Play } from "lucide-react";

export default function ServerCard({ server, onConnect, onToggleFavorite, isConnected }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    await onConnect(server);
    setIsLoading(false);
  };

  const getLoadColor = (load) => {
    if (load < 30) return "text-green-500";
    if (load < 70) return "text-yellow-500";
    return "text-red-500";
  };

  const getLatencyColor = (latency) => {
    if (latency < 50) return "text-green-500";
    if (latency < 150) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <Card className={`transition-all duration-200 hover:shadow-lg ${
      isConnected ? "ring-2 ring-green-500 bg-green-50/50 dark:bg-green-900/10" : ""
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl" title={server.country}>
              {server.flag}
            </span>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {server.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {server.city}, {server.country}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleFavorite(server.id)}
            className="text-slate-400 hover:text-yellow-500"
          >
            <Star 
              className={`w-4 h-4 ${
                server.favorite ? "fill-yellow-500 text-yellow-500" : ""
              }`} 
            />
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-slate-500" />
            <span className={`text-sm font-medium ${getLatencyColor(server.lastLatencyMs)}`}>
              {server.lastLatencyMs || 0}ms
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-slate-500" />
            <span className={`text-sm font-medium ${getLoadColor(server.load)}`}>
              {server.load || 0}%
            </span>
          </div>
          <Badge 
            variant="outline" 
            className="text-xs"
          >
            {server.protocol.toUpperCase()}
          </Badge>
        </div>

        <Button
          onClick={handleConnect}
          disabled={isLoading}
          className={`w-full ${
            isConnected 
              ? "bg-red-500 hover:bg-red-600 text-white" 
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Connecting...
            </div>
          ) : isConnected ? (
            "Disconnect"
          ) : (
            <div className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              Connect
            </div>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
