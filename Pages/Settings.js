import React, { useState, useEffect, useCallback } from "react";
import { AppSettings } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ThemeToggle from "../components/settings/ThemeToggle";
import PWAInstallButton from "../components/settings/PWAInstallButton";
import { Shield, Globe, Bell, Smartphone } from "lucide-react";

export default function Settings() {
  const [settings, setSettings] = useState({
    theme: "dark",
    killSwitch: true,
    autoReconnect: true,
    dnsProvider: "cloudflare",
    customDns: "",
    notifications: true
  });

  const loadSettings = useCallback(async () => {
    try {
      const savedSettings = await AppSettings.list();
      if (savedSettings.length > 0) {
        setSettings(prevSettings => ({ ...prevSettings, ...savedSettings[0] }));
      }
    } catch (error) {
      console.log("No saved settings found, using defaults");
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  useEffect(() => {
    // Apply theme changes
    document.documentElement.classList.toggle("dark", settings.theme === "dark");
  }, [settings.theme]);

  const updateSetting = async (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);

    try {
      const existingSettings = await AppSettings.list();
      if (existingSettings.length > 0) {
        await AppSettings.update(existingSettings[0].id, newSettings);
      } else {
        await AppSettings.create(newSettings);
      }
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Settings</h1>
          <p className="text-slate-600 dark:text-slate-400">Configure your VPN preferences</p>
        </div>

        <div className="space-y-6">
          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-blue-500" />
                Appearance & App
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ThemeToggle 
                theme={settings.theme}
                onThemeChange={(theme) => updateSetting("theme", theme)}
              />
              
              <div>
                <Label className="text-base font-medium text-slate-900 dark:text-white mb-3 block">
                  Install Progressive Web App
                </Label>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  Install DRAXX VPN as a native app on your device for better performance and offline access.
                </p>
                <PWAInstallButton />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-500" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium text-slate-900 dark:text-white">
                    Kill Switch
                  </Label>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Block internet if VPN disconnects unexpectedly
                  </p>
                </div>
                <Switch
                  checked={settings.killSwitch}
                  onCheckedChange={(checked) => updateSetting("killSwitch", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium text-slate-900 dark:text-white">
                    Auto-Reconnect
                  </Label>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Automatically reconnect if connection drops
                  </p>
                </div>
                <Switch
                  checked={settings.autoReconnect}
                  onCheckedChange={(checked) => updateSetting("autoReconnect", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* DNS Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-500" />
                DNS Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium text-slate-900 dark:text-white mb-3 block">
                  DNS Provider
                </Label>
                <Select
                  value={settings.dnsProvider}
                  onValueChange={(value) => updateSetting("dnsProvider", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select DNS provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cloudflare">Cloudflare (1.1.1.1)</SelectItem>
                    <SelectItem value="quad9">Quad9 (9.9.9.9)</SelectItem>
                    <SelectItem value="custom">Custom DNS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {settings.dnsProvider === "custom" && (
                <div>
                  <Label className="text-base font-medium text-slate-900 dark:text-white mb-3 block">
                    Custom DNS Server
                  </Label>
                  <Input
                    placeholder="8.8.8.8"
                    value={settings.customDns}
                    onChange={(e) => updateSetting("customDns", e.target.value)}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-500" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium text-slate-900 dark:text-white">
                    Enable Notifications
                  </Label>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Get notified about connection status changes
                  </p>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(checked) => updateSetting("notifications", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
