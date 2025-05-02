import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url().min(1),
    DATABASE_URL_UNPOOLED: z.string().url().min(1),

    STREAM_SECRET: z.string().min(1),
    CRON_SECRET: z.string().min(1),
    UPLOADTHING_TOKEN: z.string().min(1),
    PGHOST: z.string().min(1),
    PGUSER: z.string().min(1),
    PGPASSWORD: z.string().min(1),
    PGDATABASE: z.string().min(1),
    PGHOST_UNPOOLED: z.string().min(1),
    POSTGRES_URL: z.string().url().min(1),
    POSTGRES_URL_NON_POOLING: z.string().url().min(1),
    POSTGRES_USER: z.string().min(1),
    POSTGRES_PASSWORD: z.string().min(1),
    POSTGRES_HOST: z.string().min(1),
    POSTGRES_DATABASE: z.string().min(1),
    POSTGRES_URL_NO_SSL: z.string().url().min(1),
    POSTGRES_PRISMA_URL: z.string().url().min(1),
  },
  client: {
    NEXT_PUBLIC_UPLOADTHING_APP_ID: z.string().min(1),
    NEXT_PUBLIC_STREAM_KEY: z.string().min(1),
  },

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    POSTGRES_URL: process.env.POSTGRES_URL,
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
    POSTGRES_URL_NO_SSL: process.env.POSTGRES_URL_NO_SSL,
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
    DATABASE_URL_UNPOOLED: process.env.DATABASE_URL_UNPOOLED,
    PGHOST_UNPOOLED: process.env.PGHOST_UNPOOLED,
    PGHOST: process.env.PGHOST,
    PGUSER: process.env.PGUSER,
    PGPASSWORD: process.env.PGPASSWORD,
    PGDATABASE: process.env.PGDATABASE,
    NEXT_PUBLIC_STREAM_KEY: process.env.NEXT_PUBLIC_STREAM_KEY,
    STREAM_SECRET: process.env.STREAM_SECRET,
    CRON_SECRET: process.env.CRON_SECRET,
    NEXT_PUBLIC_UPLOADTHING_APP_ID: process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID,
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
  },
});
