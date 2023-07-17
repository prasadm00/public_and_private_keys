const crypto = require("crypto")
const { generateKeys, encryptText, decryptText, decryptData, decryptData1 } = require('./helper')

const mainfunc = async () => {

    // 1. Generate public and private key
    const generate = async () => {
        const keys = await generateKeys();
        console.log("KEYS", keys);
        return keys
    }
    const keys = await generate();
    console.log("🚀 ~ file: index.js:11 ~ mainfunc ~ keys:", keys)

    // encrypt the data using public key
    const encrypt = async () => {
        const encData = encryptText("Ajay Matsagar", keys.publicKey);
        return encData
    }

    // decrypt the data using private key
    const encryptedData = await encrypt();
    console.log("🚀 ~ file: index.js:20 ~ mainfunc ~ encryptedData:", encryptedData)
    console.log("🚀 ~ file: index.js:17 ~ encryptedData: ", encryptedData.toString("base64"))

    const decryptedData = await decryptText(keys.privateKey, encryptedData)//.toString("base64")
    console.log("🚀 ~ file: index.js:23 ~ mainfunc ~ decryptedData:", decryptedData.toString())

}

mainfunc();

// // This is the data we want to encrypt
// const data = "my secret data";

// const encryptedData = crypto.publicEncrypt(
//     {
//         key: publicKey,
//         padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
//         oaepHash: "sha256",
//     },
//     // We convert the data string to a buffer using `Buffer.from`
//     Buffer.from(data)
// );

// // The encrypted data is in the form of bytes, so we print it in base64 format
// // so that it's displayed in a more readable form
// console.log("Encrypted data in buff", encryptedData);
// console.log("encypted data: ", encryptedData.toString("base64"));

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

// // The decrypted data is of the Buffer type, which we can convert to a
// // string to reveal the original data
// console.log("decrypted data: ", decryptedData.toString());

