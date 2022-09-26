import * as React from 'react'
import { useAccount } from 'wagmi'
import Image from 'next/image'

import { Account, Connect, Mint, Info } from '../components'
import { useIsMounted } from '../hooks'
import { generateMerkleProof, generateMerkleRoot, generateMerkleTree } from '../tools'
import { whitelist } from '../config'

const merkleTree = generateMerkleTree(whitelist)
// const merkleRoot = generateMerkleRoot(merkleTree)

function Page() {
  const isMounted = useIsMounted()
  const { isConnected } = useAccount()

  return (
    <>
      <Image 
        src="/home.jpeg"
          alt="Picture of the project"
          width={600}
          height={600}
      />
      <Info/>
      <Connect />
      {isMounted && isConnected && (
        <>
          <Account />
        </>
      )}
      <Mint
      merkleTree = {merkleTree}
      />
    </>
  )
}

export default Page