// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

// Simplified interface for Uniswap-like AMM functionality
interface IUniswapLike {
    function getAmountsOut(uint256 amountIn, address[] calldata path) external view returns (uint[] memory amounts);
    function swapExactTokensForTokens(
        uint256 amountIn, 
        uint256 amountOutMin, 
        address[] calldata path, 
        address to, 
        uint256 deadline
    ) external returns (uint[] memory amounts);
}

contract SwapExecutor is ReentrancyGuard {
    using SafeERC20 for IERC20; 

    address private _owner;
    IUniswapLike[] public amms;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event AMMAdded(IUniswapLike indexed amm);
    event AMMRemoved(uint indexed ammIndex);

    constructor() {
        _owner = msg.sender;
        emit OwnershipTransferred(address(0), _owner);
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Caller is not the owner");
        _;
    }

    function owner() public view returns (address) {
        return _owner;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner cannot be the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }

    function addAMM(IUniswapLike amm) external onlyOwner {
        require(address(amm) != address(0), "AMM is the zero address");
        amms.push(amm);
        emit AMMAdded(amm);
    }

    function removeAMM(uint index) external onlyOwner {
        require(index < amms.length, "Index out of bounds");
        // Remove the AMM from the array by swapping it with the last element and popping from the array.
        uint lastIndex = amms.length - 1;
        if (index != lastIndex) {
            amms[index] = amms[lastIndex];
        }
        amms.pop();
        emit AMMRemoved(index);
    }

    function approveAndExecuteSwap(
        uint ammIndex,
        address[] memory path,
        uint256 amountIn,
        uint256 amountOutMin,
        uint256 deadline
    ) external nonReentrant {
        require(ammIndex < amms.length, "Invalid AMM index");
        require(path.length >= 2, "Invalid path length");
        require(amountIn > 0, "Invalid amount");
        require(deadline >= block.timestamp, "Past deadline");

        IUniswapLike selectedAMM = amms[ammIndex];
        IERC20 inputToken = IERC20(path[0]);
        IERC20 outputToken = IERC20(path[path.length - 1]);

        // Transfer tokens to this contract and approve them for swap
        inputToken.safeTransferFrom(msg.sender, address(this), amountIn);
        //inputToken.safeApprove(address(selectedAMM), amountIn);
        inputToken.safeIncreaseAllowance(address(selectedAMM), amountIn);
        
        uint[] memory amounts = selectedAMM.swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            path,
            address(this),
            deadline
        );

        require(amounts[amounts.length - 1] >= amountOutMin, "Insufficient output amount");

        // Transfer swapped tokens back to the user
        outputToken.safeTransfer(msg.sender, amounts[amounts.length - 1]);
    }

    function withdrawToken(IERC20 token, uint256 amount) external onlyOwner {
        require(token.balanceOf(address(this)) >= amount, "Insufficient balance");
        token.safeTransfer(owner(), amount);
    }
}
