{
  "name": "AppSettings",
  "type": "object",
  "properties": {
    "theme": {
      "type": "string",
      "enum": [
        "dark",
        "light"
      ],
      "default": "dark",
      "description": "App theme preference"
    },
    "killSwitch": {
      "type": "boolean",
      "default": true,
      "description": "Kill switch enabled"
    },
    "autoReconnect": {
      "type": "boolean",
      "default": true,
      "description": "Auto-reconnect on disconnect"
    },
    "dnsProvider": {
      "type": "string",
      "enum": [
        "cloudflare",
        "quad9",
        "custom"
      ],
      "default": "cloudflare",
      "description": "DNS over HTTPS provider"
    },
    "customDns": {
      "type": "string",
      "description": "Custom DNS server address"
    },
    "notifications": {
      "type": "boolean",
      "default": true,
      "description": "Enable notifications"
    }
  },
  "required": [],
  "rls": {
    "read": {
      "created_by": "{{user.email}}"
    },
    "write": {
      "created_by": "{{user.email}}"
    }
  }
}
