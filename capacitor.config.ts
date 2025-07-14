import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.c42897962fee4948b001a7e90b7e78c8',
  appName: 'wealthcraft-legacy-sim',
  webDir: 'dist',
  server: {
    url: 'https://c4289796-2fee-4948-b001-a7e90b7e78c8.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;