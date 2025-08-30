import React, { useState, useEffect, useCallback } from "react";
import { VpnServer } from "@/entities/all";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, Star, Zap } from "lucide-react";
import ServerCard from "../components/servers/ServerCard";

export default function Servers() {
  const [servers, setServers] = useState([]);
  const [filteredServers, setFilteredServers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [connectedServerId, setConnectedServerId] = useState(null);

  const loadServers = useCallback(async () => {
    const serverList = await VpnServer.list();
    setServers(serverList);
  }, []);

  const filterServers = useCallback(() => {
    let filtered = servers;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(server =>
        server.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        server.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        server.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by tab
    if (activeTab === "favorites") {
      filtered = filtered.filter(server => server.favorite);
    }

    // Sort by latency by default
    filtered.sort((a, b) => (a.lastLatencyMs || 999) - (b.lastLatencyMs || 999));

    setFilteredServers(filtered);
  }, [servers, searchTerm, activeTab]);

  useEffect(() => {
    loadServers();
  }, [loadServers]);

  useEffect(() => {
    filterServers();
  }, [filterServers]);

  const handleConnect = async (server) => {
    if (connectedServerId === server.id) {
      setConnectedServerId(null);
    } else {
      setConnectedServerId(server.id);
    }
  };

  const handleToggleFavorite = async (serverId) => {
    const server = servers.find(s => s.id === serverId);
    if (server) {
      await VpnServer.update(serverId, { favorite: !server.favorite });
      loadServers();
    }
  };

  const handleSmartConnect = () => {
    if (filteredServers.length > 0) {
      // Connect to server with lowest latency
      const bestServer = filteredServers[0];
      handleConnect(bestServer);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">VPN Servers</h1>
          <p className="text-slate-600 dark:text-slate-400">Choose from our global server network</p>
        </div>

        {/* Controls */}
        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Search servers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600"
              />
            </div>
            <Button
              onClick={handleSmartConnect}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <Zap className="w-4 h-4 mr-2" />
              Smart Connect
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full bg-slate-100 dark:bg-slate-700">
              <TabsTrigger value="all" className="flex-1">All Servers</TabsTrigger>
              <TabsTrigger value="favorites" className="flex-1">
                <Star className="w-4 h-4 mr-2" />
                Favorites
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Server Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServers.map((server) => (
            <ServerCard
              key={server.id}
              server={server}
              onConnect={handleConnect}
              onToggleFavorite={handleToggleFavorite}
              isConnected={connectedServerId === server.id}
            />
          ))}
        </div>

        {filteredServers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              {searchTerm ? "No servers match your search" : "No servers available"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
