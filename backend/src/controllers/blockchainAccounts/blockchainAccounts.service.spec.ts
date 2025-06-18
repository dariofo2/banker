import { Test, TestingModule } from '@nestjs/testing';
import { BlockchainAccountsService } from './blockchainAccounts.service';
import { BlockchainAccounts } from 'src/database/entity/blockchainAccounts.entity';
import Web3, { utils } from 'web3';
import { Web3Service } from 'src/web3/web3.service';
import { DatabaseRepository } from 'src/database/database.repository';
import { Users } from 'src/database/entity/users.entity';
import { CreateBlockchainAccountDTO } from 'src/database/dto/blockchainAccounts/createBlockchainAccount.dto';
import { BuildingsContractService } from 'src/web3/buildingsContract.service';
import { DepositFromBlockChainDTO } from 'src/database/dto/blockchainAccounts/depositFromBlockchain.dto';
import { DepositToBlockChainDTO } from 'src/database/dto/blockchainAccounts/depositToBlockchain.dto';

let blockchainAccountsService: BlockchainAccountsService;

//Se puede mockear todo. con jest.fn() mockeas una función, si usas jest.fn((dato)=>{return "hola"}) va a ser una function que coge el parametro dato y retorna "hola"
//Dentro de los Describe -> It se puede usar jest.spyOn para mockear ciertos casos especificos y poder luego observar si se cumplen los requisitos o comprobar que retornan etc...
//jest.spyOn().mockImplementation hace lo mismo que jest.fn(). ResolveValue Espera a resolver el valor de una promesa y returnvalue retorna el valor establecido.
//Facil eh?
process.env.EURO_TO_ETH="1000"

const mockWeb3Service= {
  node: {
    eth: {
      sendSignedTransaction: jest.fn(),
      getGasPrice: jest.fn(()=>1000)
    },
    utils
  },
  bankerAccount: {
    signTransaction: jest.fn()
  },
  sendSignedTransaction: jest.fn(),
  getTransaction:jest.fn(),
  signBankerTransaction: jest.fn(),
  bankerAddress: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
}



const mockBuildingsContractService = {
  decodeMethodAndParametersOfSend: jest.fn(),
  transfer: jest.fn(),
  getTotalSuply: jest.fn()
}
const mockDatabaseRepository = {
  createBlockchainAccount: jest.fn(),
  selectBlockChainAccountsByUserId: jest.fn(),
  selectBlockChainAccountByIdAndUserId: jest.fn(),
  updateBlockChainAccount: jest.fn(),
  deleteBlockchainAccountById: jest.fn(),
  createMovement: jest.fn(),
  selectAccountByIdAndUserId: jest.fn(),
}

const normalTransaction = {
  from: "0x8g8h9r945kfkH45fdadasd",
  to: "0xYhyt5u6k5i6ki5k6o5",
  value: 1,
}

const contractTransaction = {
  from: "0x8g8h9r945kfkH45fdadasd",
  to: "0xYhyt5u6k5i6ki5k6o5",
  value: 1,
  data: "holaaaa"
}

const user: Users = {
  id: 1,
  name:"Hola",
  password: "holaaa",
  role: 1,
  photo: " ",
  email: "hola.hola.com",
  accounts: []
}
const blockchainAccount: BlockchainAccounts = {
  id:1,
  address:"0x8g8h9r945kfkH45fdadasd",
  privatekey:"holalsdlasdoawld",
  user: user
}

const createBlockchainAccountDTO: CreateBlockchainAccountDTO = {
  address: "0x8g8h9r945kfkH45fdadasd",
  privatekey: "holalsdlasdoawld" ,
  signedTransaction: {
    messageHash: "hashhecho",
    r: "Hechooo",
    s: "holaaaa",
    v: "como se llama",
    rawTransaction: "rawtransaction",
    transactionHash: "hecha"
  }
}

const depositFromBlockchainDTO: DepositFromBlockChainDTO = {
  toAccountId: 1, 
  signedTransaction:createBlockchainAccountDTO.signedTransaction
}

const depositToBlockchainDTO : DepositToBlockChainDTO = {
  toBlockChainAccountAddress:"0x8g8h9r945kfkH45fdadasd",
  fromNormalAccountId: 1,
  amount:100
}

describe('BlockchainAccountsService', () => {
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [BlockchainAccountsService,
        {
          provide:Web3Service,
          useValue:mockWeb3Service
        },
        {
          provide:DatabaseRepository,
          useValue:mockDatabaseRepository
        },
        {
          provide: BuildingsContractService,
          useValue: mockBuildingsContractService
        }
      ]
    }).compile();

    blockchainAccountsService = app.get<BlockchainAccountsService>(BlockchainAccountsService);
    
  });

  describe('Create BlockChain Account', () => {
    it('should Create BlockchainAccount', async () => {
      jest.spyOn(mockWeb3Service.node.eth,"sendSignedTransaction").mockResolvedValue(true);
      jest.spyOn(mockDatabaseRepository,"createBlockchainAccount").mockResolvedValue(blockchainAccount);

      const result=await blockchainAccountsService.create(createBlockchainAccountDTO, user);

      expect(result).toBe(blockchainAccount);
    });
  });

  describe('List BlockchainAccounts of User', () => {
    it('should List blockchainAccounts', async () => {
      
      jest.spyOn(mockDatabaseRepository,"selectBlockChainAccountsByUserId").mockResolvedValue(blockchainAccount);

      const result=await blockchainAccountsService.findAll(user);

      expect(result).toBe(blockchainAccount);
    });
  });

  describe('List a BlockchainAccount of User', () => {
    it('should List a BlockChainAccount', async () => {
      jest.spyOn(mockDatabaseRepository,"selectBlockChainAccountByIdAndUserId").mockResolvedValue(blockchainAccount);

      const result=await blockchainAccountsService.findOne(blockchainAccount);

      expect(result).toBe(blockchainAccount);
    });
  });

  describe('Update BlockchainAccount', () => {
    it('should Update a BlockchainAccount', async () => {
      jest.spyOn(mockDatabaseRepository,"selectBlockChainAccountByIdAndUserId").mockResolvedValue(blockchainAccount);
      jest.spyOn(mockDatabaseRepository,"updateBlockChainAccount").mockResolvedValue(blockchainAccount);

      const result=await blockchainAccountsService.update(blockchainAccount);

      expect(result).toBe(blockchainAccount);
    });
  });

  describe('Remove BlockchainAccount', () => {
    it('should Delete a Blockchain Account', async () => {
      jest.spyOn(mockDatabaseRepository,"selectBlockChainAccountByIdAndUserId").mockResolvedValue(blockchainAccount);
      jest.spyOn(mockDatabaseRepository,"deleteBlockchainAccountById").mockResolvedValue(blockchainAccount);

      const result=await blockchainAccountsService.remove(blockchainAccount);

      expect(result).toBe("Delete Done");
    });
  });


  // Deposits From and To
  
  describe('Deposit From Eth', () => {
    it('should Deposit From Eth', async () => {
      jest.spyOn(mockWeb3Service,"sendSignedTransaction").mockResolvedValue("ES9056785945784930303");
      jest.spyOn(mockWeb3Service,"getTransaction").mockResolvedValue({to:mockWeb3Service.bankerAddress,value:10000000000000000});

      jest.spyOn(mockDatabaseRepository,"createMovement").mockResolvedValue({});

      
      const result=await blockchainAccountsService.depositFromEth(depositFromBlockchainDTO,user);

      expect(result).toBe(undefined);
    });
  });

  
  describe('Deposit From BC', () => {
    it('should Deposit From BC', async () => {
      jest.spyOn(mockWeb3Service,"sendSignedTransaction").mockResolvedValue("ES9056785945784930303");
      jest.spyOn(mockWeb3Service,"getTransaction").mockResolvedValue({to:mockWeb3Service.bankerAddress,value:10000000000000000});
      jest.spyOn(mockBuildingsContractService,"decodeMethodAndParametersOfSend").mockResolvedValue({__method__:"transfer(hola)",to:mockWeb3Service.bankerAddress,amount:100});

      jest.spyOn(mockDatabaseRepository,"createMovement").mockResolvedValue({});
      jest.spyOn(mockDatabaseRepository,"selectAccountByIdAndUserId").mockResolvedValue({});

      const result=await blockchainAccountsService.depositFromBC(depositFromBlockchainDTO,user);

      expect(result).toBe(undefined);
    });
  });

  describe('Deposit to Eth', () => {
    it('should Deposit To Eth', async () => {
      jest.spyOn(mockWeb3Service,"sendSignedTransaction").mockResolvedValue("ES9056785945784930303");
      jest.spyOn(mockWeb3Service,"getTransaction").mockResolvedValue({to:mockWeb3Service.bankerAddress,value:10000000000000000});
      jest.spyOn(mockBuildingsContractService,"decodeMethodAndParametersOfSend").mockResolvedValue({__method__:"transfer(hola)",to:mockWeb3Service.bankerAddress,amount:100});
      jest.spyOn(mockWeb3Service,"signBankerTransaction").mockResolvedValue(createBlockchainAccountDTO.signedTransaction);
      jest.spyOn(mockDatabaseRepository,"createMovement").mockResolvedValue({});
      jest.spyOn(mockDatabaseRepository,"selectAccountByIdAndUserId").mockResolvedValue({});

      const result=await blockchainAccountsService.depositToEth(depositToBlockchainDTO,user);

      expect(result).toBe(undefined);
    });
  });

  describe('Deposit to BC', () => {
    it('should Deposit To BC', async () => {
      jest.spyOn(mockWeb3Service,"sendSignedTransaction").mockResolvedValue("ES9056785945784930303");
      jest.spyOn(mockWeb3Service,"getTransaction").mockResolvedValue({to:mockWeb3Service.bankerAddress,value:10000000000000000});
      jest.spyOn(mockBuildingsContractService,"decodeMethodAndParametersOfSend").mockResolvedValue({__method__:"transfer(hola)",to:mockWeb3Service.bankerAddress,amount:100});
      jest.spyOn(mockWeb3Service,"signBankerTransaction").mockResolvedValue(createBlockchainAccountDTO.signedTransaction);
      jest.spyOn(mockDatabaseRepository,"createMovement").mockResolvedValue({});
      jest.spyOn(mockDatabaseRepository,"selectAccountByIdAndUserId").mockResolvedValue({});
      jest.spyOn(mockWeb3Service.bankerAccount,"signTransaction").mockResolvedValue({});

      jest.spyOn(mockBuildingsContractService,"transfer").mockImplementation(()=>{return {encodeABI: jest.fn(async ()=>"holaaa")}});

      const result=await blockchainAccountsService.depositToBC(depositToBlockchainDTO,user);

      expect(result).toBe(undefined);
    });
  });
  
});
