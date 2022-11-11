Moralis.Cloud.afterSave("NFTListed", async(request) => {

    const confirmed = request.object.get("confirmed")

    const logger = Moralis.Cloud.getLogger()

    logger.info("Looking for confirmed Transaction")


    if(confirmed) {

        logger.info("Founded the Listed NFT")

        const ActiveNFT = Moralis.Object.extend("ActiveNFT")

        const query = new Moralis.Query(ActiveNFT)

        query.equalTo("marketplaceAddress", request.object.get("address"))

        query.equalTo("NFTContractAddress", request.object.get("NFTContractAddress"))

        query.equalTo("tokenId", request.object.get("tokenId"))

        query.equalTo("seller", request.object.get("seller"))


        logger.info(`Marketplace | Query : ${JSON.stringify(query)}`)

        const alreadyListedNft = await query.first()

        logger.info(`Marketplace | Already Listed NFT : ${JSON.stringify(alreadyListedNft)}`)


        if(alreadyListedNft) {

            await alreadyListedNft.destroy()

            logger.info(`Deleted Already Listed NFT -- with Token ID : ${request.object.get("tokenId")} at Address : ${request.object.get("address")} from ActiveNFT`)
        }


        const activeNft = new ActiveNFT()

        activeNft.set("marketplaceAddress", request.object.get("address"))

        activeNft.set("NFTContractAddress", request.object.get("NFTContractAddress"))

        activeNft.set("price", request.object.get("price"))

        activeNft.set("tokenId", request.object.get("tokenId"))

        activeNft.set("seller", request.object.get("seller"))


        logger.info(`Adding To ActiveNFT -- Address : ${request.object.get("address")}. Token ID : ${request.object.get("tokenId")}`)

        logger.info("Saving...!")

        await activeNft.save()
    }
})


Moralis.Cloud.afterSave("NFTCancelled", async(request) => {

    const confirmed = request.object.get("confirmed")

    const logger = Moralis.Cloud.getLogger()

    logger.info(`Marketplace | Object : ${JSON.stringify(request.object)}`)


    if(confirmed) {

        const ActiveNFT = Moralis.Object.extend("ActiveNFT")

        const query = new Moralis.Query(ActiveNFT)

        query.equalTo("marketplaceAddress", request.object.get("address"))

        query.equalTo("NFTContractAddress", request.object.get("NFTContractAddress"))

        query.equalTo("tokenId", request.object.get("tokenId"))


        logger.info(`Marketplace | Query : ${JSON.stringify(query)}`)

        const cancelledNft = await query.first()

        logger.info(`Marketplace | Cancelled NFT : ${JSON.stringify(cancelledNft)}`)


        if(cancelledNft) {

            await cancelledNft.destroy()

            logger.info(`Deleted the NFT -- with Token ID : ${request.object.get("tokenId")} at Address : ${request.object.get("address")} from ActiveNFT`)

        } else {

            logger.info(`No NFT Found -- with Token ID : ${request.object.get("tokenId")} at Address : ${request.object.get("address")} in ActiveNFT`)
        }
    }
})


Moralis.Cloud.afterSave("NFTBought", async(request) => {

    const confirmed = request.object.get("confirmed")

    const logger = Moralis.Cloud.getLogger()

    logger.info(`Marketplace | Object : ${JSON.stringify(request.object)}`)


    if(confirmed) {

        const ActiveNFT = Moralis.Object.extend("ActiveNFT")

        const query = new Moralis.Query(ActiveNFT)

        query.equalTo("marketplaceAddress", request.object.get("address"))

        query.equalTo("NFTContractAddress", request.object.get("NFTContractAddress"))

        query.equalTo("tokenId", request.object.get("tokenId"))


        logger.info(`Marketplace | Query : ${JSON.stringify(query)}`)

        const boughtNft = await query.first()

        logger.info(`Marketplace | Bought NFT : ${JSON.stringify(boughtNft)}`)


        if(boughtNft) {

            await boughtNft.destroy()

            logger.info(`Deleted the NFT -- with Token ID : ${request.object.get("tokenId")} at Address : ${request.object.get("address")} from ActiveNFT`)

        } else {

            logger.info(`No NFT Found -- with Token ID : ${request.object.get("tokenId")} at Address : ${request.object.get("address")} in ActiveNFT`)
        }
    }
})
