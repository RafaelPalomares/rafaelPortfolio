/**
 * Type declarations for @vercel/node serverless functions.
 * This file provides types when the package isn't installed locally
 * (e.g., offline development). In CI/deployment, the actual package is used.
 */
declare module '@vercel/node' {
  import { IncomingMessage, ServerResponse } from 'http';

  export interface VercelRequest extends IncomingMessage {
    query: Record<string, string | string[]>;
    cookies: Record<string, string>;
    body: any;
  }

  export interface VercelResponse extends ServerResponse {
    status(statusCode: number): VercelResponse;
    json(body: any): VercelResponse;
    send(body: any): VercelResponse;
    redirect(statusOrUrl: string | number, url?: string): VercelResponse;
  }

  export type VercelApiHandler = (
    req: VercelRequest,
    res: VercelResponse
  ) => void | Promise<void>;
}
