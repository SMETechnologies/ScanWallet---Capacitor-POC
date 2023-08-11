import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'scanwallet-capacitor-poc',
  webDir: 'out',
  server: {
    url: 'http://192.168.50.60:3000',
    cleartext: true,
  },
};

export default config;
