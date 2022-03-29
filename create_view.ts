import { transactions, validator } from "@liskhq/lisk-client";
import { createAssetSchema, transactionSchema } from "./schemas";
import { account_1, getClient, hash_2, networkIdentifier } from "./const"
import { transaction } from "./types";

const create =async () => {
    const client = await getClient()

    const account: any = await client.invoke('infos:getAccount', {
            address: account_1.binaryAddress
        })

    const create_object = {
        "fileName":"mario.txt",
        "fileSize":666,
        "fileHash":Buffer.from(hash_2, 'hex'),
        "merkleRoot":Buffer.from(hash_2, 'hex'),
        "merkleHeight":0,
        "secret":"mario"
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

    try {
        const res = await client.transaction.send(signedTransaction);
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

create()