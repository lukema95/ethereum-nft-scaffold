import { useContractRead } from 'wagmi'
import { contractConfig } from '../config'

export function Info() {
  const contractABI = contractConfig.abi

  const {data} = useContractRead({
    addressOrName: contractConfig.address,
    contractInterface: contractABI,
    functionName: 'totalSupply',
    onSuccess(data) {
      console.log('Get totalSupply success', data)
    },
    onError(error) {
      console.log('Get totalSupply success error', error)
    },
  })

  return (
    <div>
      <h2>
        Remaining: {data?.toNumber() ? data.toNumber() : 0} / 10000
      </h2>
    </div>
  )
}