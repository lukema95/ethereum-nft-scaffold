import * as React from 'react'

export function useContractABI() {

  const abi = ''
  
  const [contractABI, setABI] = React.useState(abi)
  
  return contractABI
}