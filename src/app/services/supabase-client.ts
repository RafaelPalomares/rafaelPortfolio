import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

/**
 * Provides a single shared Supabase client instance for the application.
 *
 * The client is created with the publishable (anon) key only. All access
 * control is enforced server-side through Row Level Security policies.
 */
@Injectable({
  providedIn: 'root',
})
export class SupabaseClientService {
  private readonly client: SupabaseClient;

  constructor() {
    this.client = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
  }

  /**
   * Returns the shared Supabase client instance.
   * @returns The configured Supabase client
   */
  public getClient(): SupabaseClient {
    return this.client;
  }
}
