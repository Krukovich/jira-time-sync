export {};

declare global {
  interface Window {
    api: {
      auth: {
        register: (data: { email: string; password: string; displayName: string, role: string }) => Promise<any>;
        updateProfile: (data: { userId: string; displayName?: string; avatarBase64?: string | null }) => Promise<any>;
        login: (data: { email: string; password: string }) => Promise<any>;
        checkSession: () => Promise<any>;
        logout: () => Promise<any>;
      };
      tasks: {
        list: () => Promise<any[]>;
      };
      time: {
        create: (entry: any) => Promise<any>;
        listPending: () => Promise<any[]>;
      };
      db: {
        debugQuery: (sql: string) => Promise<any>;
      };
    };
  }
}