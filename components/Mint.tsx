import {utils} from 'ethers'
import { useAccount, 
        useProvider, 
        useContractRead, 
        useContractWrite, 
        useWaitForTransaction, 
        useSendTransaction } from 'wagmi'

import { generateMerkleProof } from '../tools'
import { useIsMounted } from '../hooks'
import { contractConfig } from '../config'

export function Mint(props){
  const { address, connector, isConnected } = useAccount()
  const provider = useProvider()
  const contractABI = contractConfig.abi
  const contractAddress = contractConfig.address
  const phase = contractConfig.phase
  const merkleProof = phase == 1 ? generateMerkleProof(props.merkleTree, address) : []
  const publicSaleKey = phase == 2 ? contractConfig.publicSaleKey : 0
  
  // Read contract functin 
  // const {data} = useContractRead({
  //   addressOrName: '0xcfb5D3EFe68249d0A499a8838947CB712a46F465',
  //   contractInterface: contractABI,
  //   functionName: 'love',
  //   args: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  //   onSuccess(data) {
  //     console.log('Success', data)
  //   },
  //   onError(error) {
  //     console.log('Error', error)
  //   },
  // })

  // send transaction 
  // const { data, isIdle, isError, isLoading, isSuccess, sendTransaction } = useSendTransaction({
  //   request: {
  //     to: '0xc35eA8756FAC254205e246379aa7B66F2b795f98',
  //     value: BigNumber.from('10000000000000000'), // 10000000000000000 WEI
  //   },
  //   onError(error) {
  //     console.log('Error', error)
  //   },
  //   onSuccess(data) {
  //     console.log('Success', data)
  //   },})

  // Write contact function and sent token to contract
  // Allowlist mint
  // const { data, isError, isLoading, write } = useContractWrite({
  //   addressOrName: contractAddress,
  //   contractInterface: contractABI,
  //   functionName: 'mint',
  //   args:[1, node, keys],
  //   //send token   
  //   // overrides: {
  //   //   from: '0x170E2080B502Fa935191d409b399c8e46D74621E',
  //   //   value: utils.parseEther('0.005'),
  //   // },
  //   onSuccess(data) {
  //     console.log('Success', data)
  //   },
  //   onError(error) {
  //     console.log('Error', error)
  //   },
  // })
  const { isSuccess, data, write } = useContractWrite({
    addressOrName: contractAddress,
    contractInterface: contractABI,
    // args: [props.merkleProof],
    functionName: "mint",
    args: [props.quantity, publicSaleKey, merkleProof],
    // send token
    // overrides: {
    //   from: '0x170E2080B502Fa935191d409b399c8e46D74621E',
    //   value: utils.parseEther('0.005'),
    // },
    onSuccess(data) {
      openSnackbar("Transaction has been sent", 8000);
      console.log("Mint success: ", data.blockHash);
    },
    onError(error) {
      openSnackbar("Mint error: " + error.message, 8000);
      console.log("Mint error", error);
    },
  });

  // Wait tx result
  const waitForTransaction = useWaitForTransaction({
    hash: data?.hash,
  })

  return (
    <div>
      <button disabled={!isConnected} onClick={()=> write() }>
        Mint
      </button>
    </div>
  )
}