declare module 'web3.storage' {
  export class Web3Storage {
    constructor(options: { token: string });
    put(files: any[], options?: any): Promise<string>;
    get(cid: string): Promise<any>;
    status(cid: string): Promise<any>;
  }
}
