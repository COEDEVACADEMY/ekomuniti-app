const LOCAL_IP = process.env.EXPO_PUBLIC_LOCAL_IP || "192.168.1.7";
const ENV = (process.env.EXPO_PUBLIC_ENV || "local") as "local" | "development";

const API_URLS = {
  local: `https://abac980ee16d.ngrok-free.app/api`,
  development: "https://dev.ekomuniti.my/api",
};

export const API_BASE_URL = API_URLS[ENV];
export const ASSET_BASE_URL = API_BASE_URL.replace("/api", "");

export const API_CONFIG = {
  baseUrl: API_BASE_URL,
  environment: ENV,
  localIP: LOCAL_IP,
};
