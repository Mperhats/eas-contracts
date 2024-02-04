# ocnp registry contracts

## Introduction

The Ethereum Attestation Service is a free and open protocol for on-chain attestations on EVM compatible blockchains. It is a generalized service that allows anyone to register a schema for their particular use case, and then make attestations following their schema.

## Environment Variables
Set up your wallet [here](https://docs.base.org/guides/deploy-smart-contracts/)

## Deployments

Please note that you can also import and use the addresses directly in your code using the `@ethereum-attestation-service/eas-contracts/deployments` deployment artifacts corresponding to your desired network.

### Mainnets

#### Ethereum

coming soon.

### Testnets

#### Base Sepolia

Version 1.0.1:

* **EAS**:
  * Contract: [0x4200000000000000000000000000000000000021](https://goerli.basescan.org/address/0x4200000000000000000000000000000000000021)
  * Deployment and ABI: [EAS.json](./deployments/base-goerli/EAS.json)
* **SchemaRegistry**:
  * Contract: [0x4200000000000000000000000000000000000020](https://goerli.basescan.org/address/0x4200000000000000000000000000000000000020)
  * Deployment and ABI: [SchemaRegistry.json](./deployments/base-goerli/SchemaRegistry.json)

Version 1.2.0:

* **EAS**:
  * Contract: [0xaEF4103A04090071165F78D45D83A0C0782c2B2a](https://goerli.lineascan.build/address/0xaEF4103A04090071165F78D45D83A0C0782c2B2a)
  * Deployment and ABI: [EAS.json](./deployments/linea-goerli/EAS.json)
* **SchemaRegistry**:
  * Contract: [0x55D26f9ae0203EF95494AE4C170eD35f4Cf77797](https://goerli.lineascan.build/address/0x55D26f9ae0203EF95494AE4C170eD35f4Cf77797)
  * Deployment and ABI: [SchemaRegistry.json](./deployments/linea-goerli/SchemaRegistry.json)

## Installation
```sh
yarn add @ethereum-attestation-service/eas-contracts
```

## Testing

Testing the protocol is possible via multiple approaches:

### Unit Tests

You can run the full test suite via:

```sh
yarn test
```

### Test Coverage

#### Latest Test Coverage Report (2024-02-04)
```sh
--------------------|----------|----------|----------|----------|----------------|
File                |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
--------------------|----------|----------|----------|----------|----------------|
 contracts/         |      100 |      100 |    85.71 |     87.5 |                |
  Common.sol        |      100 |      100 |        0 |        0 |          27,28 |
  INodeRegistry.sol |      100 |      100 |      100 |      100 |                |
  ISemver.sol       |      100 |      100 |      100 |      100 |                |
  NodeRegistry.sol  |      100 |      100 |      100 |      100 |                |
  Semver.sol        |      100 |      100 |      100 |      100 |                |
--------------------|----------|----------|----------|----------|----------------|
All files           |      100 |      100 |    85.71 |     87.5 |                |
--------------------|----------|----------|----------|----------|----------------|

```
#### Instructions

In order to audit the test coverage of the full test suite, run:

```sh
yarn test:coverage
```

## Profiling

You can profile the gas costs of all of the user-focused flows via:

```sh
yarn test:profile
```

## Deploying

The contracts have built-in support for deployments on different chains and mainnet forks. You can deploy the project by:

```sh
yarn deploy
```

The framework was inspired and adopted from [EAS](https://github.com/ethereum-attestation-service/eas-contracts/).

## License

EAS is open source and distributed under the MIT License (see [`LICENSE`](./LICENSE)).
