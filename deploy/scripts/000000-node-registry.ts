import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { deploy, InstanceName, setDeploymentMetadata } from '../../utils/Deploy';

const func: DeployFunction = async ({ getNamedAccounts }: HardhatRuntimeEnvironment) => {
  const { deployer } = await getNamedAccounts();

  console.log('deployer: ',deployer);
  
  await deploy({ name: InstanceName.NodeRegistry, from: deployer });

  return true;
};

export default setDeploymentMetadata(__filename, func);