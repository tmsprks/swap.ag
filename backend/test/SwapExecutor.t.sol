// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/SwapExecutor.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SwapExecutorTest is Test {
    SwapExecutor public swapExecutor;
    IERC20 public weth;
    IERC20 public arb;
    IUniswapLike public sushiswapRouter;

    function setUp() public {
        // Fork the mainnet
        vm.createSelectFork(vm.envString("ARB_RPC_URL"));

        // Set up the contract and interfaces
        swapExecutor = new SwapExecutor();        
        weth = IERC20(0x82aF49447D8a07e3bd95BD0d56f35241523fBab1); // WETH token address on Arbitrum
        arb = IERC20(0x912CE59144191C1204E64559FE8253a0e49E6548);  // ARB token address on Arbitrum
        sushiswapRouter = IUniswapLike(0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb); // Sushiswap V2 router address on Arbitrum
        
        // Add Uniswap as an AMM
        swapExecutor.addAMM(sushiswapRouter);

        // Provide some WETH and ARB to the test contract for testing
        deal(address(weth), address(this), 1 ether);
        deal(address(arb), address(this), 1000 ether);
    }

    function testSwapWETHforARB() public {
        // Approve the swapExecutor to spend WETH
        weth.approve(address(swapExecutor), 1 ether);

        // Set up the swap parameters
        address[] memory path = new address[](2);
        path[0] = address(weth);
        path[1] = address(arb);
        uint256 amountIn = 1 ether;
        uint256 amountOutMin = 0; // `getAmountsOut`
        uint256 deadline = block.timestamp + 15 minutes;

        // Execute the swap
        swapExecutor.approveAndExecuteSwap(0, path, amountIn, amountOutMin, deadline);

        // Check the results
        uint256 arbBalance = arb.balanceOf(address(this));
        assertTrue(arbBalance > amountOutMin);
    }
}
