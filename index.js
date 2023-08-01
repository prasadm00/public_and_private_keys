const { generateKeys, encryptText, decryptText } = require('./helper')

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
        const encData = encryptText("Plain text", keys.publicKey);
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
