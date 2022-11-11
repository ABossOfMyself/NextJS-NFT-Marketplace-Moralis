import { useMoralis, useMoralisQuery } from "react-moralis"
import NFTBox from "../components/NFTBox"



export default function Home() {

  const { isWeb3Enabled } = useMoralis()

  const { data: listedNfts, isFetching: fetchingListedNfts } = useMoralisQuery("ActiveNFT", (query) => query.limit(10).descending("tokenId"))

  

  return (

    <div className = "container mx-auto">

      <h1 className = "py-4 px-4 font-bold text-2xl">Recently Listed</h1>

      <div className = "flex flex-wrap">


        {isWeb3Enabled ? (

          fetchingListedNfts ? (
                    
            <div className = "font-medium">Loading...</div>
            
          ) : (
              
              listedNfts.map((nft) => {

                const { NFTContractAddress, price, marketplaceAddress, tokenId, seller } = nft.attributes

                return (

                  <div className = "p-4">

                    <NFTBox

                      NFTContractAddress = {NFTContractAddress}

                      price = {price}

                      marketplaceAddress = {marketplaceAddress}

                      tokenId = {tokenId}

                      seller = {seller}

                      key = {`${NFTContractAddress}${tokenId}`}
                      
                    >
                      
                    </NFTBox>

                  </div>
              )

          }))

        ) : (
        
          <div className = "font-medium">Please Connect to Wallet</div>
        
        )}

      </div>

    </div>
  )
}
