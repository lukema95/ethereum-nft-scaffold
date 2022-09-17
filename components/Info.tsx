import { useContractRead } from 'wagmi'
import { useIsMounted, useContractABI } from '../hooks'

export function Info() {
  const contractABI = useContractABI()

  const {data} = useContractRead({
    addressOrName: '0xcfb5D3EFe68249d0A499a8838947CB712a46F465',
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