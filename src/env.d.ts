declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      REDIS_URL: string;
      PORT: string;
      SESSION_SECRET: string;
      CORS_ORIGIN: string;
      PG_USER: string;
      PG_PASSWORD: string;
      PG_HOST: string;
      PG_PORT: string;
      PG_DATABASE: string;
    }
  }
}

export {}
