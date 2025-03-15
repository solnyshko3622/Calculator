// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BlockchainCalculator {
    struct Operation {
        address user;
        string operation;
        int256 operand1;
        int256 operand2;
        int256 result;
    }

    Operation[] public history;
    event Calculation(address indexed user, string operation, int256 operand1, int256 operand2, int256 result);

    function add(int256 a, int256 b) public returns (int256) {
        int256 result = a + b;
        history.push(Operation(msg.sender, "addition", a, b, result));
        emit Calculation(msg.sender, "addition", a, b, result);
        return result;
    }

    function subtract(int256 a, int256 b) public returns (int256) {
        int256 result = a - b;
        history.push(Operation(msg.sender, "subtraction", a, b, result));
        emit Calculation(msg.sender, "subtraction", a, b, result);
        return result;
    }

    function multiply(int256 a, int256 b) public returns (int256) {
        int256 result = a * b;
        history.push(Operation(msg.sender, "multiplication", a, b, result));
        emit Calculation(msg.sender, "multiplication", a, b, result);
        return result;
    }

    function divide(int256 a, int256 b) public returns (int256) {
        require(b != 0, "Cannot divide by zero");
        int256 result = a / b;
        history.push(Operation(msg.sender, "division", a, b, result));
        emit Calculation(msg.sender, "division", a, b, result);
        return result;
    }

    function getHistoryCount() public view returns (uint256) {
        return history.length;
    }

    function getHistory(uint256 index) public view returns (Operation memory) {
        require(index < history.length, "Index out of bounds");
        return history[index];
    }
}
