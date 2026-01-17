/**
 * Node.js type declarations for crypto and Buffer
 */

declare module 'crypto' {
  export function randomBytes(size: number): Buffer;
  export function createHash(algorithm: string): {
    update(data: string): { digest(encoding: string): string };
  };
  export function createCipher(algorithm: string, password: string): {
    update(data: string, inputEncoding: string, outputEncoding: string): string;
    final(outputEncoding: string): string;
  };
  export function createDecipher(algorithm: string, password: string): {
    update(data: string, inputEncoding: string, outputEncoding: string): string;
    final(outputEncoding: string): string;
  };
}

declare global {
  class Buffer {
    constructor(data: string | number[] | ArrayBuffer, encoding?: string);
    static alloc(size: number): Buffer;
    static from(data: string | number[] | ArrayBuffer, encoding?: string): Buffer;
    toString(encoding?: string): string;
    length: number;
    [index: number]: number;
  }
}