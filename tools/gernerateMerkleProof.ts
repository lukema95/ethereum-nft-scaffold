import keccak256 from 'keccak256'

export function generateMerkleProof(merkleTree, address){
  const proof = merkleTree.getHexProof(keccak256(address))
  // console.log('proof', proof)
  // 这里可以验证proof是否正确
  // const merkleRoot = merkleTree.getHexRoot
  // const v = merkleTree.verify(proof, keccak256(address), merkleRoot)
  // console.log(v)
  console.log("proof:"+proof)
  return proof  
}