import { apiClient, transactions, validator } from "@liskhq/lisk-client";
import { createAssetSchema, transactionSchema } from "./schemas";
import { account_1, getClient, hash_2, networkIdentifier } from "./const"
import { transaction } from "./types";

getClient().then(async (client: apiClient.APIClient) => {
    try {
        const account: any = JSON.parse(await client.invoke('infos:getAccount', {
            address: account_1.binaryAddress
        }))

        console.log(account)

        const create_object = {
            "fileName":"antonello.txt", // INPUT FORM
            "fileSize":999, // fileName.length
            "fileHash":Buffer.from(hash_2, 'hex'), // sha256(filename)
            "merkleRoot":Buffer.from(hash_2, 'hex'), // sha256(fileHash)
            "merkleHeight":0, //0
            "secret":"luigi" // INPUT FORM
        }

        const unsignedTransactionC: transaction = {
            moduleID: Number(1001),
            assetID: Number(0), // aka Token Transfer transaction
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

        unsignedTransactionC.asset = create_object;
        const signedTransaction = transactions.signTransaction(
            createAssetSchema,
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
})
