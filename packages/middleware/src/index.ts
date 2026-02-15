export function warpGate(config: any) {
    return (req: any, res: any, next: any) => {
        console.log('Warp Gate Middleware');
        next();
    };
}
