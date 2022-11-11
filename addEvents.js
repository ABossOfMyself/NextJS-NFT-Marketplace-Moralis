const { Moralis } = require("moralis-v1/node")
require("dotenv").config()
const contractAddresses = require("./constants/networkMapping.json")



const chainId = process.env.chainId || 31337

const moralisChainId = chainId == "31337" ? "1337" : chainId


const contractAddress = contractAddresses[chainId]["NFTMarketplace"][0] || null


const serverUrl = process.env.NEXT_PUBLIC_DAPP_URL

const appId = process.env.NEXT_PUBLIC_APP_ID

const masterKey = process.env.MASTER_KEY



async function main() {
  
  
    await Moralis.start({ serverUrl, appId, masterKey })



    const NFTListedOptions = {

        chainId: moralisChainId,

        address: contractAddress,

        sync_historical: true,

        topic: "NFTListed(address,address,uint256,uint256)",
        
        abi: {
           "anonymous": false,
           "inputs": [
                {
                "indexed": true,
                "internalType": "address",
                "name": "seller",
                "type": "address"
                },
                {
                "indexed": true,
                "internalType": "address",
                "name": "NFTContractAddress",
                "type": "address"
                },
                {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
                },
                {
                "indexed": false,
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
                }
            ],
            "name": "NFTListed",
            "type": "event"
        },

        tableName: "NFTListed"
    }



    const NFTBoughtOptions = {

        chainId: moralisChainId,

        address: contractAddress,

        sync_historical: true,

        topic: "NFTBought(address,address,uint256,uint256)",

        abi: {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "buyer",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "NFTContractAddress",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
              }
            ],
            "name": "NFTBought",
            "type": "event"
        },

        tableName: "NFTBought"
    }



    const NFTCancelledOptions = {

        chainId: moralisChainId,

        address: contractAddress,

        sync_historical: true,

        topic: "NFTCancelled(address,address,uint256)",

        abi: {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "seller",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "NFTContractAddress",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "NFTCancelled",
            "type": "event"
        },

        tableName: "NFTCancelled"
    }



    const NFTListedResponse = await Moralis.Cloud.run("watchContractEvent", NFTListedOptions, { useMasterKey: true })

    const NFTBoughtResponse = await Moralis.Cloud.run("watchContractEvent", NFTBoughtOptions, { useMasterKey: true })

    const NFTCancelledResponse = await Moralis.Cloud.run("watchContractEvent", NFTCancelledOptions, { useMasterKey: true })



    if(NFTListedResponse.success && NFTBoughtResponse.success && NFTCancelledResponse.success) {

        console.log("Success : Database have been Updated with Watching Events")

    } else {

        console.log("Something went wrong!")
    }
}



main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })