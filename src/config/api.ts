/**
 * API Configuration
 *
 * RECOMMENDED: Gunakan NGROK untuk development!
 *
 * Setup ngrok:
 * 1. Install ngrok: https://ngrok.com/download
 * 2. Jalankan: ngrok http 8000
 * 3. Copy HTTPS URL dari ngrok (contoh: https://abc123.ngrok.io)
 * 4. Paste URL tersebut di NGROK_URL dibawah
 * 5. Set USE_NGROK = true
 *
 * Alternative (Local IP):
 * - Set USE_NGROK = false
 * - Update LOCAL_IP dengan IP komputer Anda
 */

// ============================================
// NGROK SETUP (RECOMMENDED)
// ============================================
const USE_NGROK = true; // Set true untuk pakai ngrok
const NGROK_URL = "https://a5abbabe55aa.ngrok-free.app"; // <-- GANTI INI dengan URL ngrok Anda!

// ============================================
// LOCAL IP SETUP (Alternative)
// ============================================
const LOCAL_IP = "192.168.1.7";

// ============================================
// ENVIRONMENT
// ============================================
const ENV = "local"; // 'local' | 'staging' | 'production'

const API_URLS = {
  local: USE_NGROK ? `${NGROK_URL}/api` : `http://${LOCAL_IP}:8000/api`,
  staging: "https://staging.example.com/api",
  production: "https://api.example.com/api",
};

export const API_BASE_URL = API_URLS[ENV];

// Export untuk debugging
export const API_CONFIG = {
  baseUrl: API_BASE_URL,
  environment: ENV,
  localIP: LOCAL_IP,
};
