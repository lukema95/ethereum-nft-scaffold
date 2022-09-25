export function generateMerkleRoot(merkleTree) {
  const merkleRoot = merkleTree.getHexRoot()
  console.log('merkleTree', merkleTree.toString())
  return merkleRoot
}