import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Signer, encodeBytes32String } from 'ethers';
import { NodeRegistry } from '../typechain-types';
import Contracts from '../components/Contracts';

import { NodeEntryStruct as NodeEntry } from '../typechain-types/contracts/NodeRegistry';

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

      const uid = node.uid;

      const retUID = await registry.registerNode.staticCall(node);
      const res = await registry.registerNode(node);
      expect(retUID).to.equal(uid);

      const nodeEntry = await registry.getNode(uid);
      const sender = accounts[0];
  
      await expect(res)
        .to.emit(registry, 'Registered')
        .withArgs(uid, await sender.getAddress(), nodeEntry);

      expect(nodeEntry.uid).to.equal(uid);
      expect(nodeEntry.name).to.equal(node.name);
      expect(nodeEntry.callbackUrl).to.equal(node.callbackUrl);
      expect(nodeEntry.industry).to.equal(node.industry);
      expect(nodeEntry.location).to.deep.equal(node.location);
      expect(nodeEntry.industryCode).to.equal(node.industryCode);
      expect(nodeEntry.nodeType).to.equal(node.nodeType);
      expect(nodeEntry.status).to.equal(node.status);
    };


    it('should allow registering a node', async () => {
      const node = {
        uid: encodeBytes32String('testUID'),
        name: 'Test Node',
        callbackUrl: 'http://testnode.com',
        industry: 'Test Industry',
        location: ['Test Location'],
        industryCode: 'TEST',
        nodeType: 0, 
        status: 0 
      };
  
      await testRegister(node);
    });

    it('should not allow registering a node with existing uid', async () => {
      const node = {
        uid: encodeBytes32String('testUID'),
        name: 'Test Node',
        callbackUrl: 'http://testnode.com',
        industry: 'Test Industry',
        location: ['Test Location'],
        industryCode: 'TEST',
        nodeType: 0, 
        status: 0 
      };
  
      await testRegister(node);
      await expect(registry.registerNode(node)).to.be.revertedWithCustomError(registry, 'AlreadyExists');
    });
  });
});