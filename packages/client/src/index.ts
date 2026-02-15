export class WarpAgent {
    constructor(private config: any) { }

    async fetch(url: string, options?: any) {
        console.log('Fetching', url);
        return { data: 'mock data' };
    }
}
