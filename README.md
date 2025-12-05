# Recon: SainiON • crt.sh → Wayback
A passive reconnaissance toolkit for security researchers.  
Fetch subdomains from **crt.sh**, discover archived endpoints via the **Wayback Machine**, and quickly explore historical paths and sensitive file extensions — all in a clean, modern browser extension UI.

<img width="522" height="382" alt="image" src="https://github.com/user-attachments/assets/8e9b16b5-2c15-41cc-a478-b238951fc5db" />


## 🚀 Features
- Subdomain extraction using crt.sh (Certificate Transparency)
- Wildcard subdomain crawling via Wayback CDX API
- Domain-only and path-specific archive crawling
- Sensitive file extension discovery (archived only)
- Hacker-themed UI with dark mode and icons
- Built for passive recon (no interaction with live targets)

## 🔐 Privacy
No personal data is collected, stored, or transmitted.  
All queries go only to public data sources and run locally in your browser.

## 🛠 Tech Stack
- Firefox WebExtension API (Manifest V2)
- JavaScript service worker + CDX API queries
- crt.sh JSON CT log extraction

## 📥 Installation
1. Download the `.zip` from the Releases page  
2. Open `about:debugging` → This Firefox → Load Temporary Add-on  
3. Select `manifest.json`

## 💬 Attribution
Powered by **SainiON Hacks**  
- YouTube: https://youtube.com/@SainiONHacks  
- Support: https://buymeacoffee.com/SainiON
