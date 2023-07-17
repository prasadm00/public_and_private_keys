## Public and Private key


1. Generate public key and private key using RSA
2. Encrypt the data using public key
3. Decrypt the data using private key

RSA works by generating a public and a private key. The public and private keys are generated together and form a key pair.


![alt text](https://www.sohamkamani.com/golang/rsa-encryption/key-pair.svg)


The public key can be used to encrypt any arbitrary piece of data, but cannot decrypt it.

![alt text](https://www.sohamkamani.com/golang/rsa-encryption/encryption.svg)


The private key can be used to decrypt any piece of data that was encrypted by it’s corresponding public key.

![alt text](https://www.sohamkamani.com/golang/rsa-encryption/decryption.svg)
