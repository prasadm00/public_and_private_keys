
const fs = require("fs")
const crypto = require("crypto")
const { generateKeyPair } = require('crypto');


const encryptText = async (plainText, publicKey) => {

    const encryptedData = crypto.publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        // We convert the data string to a buffer using `Buffer.from`
        Buffer.from(plainText)
    );

    // The encrypted data is in the form of bytes, so we print it in base64 format
    // so that it's displayed in a more readable form
    console.log("encypted data: ", encryptedData.toString("base64"));
    return encryptedData;
}

const decryptText = async (privateKey, encryptedData) => {
    console.log("🚀 ~ file: helper.js:35 ~ decryptText ~ encryptedData:", encryptedData.toString("base64"))
    const decryptedData = crypto.privateDecrypt(
        {
            key: privateKey,
            // In order to decrypt the data, we need to specify the
            // same hashing function and padding scheme that we used to
            // encrypt the data in the previous step
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
            passphrase: 'top secret',
        },

        encryptedData
    );

    // The decrypted data is of the Buffer type, which we can convert to a
    // string to reveal the original data
    console.log("decrypted data:  ", decryptedData.toString());
    return decryptedData
}

const decryptData = async (privateKey, encryptedData) => {
    console.log('In decrypt payload', encryptedData)
    // const buf1 = Buffer.allocUnsafe(encryptedData.payload);

    try {

        // const decryptedData = crypto.privateDecrypt(
        //     {
        //         key: privateKey,
        //         // In order to decrypt the data, we need to specify the
        //         // same hashing function and padding scheme that we used to
        //         // encrypt the data in the previous step
        //         padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        //         oaepHash: "sha256",
        //     },
        //     encryptedData
        // );
        // console.log("🚀 ~ file: helper.js:72 ~ decryptData ~ decryptedData:", decryptedData)




        const decryptedChunks = []

        for (const encryptedChunk of encryptedData) {
            const decryptedChunk = crypto.privateDecrypt(
                {
                    key: privateKey,
                    // passphrase: 'top secret'
                },
                Buffer.from(encryptedChunk.data)
            )

            decryptedChunks.push(decryptedChunk.toString())
        }

        const decryptedObject = JSON.parse(decryptedChunks.join(''))

        return decryptedObject
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }
}

const decryptData1 = async (privateKey, encryptedData) => {
    console.log('In decrypt payload', encryptedData);

    try {
        const decryptedData = crypto.privateDecrypt(
            {
                key: privateKey,
                // In order to decrypt the data, we need to specify the
                // same hashing function and padding scheme that were used to
                // encrypt the data in the previous step
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
            },
            Buffer.concat(encryptedData)
        );

        const decryptedObject = JSON.parse(decryptedData.toString());
        return decryptedObject;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};



const generateKeys = async () => {
    try {
        const keys = {}
        // The `generateKeyPairSync` method accepts two arguments:
        // 1. The type ok keys we want, which in this case is "rsa"
        // 2. An object with the properties of the key
        // const { publicKey, privateKey } = await crypto.generateKeyPairSync("rsa", {
        //     // The standard secure default length for RSA keys is 2048 bits
        //     modulusLength: 2048,
        // })
        // console.log("🚀 ~ file: helper.js:28 ~ generateKeys ~ publicKey:", publicKey)
        // keys.publicKey = publicKey
        // keys.privateKey = privateKey
        // console.log("keys", keys);

        return new Promise((resolve, reject) => {
            generateKeyPair(
                'rsa',
                {
                    modulusLength: 2048,
                    publicKeyEncoding: {
                        type: 'spki',
                        format: 'pem',
                    },
                    privateKeyEncoding: {
                        type: 'pkcs8',
                        format: 'pem',
                        cipher: 'aes-256-cbc',
                        passphrase: 'top secret',
                    },
                },
                (err, publicKey, privateKey) => {
                    if (err) {
                        reject(err);
                    } else {
                        const result = {
                            publicKey: publicKey,
                            privateKey: privateKey,
                        };
                        console.log("Result ", result);
                        resolve(result);
                    }
                }
            );
        });

    } catch (err) {
        console.log("Error Generating keys==>>", err);
        throw new Error("Error Generating keys==>>", err)
    }
}

module.exports = {
    generateKeys,
    encryptText,
    decryptText,
    // decryptData,
    // decryptData1
}