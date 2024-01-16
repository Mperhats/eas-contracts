// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import { INodeRegistry, NodeEntry } from "./INodeRegistry.sol"; 
import { EMPTY_UID } from "./Common.sol";
import { Semver } from "./Semver.sol";


/// @title NodeRegistry
/// @notice The global node registry.
contract NodeRegistry is INodeRegistry, Semver {
    error AlreadyExists();

    // The global mapping between node records and their IDs.
    mapping(bytes32 uid => NodeEntry nodeEntry) private _registry;

    /// @dev Creates a new NodeRegistry instance.
    constructor() Semver(1, 3, 0) {}

    /// @inheritdoc INodeRegistry
    function registerNode(NodeEntry calldata entry) external returns (bytes32) {
        NodeEntry memory nodeEntry = NodeEntry({
            uid: EMPTY_UID,
            name: entry.name,
            callbackUrl: entry.callbackUrl,
            industry: entry.industry,
            location: entry.location,
            industryCode: entry.industryCode,
            nodeType: entry.nodeType,
            status: entry.status
        });

        bytes32 uid = entry.uid;
        if (_registry[uid].uid != EMPTY_UID) {
            revert AlreadyExists();
        }

        nodeEntry.uid = uid;
        _registry[uid] = nodeEntry;

        emit Registered(uid, msg.sender, entry);

        return uid;
    }

    /// @inheritdoc INodeRegistry
    function getNode(bytes32 uid) external view returns (NodeEntry memory) {
        return _registry[uid];
    }
}