import { apiClient, cryptography } from "@liskhq/lisk-client";

let clientCache:apiClient.APIClient;

export const RPC_ENDPOINT = 'ws://159.69.159.240:8080/ws';

export const getClient = async () => {
    if (!clientCache) {
        clientCache = await apiClient.createWSClient(RPC_ENDPOINT);
    }
    return clientCache;
};

export const networkIdentifier = cryptography.getNetworkIdentifier(
    cryptography.hexToBuffer("1a23ae620e516679112d6d6458d658262ae5bb5f700d2e3f54561845b22a7e28"),
    "sdk",
);

export const account_1 = {
    "passphrase": "slice slender exact off boring solve interest warm antique income crowd tobacco",
    "publicKey": "1f6a9c5cff1cb13e2229de67e4e74d3a65cba86fc2e8ea264ef8f5f2363b74a3",
    "binaryAddress": "ae1bc14349124b1ee25d8d75ad1cc4e47880f1de",
    "address": "lskq29jvud4v4myh2rhyqdddnbpjyj3xj7fyfk7kk"
};

export const account_2 = {
    "passphrase": "sense loud alone timber marriage dragon hold woman spot recycle empower fence",
    "publicKey": "9258c9ef54f8a7155faae6a95582c805a61538ff2e575d9ff97a9aaae8ae085d",
    "binaryAddress": "08b16df1d5b042497010e44f3eb5eadc0f9170fd",
    "address": "lskxv2esj7qexxprjzujynth986sunavjnhgqjcza"
};


export const hash_1 = "9b9ac012c88ee8eddf5d458e8542b2438cb7205fefb3200200e69d4d8686dcee"
export const hash_2 = "8614b1948f357011bd81b6df558235aeee0c49279933b5508a94b2769f7700f8"
export const hash_3 = "f4f3c8a1bcc0e5da9836d04f23754baba54f107ef4d2d67eeb5326c5ac74c28d"
export const hash_4 = "f0608da60fe0e4c22a6e1c75ab5b02ac9869a7937ae0e8264c5171033f87d4ef"
export const hash_5 = "3ba1e83939ab179924bf33dda8330da07ae936c7a4389f4c908dce5e519135a7"


