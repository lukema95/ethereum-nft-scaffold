import {utils} from 'ethers'
import { useAccount, useProvider, useContractRead, useContractWrite, useWaitForTransaction, useSendTransaction } from 'wagmi'

import { useIsMounted, useContractABI } from '../hooks'

export function Mint(){
  const { connector, isConnected } = useAccount()
  const provider = useProvider()
  const contractABI = useContractABI()
  
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
  const { data, isError, isLoading, write } = useContractWrite({
    addressOrName: '0xcfb5D3EFe68249d0A499a8838947CB712a46F465',
    contractInterface: contractABI,
    functionName: 'publicSaleMint',

    args:[123456],
    // send token 
    // overrides: {
    //   from: '0x170E2080B502Fa935191d409b399c8e46D74621E',
    //   value: utils.parseEther('0.005'),
    // },
    onSuccess(data) {
      console.log('Success', data)
    },
    onError(error) {
      console.log('Error', error)
    },
  })

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