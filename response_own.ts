import { transactions, validator } from "@liskhq/lisk-client";
import { responseAssetSchema, transactionSchema } from "./schemas";
import { account_1, account_2, getClient, hash_1, networkIdentifier } from "./const"
import { transaction } from "./types";

const execute =async () => {
    
    try {
        const client = await getClient()

        const account: any = JSON.parse(await client.invoke('infos:getAccount', {
            address: account_1.binaryAddress
        }))

        const response_object = {
            address: Buffer.from(account_2.binaryAddress, 'hex'),
            merkleRoot: Buffer.from(hash_1, 'hex'),
            response: 'OK',
            newSecret: 'new_secret'
        }
        
        const unsignedTransactionC: transaction = {
            moduleID: Number(1001),
            assetID: Number(2), // aka Token Transfer transaction
            fee: BigInt(10000000),
            nonce: BigInt(account.sequence.nonce),
            senderPublicKey: Buffer.from(account_1.publicKey,'hex'),
            asset: Buffer.alloc(0) ,
            signatures: [],
        };
        
        // Validate the transaction oject
        const transactionErrors = validator.validator.validate(transactionSchema, unsignedTransactionC);
        
        if (transactionErrors.length) {
            console.log(" ### VALIDATE KO ### ")
            throw new validator.LiskValidationError([...transactionErrors]);
        }
        
        unsignedTransactionC.asset = response_object;
        const signedTransaction = transactions.signTransaction(
            responseAssetSchema,
            unsignedTransactionC,
            networkIdentifier,
            account_1.passphrase,
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