pragma solidity ^0.4.22;

contract DeveloperFactory {
    // Let's create a Developer!
    uint dnaDigits = 16;
    uint ageDigits = 2;
    struct Developer {
        string name;
        uint dna;
        uint age;
    }
    Developer[] public developers;
    mapping(uint => string) keyUIntValueString;
}
