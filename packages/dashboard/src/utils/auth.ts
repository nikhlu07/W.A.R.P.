import { connect, getLocalStorage, disconnect, isConnected } from "@stacks/connect";

export const connectWallet = async () => {
    return await connect();
};

export const getStxAddress = (): string | null => {
    const data = getLocalStorage();
    if (data && data.addresses && data.addresses.stx && data.addresses.stx.length > 0) {
        return data.addresses.stx[0].address;
    }
    return null;
};

export { disconnect, isConnected };
