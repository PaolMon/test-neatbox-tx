import { transactions, validator } from "@liskhq/lisk-client";
import { claimAssetSchema, transactionSchema } from "./schemas";
import { account_2, getClient, hash_1, hash_3, networkIdentifier } from "./const"
import { transaction } from "./types";

const execute = async () => {
    
    try {
        const client = await getClient()

        const account: any = JSON.parse(await client.invoke('infos:getAccount', {
            address: account_2.binaryAddress
        }))

        const claim_object = {
            oldMerkleRoot: Buffer.from(hash_1, 'hex'),
            newMerkleRoot: Buffer.from(hash_3, 'hex'),
            newMerkleHeight: 3,
            newHosts: [Buffer.from("edc97a59a29a3c632932666d891cf65c69763cac", 'hex'), Buffer.from("2ad4a2469aee2301866e2a69e0fc3aff04de69ba", 'hex'), Buffer.from("cb9b9a663d8ff0e17798bd6e169e6b9a4345ac32", 'hex')],
            newSecret: 'new_string'
        }
        
        const unsignedTransactionC: transaction = {
            moduleID: Number(1001),
            assetID: Number(3), // aka Token Transfer transaction
            fee: BigInt(10000000),
            nonce: BigInt(account.sequence.nonce),
            senderPublicKey: Buffer.from(account_2.publicKey,'hex'),
            asset: Buffer.alloc(0) ,
            signatures: [],
        };
        
        // Validate the transaction oject
        const transactionErrors = validator.validator.validate(transactionSchema, unsignedTransactionC);
        
        if (transactionErrors.length) {
            console.log(" ### VALIDATE KO ### ")
            throw new validator.LiskValidationError([...transactionErrors]);
        }
        
        unsignedTransactionC.asset = claim_object;
        const signedTransaction = transactions.signTransaction(
            claimAssetSchema,
            unsignedTransactionC,
            networkIdentifier,
            account_2.passphrase,
        );
        
        console.log(signedTransaction);

        const res = await client.transaction.send(signedTransaction);
        console.log(res);
        client.disconnect();
    } catch (error) {
        console.log(error);
    }
}

execute()