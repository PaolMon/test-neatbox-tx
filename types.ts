export type createT = {
    fileName: string;
    fileSize: number;
    fileHash: Buffer;
    merkleRoot: Buffer;
    merkleHeight: number;
    secret: string;
}

export type requestT = {
    merkleRoot: Buffer;
    mode: string
}

export type responseT = {
	address: Buffer,
	merkleRoot: Buffer,
	response: string,
	newSecret: string
}

export type claimT = {
	oldMerkleRoot: Buffer,
	newMerkleRoot: Buffer,
	newMerkleHeight: number,
	newHosts: Buffer[],
	newSecret: string
}

export type transaction = {
    moduleID: number;
    assetID: number;
    fee: bigint;
    nonce: bigint;
    senderPublicKey: Buffer;
    asset: Buffer | createT | requestT | responseT | claimT;
    signatures: any[];
}