// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
//import "../src/SwapExecutor.sol";
import "../src/SwapExecutor.sol";

contract DeploySwapExecutor is Script {

    address constant SUSHISWAP_ROUTER_ADDRESS = 0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506; 
    address constant ARBITRUM_PANCAKESWAP_ROUTER_ADDRESS = 0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb; 

    function run() external {
        vm.startBroadcast();

        // Deploy the SwapExecutor contract
        SwapExecutor swapExecutor = new SwapExecutor();

        // Add SushiSwap router as an AMM
        IUniswapLike sushiswapRouter = IUniswapLike(SUSHISWAP_ROUTER_ADDRESS);
        swapExecutor.addAMM(sushiswapRouter);

        // Add PancakeSwap router as an AMM 
        IUniswapLike arbitrumPancakeSwapRouter = IUniswapLike(ARBITRUM_PANCAKESWAP_ROUTER_ADDRESS);
        swapExecutor.addAMM(arbitrumPancakeSwapRouter);

        vm.stopBroadcast();
    }
}
