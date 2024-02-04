import { solidityPackedKeccak256 } from 'ethers';
import { NodeEntryStruct } from '../typechain-types/INodeRegistry';

export const getSchemaUID = (schema: string, resolverAddress: string, revocable: boolean) =>
  solidityPackedKeccak256(['string', 'address', 'bool'], [schema, resolverAddress, revocable]);


export const getNodeUID = ({name, callbackUrl,industryCode}: NodeEntryStruct) => 
  solidityPackedKeccak256(['string', 'string', 'string'], [name, callbackUrl, industryCode]);
  