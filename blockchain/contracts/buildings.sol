// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.28;

import "openzeppelin/contracts/utils/Counters.sol";
import "openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Buildings is ERC20 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint private _fee=10;
    address payable private _owner;

    mapping(uint256 => Building) private TokenId_ToBuilding;
    mapping(address => uint256[]) private Address_ToTokens;
    uint256[] private _onSaleBuildings;

    struct Building {
        string name;
        uint level;
        uint timeFromSpend;
        address owner;
        bool onSale;
        uint value;
    }
    
    constructor() public ERC20("Building", "BD") {
        _owner=payable(msg.sender);
        _mint(address(this),500000000);
    }

    function ownerOf(uint256 tokenId) public view returns (address) {
        return TokenId_ToBuilding[tokenId].owner;
    }
    
    function createBuilding(string memory name) public payable returns (uint256) {
        require(msg.value== 1 ether);
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();

        TokenId_ToBuilding[newTokenId] = Building(name,1,block.timestamp,msg.sender,false,0);
        Address_ToTokens[msg.sender].push(newTokenId);

        return newTokenId;
    }
    
    function getBuildingsTokenIdsFromAddress () public view returns (uint[] memory) {
        return Address_ToTokens[msg.sender];
    }

    function getBuilding (uint256 tokenId) public view returns (Building memory) {
        //require(ownerOf(tokenId)==msg.sender);
        Building memory building = TokenId_ToBuilding[tokenId];
        return building;
    }

    function upLevelBuilding (uint256 tokenId) public payable returns (uint) {
        require(ownerOf(tokenId)==msg.sender);
        require(msg.value==1 ether);

        TokenId_ToBuilding[tokenId].level++;
        
        return TokenId_ToBuilding[tokenId].level;
    }

    function withDraw () external {
        _owner.transfer(address(this).balance);
    }

    function payLoadBuilding (uint256 tokenId) public {
        require(ownerOf(tokenId)==msg.sender);

        Building memory building=TokenId_ToBuilding[tokenId];

        uint timeFromSpend=building.timeFromSpend;
        uint level=building.level;

        uint timePassed=block.timestamp - timeFromSpend;

        uint amount= timePassed * level * _fee;
        TokenId_ToBuilding[tokenId].timeFromSpend=block.timestamp;

        _transfer(address(this), msg.sender, amount);

        
    } 

    function putBuildingOnSale (uint256 tokenId,uint value) public {
        require(ownerOf(tokenId)==msg.sender);
        require(TokenId_ToBuilding[tokenId].onSale==false);
        
        TokenId_ToBuilding[tokenId].onSale=true;
        TokenId_ToBuilding[tokenId].value=value;

        _onSaleBuildings.push(tokenId);
    }

    function transferBuyBuilding(uint tokenId) public {
        
        Building memory building= TokenId_ToBuilding[tokenId];
        require (building.onSale);
        
        transfer(building.owner, building.value);
        address buildingLastOwner=building.owner;

        //Delete Building in msg.sender
        TokenId_ToBuilding[tokenId].onSale=false;
        TokenId_ToBuilding[tokenId].owner=msg.sender;
        Address_ToTokens[msg.sender].push(tokenId);
        
        for (uint256 i = 0; i < Address_ToTokens[buildingLastOwner].length; i++) {
            uint256 x = Address_ToTokens[buildingLastOwner][i];
            if (x==tokenId) {
                delete Address_ToTokens[buildingLastOwner][i];
                break;
            }
        }

        for (uint256 i = 0; i < _onSaleBuildings.length; i++) {
            uint256 x= _onSaleBuildings[i];
            if (x==tokenId) {
                delete _onSaleBuildings[i];
                break;
            }
        }
        
    }

    function getBuildingsOnSale () public view returns (uint256[] memory) {
        return _onSaleBuildings;
    }


}
