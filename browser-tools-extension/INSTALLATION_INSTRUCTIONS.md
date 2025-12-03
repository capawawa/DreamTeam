# BrowserTools MCP Chrome Extension Installation Guide

## Overview
This guide provides step-by-step instructions for installing the **BrowserTools MCP Chrome Extension v1.2.0**. This extension is part of the three-component BrowserTools MCP system that enables AI code editors to capture browser data including console logs, network requests, screenshots, and more.

## Prerequisites

### System Requirements
- **Google Chrome** or **Chromium-based browser** (Edge, Brave, etc.)
- **Chrome Developer Mode** access
- **BrowserTools MCP Server** already installed and configured
- **Node.js** environment (for MCP server functionality)

### Verify MCP Server Installation
Before installing the extension, ensure the BrowserTools MCP server is properly configured:
```bash
npx @agentdeskai/browser-tools-mcp@latest --help
```

## Installation Steps

### Step 1: Enable Chrome Developer Mode
1. Open **Google Chrome**
2. Navigate to `chrome://extensions/`
3. In the top-right corner, toggle **"Developer mode"** to **ON**
4. You should now see additional buttons: "Load unpacked", "Pack extension", "Update"

### Step 2: Load the Extension
1. Click the **"Load unpacked"** button
2. Navigate to your project directory: `d:\repos\DreamTeam\browser-tools-extension\`
3. Select the **`chrome-extension`** folder (NOT the parent folder)
4. Click **"Select Folder"**

### Step 3: Verify Installation
After successful installation, you should see:
- **Extension Card**: "BrowserTools MCP" v1.2.0 in your extensions list
- **Extension ID**: Chrome will assign a unique ID (e.g., `abcdefghijklmnopqrstuvwxyz123456`)
- **Status**: Extension should show as "Enabled"
- **Permissions**: The extension requests permissions for:
  - Active tab access
  - Debugger API
  - Storage access
  - Tab capture
  - All URLs access

### Step 4: Pin the Extension (Recommended)
1. Click the **Extensions puzzle icon** in Chrome's toolbar
2. Find "BrowserTools MCP" in the dropdown
3. Click the **pin icon** to pin it to your toolbar for easy access

### Step 5: Verify DevTools Integration
1. Open any webpage in Chrome
2. Right-click and select **"Inspect"** or press `F12`
3. In Chrome DevTools, look for a new **"BrowserTools"** panel/tab
4. If you see the BrowserTools panel, the extension is properly integrated

## Configuration & Usage

### Connecting to MCP Server
The extension automatically communicates with:
- **BrowserTools MCP Server** (already configured in your `mcp_settings.json`)
- **Browser-tools-server middleware** (if running)

### Available Features
Once installed, the extension provides:
- ✅ **Console log capture**
- ✅ **Network request monitoring**
- ✅ **Screenshot functionality**
- ✅ **Element selection tools**
- ✅ **Performance auditing**
- ✅ **Accessibility analysis**
- ✅ **Error tracking**

## Troubleshooting

### Extension Not Loading
**Problem**: Extension doesn't appear after loading
**Solutions**:
1. Ensure you selected the `chrome-extension` folder, not the parent folder
2. Check that all required files are present:
   - `manifest.json`
   - `background.js`
   - `devtools.html` & `devtools.js`
   - `panel.html` & `panel.js`
3. Refresh the extensions page (`chrome://extensions/`)
4. Check for errors in the extension card details

### Permission Denied Errors
**Problem**: Extension shows permission errors
**Solutions**:
1. Ensure Developer Mode is enabled
2. Re-install the extension by removing and re-adding it
3. Grant all requested permissions when prompted

### DevTools Panel Missing
**Problem**: BrowserTools panel doesn't appear in DevTools
**Solutions**:
1. Close and reopen DevTools (`F12`)
2. Restart Chrome completely
3. Verify the extension is enabled in `chrome://extensions/`
4. Check for JavaScript errors in the extension's background page

### MCP Communication Issues
**Problem**: Extension can't communicate with MCP server
**Solutions**:
1. Verify BrowserTools MCP server is running
2. Check `mcp_settings.json` configuration
3. Ensure no firewall blocking local connections
4. Restart the MCP server

## File Structure
```
browser-tools-extension/
├── BrowserTools-1.2.0-extension.zip  # Original download
├── chrome-extension/                  # Main extension folder
│   ├── manifest.json                 # Extension configuration
│   ├── background.js                 # Background service worker
│   ├── devtools.html                 # DevTools page template
│   ├── devtools.js                   # DevTools integration
│   ├── panel.html                    # Extension UI panel
│   └── panel.js                      # Panel functionality
└── INSTALLATION_INSTRUCTIONS.md      # This file
```

## Security Considerations

### Permissions Explanation
The extension requires extensive permissions for full functionality:
- **`activeTab`**: Access current tab content
- **`debugger`**: Monitor network requests and console logs
- **`storage`**: Store extension settings and captured data
- **`tabs`**: Manage tab information
- **`tabCapture`**: Capture screenshots and recordings
- **`<all_urls>`**: Work on any website

### Data Privacy
- The extension only processes data locally
- No data is sent to external servers without explicit user action
- All captured data remains within your local environment

## Integration with AI Code Editors

Once installed, the extension works seamlessly with:
- **Roo/Cline** with BrowserTools MCP integration
- **Cursor** with MCP support
- **VS Code** with compatible MCP clients
- Any AI assistant supporting the BrowserTools MCP protocol

## Next Steps

1. **Test the installation** by opening DevTools and verifying the BrowserTools panel
2. **Run a simple audit** using the extension's tools
3. **Integrate with your AI workflow** through the MCP server
4. **Explore advanced features** like automated testing and performance monitoring

## Support & Updates

### Getting Help
- Check the [BrowserTools MCP GitHub repository](https://github.com/AgentDeskAI/browser-tools-mcp)
- Review MCP server logs for connection issues
- Ensure all components are using compatible versions

### Updates
To update the extension:
1. Download the latest version from GitHub releases
2. Extract to the same directory (overwriting existing files)
3. Go to `chrome://extensions/`
4. Click the "Update" button or refresh the page

---

## Installation Complete! 🎉

The BrowserTools MCP Chrome Extension is now ready to use. You can start capturing browser data, running audits, and integrating with your AI development workflow.

**Extension Version**: 1.2.0  
**Installation Date**: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")  
**Installation Path**: `d:\repos\DreamTeam\browser-tools-extension\chrome-extension\`