import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Signer, encodeBytes32String } from 'ethers';
import { NodeRegistry } from '../typechain-types';
import Contracts from '../components/Contracts';

import { NodeEntryStruct as NodeEntry } from '../typechain-types/contracts/NodeRegistry';
import { ZERO_BYTES32 } from '../utils/Constants';
import { getNodeUID } from '../utils/UID';


describe('NodeRegistry', function () {
  let accounts: Signer[];
  let registry: NodeRegistry;

  before(async function () {
    accounts = await ethers.getSigners();
  });

  beforeEach(async () => {
    registry = await Contracts.NodeRegistry.deploy();
  });

  describe('construction', () => {
    it('should report a version', async () => {
      expect(await registry.version()).to.equal('1.3.0');
    });
  });

  describe('node registration', function () {
    const testRegister = async (node: NodeEntry) => {
      const uid = getNodeUID(node);

      const retUID = await registry.registerNode.staticCall(node);
      // const res = await registry.registerNode(node);
      await registry.registerNode(node);

      expect(retUID).to.equal(uid);
        
      const nodeEntry = await registry.getNode(uid);
      // const sender = accounts[0];
      accounts[0];
      
      // known issue - withArgs doesn't deep compare arrays within structs, so the location assertion will fail the emit test
      // issue https://github.com/NomicFoundation/hardhat/issues/4207
      // issue https://github.com/NomicFoundation/hardhat/issues/3833 
      // await expect(res).to.emit(registry, 'Registered').withArgs(uid, await sender.getAddress(), nodeEntry);  

      expect(nodeEntry.uid).to.equal(uid);
      expect(nodeEntry.name).to.equal(node.name);
      expect(nodeEntry.callbackUrl).to.equal(node.callbackUrl);
      expect(nodeEntry.industryCode).to.equal(node.industryCode);
      expect(nodeEntry.location).to.deep.equal(node.location);
      expect(nodeEntry.nodeType).to.equal(node.nodeType);
      expect(nodeEntry.status).to.equal(node.status);
    };

    it('should allow registering a node', async () => {
      const node = {
        uid: encodeBytes32String('testUID'),
        name: 'Test Node',
        callbackUrl: 'http://testnode.com',
        location: ['882681a339fffff'], // h3 cell index at resolution 8 in Boulder, CO.
        industryCode: 'TEST',
        nodeType: 0, 
        status: 0 
      };

      await testRegister(node);
    });

    it('should not allow registering a node with existing uid', async () => {
      const node = {
        uid: ZERO_BYTES32,
        name: 'Test Node',
        callbackUrl: 'http://testnode.com',
        location: ['882681a339fffff'], // h3 cell index at resolution 8 in Boulder, CO.
        industryCode: 'TEST',
        nodeType: 0, 
        status: 0 
      };
  
      await testRegister(node);
      await expect(registry.registerNode(node)).to.be.revertedWithCustomError(registry, 'AlreadyExists');
    });
  });

  describe('schema querying', () => {
    it('should return a node', async () => {
      
      const node: NodeEntry = {
        uid: ZERO_BYTES32,
        name: 'Test Node',
        callbackUrl: 'http://testnode.com',
        location: ['882681a339fffff'], // h3 cell index at resolution 8 in Boulder, CO.
        industryCode: 'TEST',
        nodeType: 0,
        status: 0 
      };

      await registry.registerNode(node);
      const uid = getNodeUID(node);

      const nodeEntry = await registry.getNode(uid);

      expect(nodeEntry.uid).to.equal(uid);
      expect(nodeEntry.name).to.equal(node.name);
      expect(nodeEntry.callbackUrl).to.equal(node.callbackUrl);
      expect(nodeEntry.industryCode).to.equal(node.industryCode);
      expect(nodeEntry.location).to.deep.equal(node.location);
      expect(nodeEntry.nodeType).to.equal(node.nodeType);
      expect(nodeEntry.status).to.equal(node.status);
    });

    it('should return an empty node given non-existing id', async () => {
      const nodeEntry = await registry.getNode(encodeBytes32String('BAD'));
      // Check that the node entry fields are empty or zeroed
      expect(nodeEntry.uid).to.equal(ZERO_BYTES32);
      expect(nodeEntry.name).to.equal('');
      expect(nodeEntry.callbackUrl).to.equal('');
      expect(nodeEntry.industryCode).to.equal('');
      expect(nodeEntry.location).to.deep.equal([]);
      expect(nodeEntry.nodeType).to.equal(0); // Assuming default enum value is 0
      expect(nodeEntry.status).to.equal(0); // Assuming default enum value is 0
    });
  });

});