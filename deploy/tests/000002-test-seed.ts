import fs from 'fs';
import { expect } from 'chai';
import { NodeRegistry } from '../../typechain-types'; // Adjust the import path as necessary
import { describeDeployment } from '../../test/helpers/Deploy';
import { DeployedContracts } from '../../utils/Deploy';
import Logger from '../../utils/Logger';
import { TEST_NODES_OUTPUT_PATH } from '../scripts/000002-test-seed';

describeDeployment(__filename, () => {
  let nodeRegistry: NodeRegistry;
  
  beforeEach(async () => {
    nodeRegistry = await DeployedContracts.NodeRegistry.deployed();
  });
  
  it('should verify registered nodes', async () => {
    // Read registered node data from the JSON file
    const registeredNodes = JSON.parse(fs.readFileSync(TEST_NODES_OUTPUT_PATH, 'utf-8'));

    for (const { uid, name, callbackUrl, location, industryCode, nodeType, status } of registeredNodes) {
      Logger.info(`Testing registered node with UID: ${uid}...`);

      // Retrieve the node details from the NodeRegistry contract
      const nodeEntry = await nodeRegistry.getNode(uid);

      // Validate the node details
      expect(nodeEntry.name).to.equal(name);
      expect(nodeEntry.callbackUrl).to.equal(callbackUrl);
      expect(nodeEntry.location).to.deep.equal(location);
      expect(nodeEntry.industryCode).to.equal(industryCode);
      expect(nodeEntry.nodeType).to.equal(nodeType);
      expect(nodeEntry.status).to.equal(status);
    }
  });
});