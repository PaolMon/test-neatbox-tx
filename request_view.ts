import { transactions, validator } from "@liskhq/lisk-client";
import { requestAssetSchema, transactionSchema } from "./schemas";
import { account_2, getClient, hash_2, networkIdentifier } from "./const"
import { transaction } from "./types";

const execute = async () => {
    
    try {
        const client = await getClient()

        const account: any = JSON.parse(await client.invoke('infos:getAccount', {
            address: account_2.binaryAddress
        }))

        const request_object = {
            "merkleRoot":Buffer.from(hash_2, 'hex'),
            "mode" : "VIEW"
        }
        
        const unsignedTransactionC: transaction = {
            moduleID: Number(1001),
            assetID: Number(1), // aka Token Transfer transaction
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
        
        unsignedTransactionC.asset = request_object;
        const signedTransaction = transactions.signTransaction(
            requestAssetSchema,
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