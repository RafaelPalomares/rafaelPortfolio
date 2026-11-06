/**
 * Application environment configuration (development).
 *
 * Only the Supabase project URL and the publishable (anon) key belong here.
 * Both are safe to expose in a browser client because read access is
 * restricted server-side via Row Level Security (RLS) policies.
 *
 * Never place the Supabase secret/service-role key or account credentials in
 * this file: everything under src/ is bundled and shipped to the browser.
 */
export const environment = {
  production: false,
  supabaseUrl: 'https://pmfubxsjyfrluuwzazup.supabase.co',
  supabaseAnonKey: 'sb_publishable_I8c5Y8qyzZm3Xyg_-esIAw_kzOg3-pS',
} as const;
