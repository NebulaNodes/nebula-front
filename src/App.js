import { useState, useEffect } from 'react'
import { useMetaMask } from "metamask-react";
import Web3 from 'web3';
import Button from './components/Button'
import TextInput from './components/TextInput'
import { ethers } from "ethers";
import logo from './img/logo.png';

function App() {
  

  const { status, connect, account, chainId, ethereum } = useMetaMask();
  
  const [availableRewards, setAvailableRewards] = useState(<span className="tokenSpan"> 0 Nebu</span>)
  const [availableStakingRewards, setAvailableStakingRewards] = useState(<span className="tokenSpan"> 0 Nebu</span>)
  const [availableStakingRewardsAvax, setAvailableStakingRewardsAvax] = useState(<span className="tokenSpan"> 0 WAVAX</span>)
  const [stakedAmount, setstakedAmount] = useState(<span className="tokenSpan"> 0 Nebu Staked</span>)
  const [stakedAvaxAmount, setstakedAvaxAmount] = useState(<span className="tokenSpan"> 0 Nebu Staked</span>)
  const [APR, setAPR] = useState(<span className="tokenSpan"> 0 %</span>)
  const [APRDaily, setAPRDaily] = useState(<span className="tokenSpan"> 0 %</span>)
  const [APRAvax, setAPRAvax] = useState(<span className="tokenSpan"> 0 %</span>)
  const [APRDailyAvax, setAPRDailyAvax] = useState(<span className="tokenSpan"> 0 %</span>)
  const [nodeName, setNodeName] = useState("")
  const [blocktime, setBlocktime] = useState("")
  const [nbtoken, setnbtokens] = useState("")
  const [nbstaketoken, setnbstaketokens] = useState("")
  const [nodes, setNodes] = useState([])
  const [total, setTotalDaily] = useState(<span> - Nebu/Day </span>)
  const [currentprice, setCurrentPrice] = useState(<span> - $</span>) 
  const [currentBalance, setCurrentBalance] = useState(<span> - Nebu</span>) 
  const [currentMarketCap, setMarketCap] = useState(<span> - $</span>) 
  const [currentTVL, setcurrentTVL] = useState(<span> - $</span>) 
  const contractAddress = '0x5AA2Ff4Ab706307d8B3D90A462c1ddC055655734'
  const nodeManagementAddress = '0x7Fb35013090590B8FFb628a89851FaC6e6f0EBC9'
  const pairAddress = '0xd177B5D5c73Cb385732b658824F2c6614eB6eD4f'
  const avaxusdcAddress = '0xA389f9430876455C36478DeEa9769B7Ca4E3DDB1'
  const stakingAddress = '0xD6af5408C9A97EAaA6F90ac20319151a1F539673'
  const stakingAddressAvax = '0x8A491601A601f3994c8d41D85C4aBa40688ecd08'
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
  provider.on("network", (newNetwork, oldNetwork) => {
    // When a Provider makes its initial connection, it emits a "network"
    // event with a null oldNetwork along with the newNetwork. So, if the
    // oldNetwork exists, it represents a changing network
    if (oldNetwork) {
        window.location.reload();
    }
});
  const signer = provider.getSigner()
  const nodeManagementAbi = [
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "_rewardPerNode",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "_minPrice",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "blockTime",
          "type": "uint256"
        }
      ],
      "name": "NodeCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Paused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "minPrice",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "rewardPerNode",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "token",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "totalClaimed",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "totalNodesCreated",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "totalStaked",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "nodeName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "amount_",
          "type": "uint256"
        }
      ],
      "name": "createNodeOld",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "nodeName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "amount_",
          "type": "uint256"
        }
      ],
      "name": "createNode",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_creationTime",
          "type": "uint256"
        }
      ],
      "name": "getNodeReward",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "getAllNodesRewards",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_creationTime",
          "type": "uint256"
        }
      ],
      "name": "cashoutNodeReward",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_creationTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "rewardAmount_",
          "type": "uint256"
        }
      ],
      "name": "compoundNodeReward",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "cashoutAllNodesRewards",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "getNodesNames",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "getNodesCreationTime",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "getNodesLastClaimTime",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newToken",
          "type": "address"
        }
      ],
      "name": "updateToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "newVal",
          "type": "uint8"
        }
      ],
      "name": "updateReward",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "newVal",
          "type": "uint256"
        }
      ],
      "name": "updateMinPrice",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8[]",
          "name": "newVal",
          "type": "uint8[]"
        }
      ],
      "name": "updateBoostMultipliers",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8[]",
          "name": "newVal",
          "type": "uint8[]"
        }
      ],
      "name": "updateBoostRequiredDays",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getMinPrice",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "getNodeNumberOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "isNodeOwner",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "getAllNodes",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "creationTime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "lastClaimTime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "internalType": "struct NodeManager.NodeEntity[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "getIndexOfKey",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "burn",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  const nodeManagementContract = new ethers.Contract(nodeManagementAddress, nodeManagementAbi, signer);
  const contractAbi = [
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "payees",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "shares",
          "type": "uint256[]"
        },
        {
          "internalType": "address[]",
          "name": "addresses",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "fees",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256",
          "name": "swapAmount",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "blockTime",
          "type": "uint256"
        }
      ],
      "name": "Cashout",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "blockTime",
          "type": "uint256"
        }
      ],
      "name": "Compound",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "contract IERC20",
          "name": "token",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "ERC20PaymentReleased",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "newLiquidityWallet",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "oldLiquidityWallet",
          "type": "address"
        }
      ],
      "name": "LiquidityWalletUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "previousRate",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newRate",
          "type": "uint256"
        }
      ],
      "name": "MaxTransferAmountRateUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "shares",
          "type": "uint256"
        }
      ],
      "name": "PayeeAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "PaymentReceived",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "PaymentReleased",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "pair",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "bool",
          "name": "value",
          "type": "bool"
        }
      ],
      "name": "SetAutomatedMarketMakerPair",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokensSwapped",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "ethReceived",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokensIntoLiqudity",
          "type": "uint256"
        }
      ],
      "name": "SwapAndLiquify",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "newAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "oldAddress",
          "type": "address"
        }
      ],
      "name": "UpdateJoeRouter",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "previousRate",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newRate",
          "type": "uint256"
        }
      ],
      "name": "maxBalanceAmountRateUpdated",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "BURN_ADDRESS",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "OLD_CONTRACT",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "antiBot",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "automatedMarketMakerPairs",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "blocktopass",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "buyTax",
      "outputs": [
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "cashoutFee",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "currentBlock",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "hasMigrate",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "isBlacklisted",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "isTradingEnabled",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "joePair",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "joeRouterAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "liquidityPoolFee",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "payee",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "release",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract IERC20",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "release",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract IERC20",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "released",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "released",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "rewardsFee",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "rewardsPool",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "sellTax",
      "outputs": [
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "shares",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "swapLiquifyEnabled",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "swapTokensAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "teamPool",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "teamPoolFee",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "totalClaimed",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "totalFees",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "contract IERC20",
          "name": "token",
          "type": "address"
        }
      ],
      "name": "totalReleased",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "totalReleased",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "totalShares",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "userLastBlockBuyTransactions",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "stateMutability": "payable",
      "type": "receive",
      "payable": true
    },
    {
      "inputs": [],
      "name": "migrateOldNode",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "addresses_",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "balances_",
          "type": "uint256[]"
        }
      ],
      "name": "migrate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "burn",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newAddress",
          "type": "address"
        }
      ],
      "name": "updateJoeRouterAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "newVal",
          "type": "uint256"
        }
      ],
      "name": "updateSwapTokensAmount",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "newVal",
          "type": "address"
        }
      ],
      "name": "updateTeamPool",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "newVal",
          "type": "address"
        }
      ],
      "name": "updateRewardsPool",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "newVal",
          "type": "uint256"
        }
      ],
      "name": "updateRewardsFee",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "newVal",
          "type": "uint256"
        }
      ],
      "name": "updateLiquidityFee",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "newVal",
          "type": "uint256"
        }
      ],
      "name": "updateTeamFee",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "newVal",
          "type": "uint256"
        }
      ],
      "name": "updateCashoutFee",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "newVal",
          "type": "uint256"
        }
      ],
      "name": "updateRwSwapFee",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "newVal",
          "type": "bool"
        }
      ],
      "name": "updateSwapLiquify",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "newVal",
          "type": "bool"
        }
      ],
      "name": "updateIsTradingEnabled",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "pair",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "value",
          "type": "bool"
        }
      ],
      "name": "setAutomatedMarketMakerPair",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "value",
          "type": "bool"
        }
      ],
      "name": "setAntiBot",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "setBlockToPass",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint16",
          "name": "value",
          "type": "uint16"
        }
      ],
      "name": "setBuyTax",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint16",
          "name": "value",
          "type": "uint16"
        }
      ],
      "name": "setSellTax",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "value",
          "type": "bool"
        }
      ],
      "name": "blacklistAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "getBlock",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCurrentBlock",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "amount_",
          "type": "uint256"
        }
      ],
      "name": "createNodeWithTokens",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "blocktime",
          "type": "uint256"
        }
      ],
      "name": "cashoutReward",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "cashoutAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "blocktime",
          "type": "uint256"
        }
      ],
      "name": "compoundNodeRewards",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "creationTime",
          "type": "uint256"
        }
      ],
      "name": "compoundAllNodes",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  const nodeContract = new ethers.Contract(contractAddress, contractAbi, signer);

  const pairABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sync","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]
  const pairContract = new ethers.Contract(pairAddress, pairABI, signer);

  const avaxusdcABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sync","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]
  const avaxusdcContract = new ethers.Contract(avaxusdcAddress, avaxusdcABI, signer);

  const stakingABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_nebu",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_poolStartTime",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "pid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Deposit",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "pid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "EmergencyWithdraw",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "RewardPaid",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "pid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Withdraw",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_allocPoint",
          "type": "uint256"
        },
        {
          "internalType": "contract IERC20",
          "name": "_token",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "_withUpdate",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "_lastRewardTime",
          "type": "uint256"
        }
      ],
      "name": "add",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        }
      ],
      "name": "emergencyWithdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_fromTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_toTime",
          "type": "uint256"
        }
      ],
      "name": "getGeneratedReward",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract IERC20",
          "name": "_token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "governanceRecoverUnsupported",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "massUpdatePools",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "nebu",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "nebuPerSecond",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "operator",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "pendingNebu",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "poolEndTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "poolInfo",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "allocPoint",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "lastRewardTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "accNebuPerShare",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "stakedAmount",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isStarted",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "poolStartTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "runningTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_allocPoint",
          "type": "uint256"
        }
      ],
      "name": "set",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_operator",
          "type": "address"
        }
      ],
      "name": "setOperator",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalAllocPoint",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        }
      ],
      "name": "updatePool",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "userInfo",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "rewardDebt",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  const stakingContract = new ethers.Contract(stakingAddress, stakingABI, signer);


  const stakingAvaxABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_nebu",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_poolStartTime",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "pid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Deposit",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "pid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "EmergencyWithdraw",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "RewardPaid",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "pid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Withdraw",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_allocPoint",
          "type": "uint256"
        },
        {
          "internalType": "contract IERC20",
          "name": "_token",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "_withUpdate",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "_lastRewardTime",
          "type": "uint256"
        }
      ],
      "name": "add",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        }
      ],
      "name": "emergencyWithdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_fromTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_toTime",
          "type": "uint256"
        }
      ],
      "name": "getGeneratedReward",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract IERC20",
          "name": "_token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "governanceRecoverUnsupported",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "massUpdatePools",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "nebu",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "nebuPerSecond",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "operator",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "pendingNebu",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "poolEndTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "poolInfo",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "allocPoint",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "lastRewardTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "accNebuPerShare",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "stakedAmount",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isStarted",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "poolStartTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "runningTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_allocPoint",
          "type": "uint256"
        }
      ],
      "name": "set",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "newVal",
          "type": "uint256"
        }
      ],
      "name": "setEmission",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_operator",
          "type": "address"
        }
      ],
      "name": "setOperator",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalAllocPoint",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        }
      ],
      "name": "updatePool",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "userInfo",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "rewardDebt",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  const stakingContractWavax = new ethers.Contract(stakingAddressAvax, stakingAvaxABI, signer);


  const [allNodes, setAllNodes] = useState(0)
  const [myNodes, setMyNodes] = useState(0)
 

    const minifyAddress = (address) => {
      return address.substr(0,8) + '...' + address.substr(34,42)
    }

    const creationTimeToDate = (timestamp) => {
      var myDate = new Date( timestamp *1000);
      return myDate.toLocaleString()
    }

    async function getRewards(){
      const tx = await nodeContract.cashoutAll()
      const receipt = await tx.wait()
      console.log(receipt)
      updateInfo()
    }


    function getMyNodes(){
      if(status === 'connected'){
        return (<p>{myNodes}</p>
        )
      }else{
        return (  
            <span className="placeholder"></span>
        )
      }
    }

    function getTotalDaily(){
      if(status === 'connected'){
        return (<p>{total}</p>
        )
      }else{
        return (  
            <span className="placeholder"></span>
        )
      }
    }

    function getAllNodes(){
        if(status === 'connected'){
          return (<p className="allNodes">{allNodes}</p>)
        }else{
          return (  
            <span className="placeholder"></span>
          )
        }
      }

      function getPendingRewards(){
        if(status === 'connected'){
          return (              
              <p>{availableRewards}</p>
          )
        }else{
          return (  
              <span className="placeholder"></span>
          )
        }
      }

      function getPendingStakingRewards(){
        if(status === 'connected'){
          return (              
              <p>{availableStakingRewards}</p>
          )
        }else{
          return (  
              <span className="placeholder"></span>
          )
        }
      }

      function getPendingStakingRewardsAvax(){
        if(status === 'connected'){
          return (              
              <p>{availableStakingRewardsAvax}</p>
          )
        }else{
          return (  
              <span className="placeholder"></span>
          )
        }
      }

      function getStakedAmount(){
        if(status === 'connected'){
          return (              
              <p>{stakedAmount}</p>
          )
        }else{
          return (  
              <span className="placeholder"></span>
          )
        }
      }

      function getStakedAvaxAmount(){
        if(status === 'connected'){
          return (              
              <p>{stakedAvaxAmount}</p>
          )
        }else{
          return (  
              <span className="placeholder"></span>
          )
        }
      }

      function getAPR(){
        if(status === 'connected'){
          return (              
              <p>{APR}</p>
          )
        }else{
          return (  
              <span className="placeholder"></span>
          )
        }
      }

      function getAPRDaily(){
        if(status === 'connected'){
          return (              
              <p>{APRDaily}</p>
          )
        }else{
          return (  
              <span className="placeholder"></span>
          )
        }
      }

      function getAPRAvax(){
        if(status === 'connected'){
          return (              
              <p>{APRAvax}</p>
          )
        }else{
          return (  
              <span className="placeholder"></span>
          )
        }
      }

      function getAPRDailyAvax(){
        if(status === 'connected'){
          return (              
              <p>{APRDailyAvax}</p>
          )
        }else{
          return (  
              <span className="placeholder"></span>
          )
        }
      }

      function getCurrentNebuPrice() {
        if(status === 'connected'){
          return (              
              <p>{currentprice}</p>
          )
        }else{
          return (  
              <span className="placeholder"></span>
          )
        }
      }

      function getCurrentNebuBalance() {
        if(status === 'connected'){
          return (              
              <p>{currentBalance}</p>
          )
        }else{
          return (  
              <span className="placeholder"></span>
          )
        }
      }

      function getCurrentMarketCap() {
        if(status === 'connected'){
          return (              
              <p>{currentMarketCap}</p>
          )
        }else{
          return (  
              <span className="placeholder"></span>
          )
        }
      }

      function getCurrentTVL() {
        if(status === 'connected'){
          return (              
              <p>{currentTVL}</p>
          )
        }else{
          return (  
              <span className="placeholder"></span>
          )
        }
      }
    
    function getUnderMainButtonText(){
      if(status === 'connected'){
        return <div>Daily Rewards : 0.2 <span className="tokenSpan">Nebu </span>/ Day / NebulaNode</div>
      }else{
        return <div>Connect your Metamask to stake <span className="tokenSpan">Nebu</span></div>
      }
    }

    function handleTokensNbChange(e) {
      setnbtokens(e.target.value);
      console.log(nbtoken)
    }

    function handleStakeTokensNbChange(e) {
      setnbstaketokens(e.target.value);
      console.log(nbtoken)
    }

    async function createNode(){
      let token = Web3.utils.toWei(nbtoken, 'ether');
      const tx = await nodeContract.createNodeWithTokens(nodeName, token)
      const receipt = await tx.wait()
      console.log(receipt)
      updateInfo()
    }

    async function approve(){
      let token = Web3.utils.toWei('10000000000000', 'ether');
      const tx = await nodeContract.approve(stakingAddress, token)
      const receipt = await tx.wait()
      console.log(receipt)
      updateInfo()
    }

    async function approveAvax(){
      let token = Web3.utils.toWei('10000000000000', 'ether');
      const tx = await nodeContract.approve(stakingAddressAvax, token)
      const receipt = await tx.wait()
      console.log(receipt)
      updateInfo()
    }

    async function stake(){
      let token = Web3.utils.toWei(nbstaketoken, 'ether');
      const tx = await stakingContract.deposit(0, token)
      const receipt = await tx.wait()
      console.log(receipt)
      updateInfo()
    }

    async function stakeAvax(){
      let token = Web3.utils.toWei(nbstaketoken, 'ether');
      const tx = await stakingContractWavax.deposit(0, token)
      const receipt = await tx.wait()
      console.log(receipt)
      updateInfo()
    }

    async function claim(){
      let token = Web3.utils.toWei('0', 'ether');
      const tx = await stakingContract.withdraw(0, token)
      const receipt = await tx.wait()
      console.log(receipt)
      updateInfo()
    }

    async function claimAvax(){
      let token = Web3.utils.toWei('0', 'ether');
      const tx = await stakingContractWavax.withdraw(0, token)
      const receipt = await tx.wait()
      console.log(receipt)
      updateInfo()
    }

    async function withdraw(){
      let token = Web3.utils.toWei(nbstaketoken, 'ether');
      const tx = await stakingContract.withdraw(0, token)
      const receipt = await tx.wait()
      console.log(receipt)
      updateInfo()
    }

    async function withdrawAvax(){
      let token = Web3.utils.toWei(nbstaketoken, 'ether');
      const tx = await stakingContractWavax.withdraw(0, token)
      const receipt = await tx.wait()
      console.log(receipt)
      updateInfo()
    }

    async function migrateNode(){
      const tx = await nodeContract.migrateOldNode()
      const receipt = await tx.wait()
      console.log(receipt)
      updateInfo()
    }

    
    async function compoundNode(){
      const tx = await nodeContract.compoundAllNodes(blocktime)
      const receipt = await tx.wait()
      console.log(receipt)
      updateInfo()
    }

    async function changeChain(){
      await window.ethereum.request({
        "id": 1,
        "jsonrpc": "2.0",
        "method": "wallet_switchEthereumChain",
        "params": [
          {
            "chainId": "0xa86a"
          }
        ]
      })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error); 
    }

    async function checkChainId()  {
      console.log('check chain id')
      if(status === 'connected'){
        if(window.ethereum.chainId !== '0x61'){
          console.log('not good chain')
          await changeChain()
        }
      }else{
        await connect()
      }     
    }

    async function handleMainButtonClick () {
      if(status === 'connected'){
        if(chainId === '0xa86a'){
            await getRewards()
        }else{
            ethereum.request({
                "id": 1,
                "jsonrpc": "2.0",
                "method": "wallet_switchEthereumChain",
                "params": [
                  {
                    "chainId": "0xa86a"
                  }
                ]
              })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error);
        }            
      }else{
        await connect()        
      }
    }

    async function handleCreateNodeButtonClick () {
      if(status === 'connected'){
        if(chainId === '0xa86a'){
            (nodeName.length > 3 && nodeName.length < 32) ? await createNode() : alert('Node name must be between 3 and 31 characters long')
        }else{
            ethereum.request({
                "id": 1,
                "jsonrpc": "2.0",
                "method": "wallet_switchEthereumChain",
                "params": [
                  {
                    "chainId": "0xa86a"
                  }
                ]
              })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error);
        }            
        
      }else{
        await connect()        
      }
    }

    async function handleApproveButtonClick () {
      if(status === 'connected'){
        if(chainId === '0xa86a'){
             await approve()
        }else{
            ethereum.request({
                "id": 1,
                "jsonrpc": "2.0",
                "method": "wallet_switchEthereumChain",
                "params": [
                  {
                    "chainId": "0xa86a"
                  }
                ]
              })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error);
        }            
        
      }else{
        await connect()        
      }
    }

    async function handleApproveAvaxButtonClick () {
      if(status === 'connected'){
        if(chainId === '0xa86a'){
             await approveAvax()
        }else{
            ethereum.request({
                "id": 1,
                "jsonrpc": "2.0",
                "method": "wallet_switchEthereumChain",
                "params": [
                  {
                    "chainId": "0xa86a"
                  }
                ]
              })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error);
        }            
        
      }else{
        await connect()        
      }
    }

    async function handleStakeButtonClick () {
      if(status === 'connected'){
        if(chainId === '0xa86a'){
            await stake()
        }else{
            ethereum.request({
                "id": 1,
                "jsonrpc": "2.0",
                "method": "wallet_switchEthereumChain",
                "params": [
                  {
                    "chainId": "0xa86a"
                  }
                ]
              })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error);
        }            
        
      }else{
        await connect()        
      }
    }

    async function handleStakeAvaxButtonClick () {
      if(status === 'connected'){
        if(chainId === '0xa86a'){
            await stakeAvax()
        }else{
            ethereum.request({
                "id": 1,
                "jsonrpc": "2.0",
                "method": "wallet_switchEthereumChain",
                "params": [
                  {
                    "chainId": "0xa86a"
                  }
                ]
              })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error);
        }            
        
      }else{
        await connect()        
      }
    }

    async function handleClaimButtonClick () {
      if(status === 'connected'){
        if(chainId === '0xa86a'){
            await claim()
        }else{
            ethereum.request({
                "id": 1,
                "jsonrpc": "2.0",
                "method": "wallet_switchEthereumChain",
                "params": [
                  {
                    "chainId": "0xa86a"
                  }
                ]
              })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error);
        }            
        
      }else{
        await connect()        
      }
    }

    async function handleClaimAvaxButtonClick () {
      if(status === 'connected'){
        if(chainId === '0xa86a'){
            await claimAvax()
        }else{
            ethereum.request({
                "id": 1,
                "jsonrpc": "2.0",
                "method": "wallet_switchEthereumChain",
                "params": [
                  {
                    "chainId": "0xa86a"
                  }
                ]
              })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error);
        }            
        
      }else{
        await connect()        
      }
    }

    async function handleWithdrawButtonClick () {
      if(status === 'connected'){
        if(chainId === '0xa86a'){
            await withdraw()
        }else{
            ethereum.request({
                "id": 1,
                "jsonrpc": "2.0",
                "method": "wallet_switchEthereumChain",
                "params": [
                  {
                    "chainId": "0xa86a"
                  }
                ]
              })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error);
        }            
        
      }else{
        await connect()        
      }
    }

    async function handleWithdrawAvaxButtonClick () {
      if(status === 'connected'){
        if(chainId === '0xa86a'){
            await withdrawAvax()
        }else{
            ethereum.request({
                "id": 1,
                "jsonrpc": "2.0",
                "method": "wallet_switchEthereumChain",
                "params": [
                  {
                    "chainId": "0xa86a"
                  }
                ]
              })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error);
        }            
        
      }else{
        await connect()        
      }
    }
    
    async function handleMigrateNodeButtonClick () {
      if(status === 'connected'){
        if(chainId === '0xa86a'){
            await migrateNode()
        }else{
            ethereum.request({
                "id": 1,
                "jsonrpc": "2.0",
                "method": "wallet_switchEthereumChain",
                "params": [
                  {
                    "chainId": "0xa86a"
                  }
                ]
              })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error);
        }            
        
      }else{
        await connect()        
      }
    }

    async function handleCompoundNodeButtonClick () {
      if(status === 'connected'){
        if(chainId === '0xa86a'){
            await compoundNode()
        }else{
            ethereum.request({
                "id": 1,
                "jsonrpc": "2.0",
                "method": "wallet_switchEthereumChain",
                "params": [
                  {
                    "chainId": "0xa86a"
                  }
                ]
              })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error);
        }            
        
      }else{
        await connect()        
      }
    }

    const updateInfo = async () => {

      try{
        let tx = await nodeManagementContract.getNodeNumberOf(account)
        console.log(tx.toString())
        setMyNodes(tx.toString() + "/100")
      }catch (e){
        console.log("error" + e)
        
      }

      try{
        let tx9 = await nodeContract.balanceOf(account)
        console.log(tx9.toString())
        setCurrentBalance(<span className="tokenSpan">{formatToken(tx9).toString()} Nebu</span>)
      }catch (e){
        console.log("error update balance info change account " + e)
      }

      try{
      let tx2 = await nodeManagementContract.totalNodesCreated()
      console.log(tx2.toString())
      setAllNodes(tx2.toString())
      }catch (e){
        console.log("error update info " + e)
      }
      try {
        let tx3 = await nodeManagementContract.getAllNodesRewards(account)
        console.log(tx3.toString())
        setAvailableRewards(<span className="tokenSpan">{formatToken(tx3).toString()} Nebu</span>)
      }catch (e){
        console.log("error" + e)
        
      }
      try {
        let tx20 = await stakingContract.pendingNebu(0, account)
        console.log(tx20.toString())
        setAvailableStakingRewards(<span className="tokenSpan">{formatToken(tx20).toString()} Nebu</span>)
      }catch (e){
        console.log("error" + e)
        
      }

      try {
        let tx30 = await stakingContractWavax.pendingNebu(0, account)
        console.log(tx30.toString())
      }catch (e){
        console.log("error" + e)
        
      }
      

      try {
        var pid = ethers.utils.parseUnits('0', 1);
        let tx21 = await stakingContract.userInfo(pid, account)
        setstakedAmount(<span className="tokenSpan">{formatToken(tx21).toString()} Nebu Staked</span>)
      }catch (e){
        console.log("error" + e)
        
      }

      try {
        let tx31 = await stakingContractWavax.userInfo(0, account)
        console.log(tx31.toString())
        setstakedAvaxAmount(<span className="tokenSpan">{formatToken(tx31.amount)} Nebu Staked</span>)
      }catch (e){
        console.log("error" + e)
        
      }

      try {
        let tx4 = await nodeManagementContract.getNodesNames(account)
        let namesArray = tx4.toString().split("#")

        let tx5 = await nodeManagementContract.getNodesCreationTime(account)
        let creationTimeArray = tx5.toString().split("#")

        let tx10 = await nodeManagementContract.getAllNodes(account)
        console.log(tx10[0].amount.toString())
  
        let nodes = []
        let total = Number();
  
        for (let i = 0; i < creationTimeArray.length; i++) {
          let tx6 = await nodeManagementContract.getNodeReward(account, creationTimeArray[i])
          let dailyrewards = (tx10[i].amount).mul(20).div(1000)
          console.log(formatToken(dailyrewards))
          total = total + Number((formatToken(dailyrewards)))
  
          let newNode = {
            name: namesArray[i],
            creationTime: creationTimeArray[i],
            rewards: formatToken(tx6).toString(),
            value: formatToken(tx10[i].amount).toString(),
            daily: formatToken(dailyrewards).toString()          
          }
          nodes.push(newNode)
        }
        setBlocktime(nodes[0].creationTime)
        setTotalDaily(<span className="tokenSpan">{total.toFixed(2)} Nebu/Day</span>)
        console.log(nodes)
        console.log(blocktime)
        setNodes(nodes)
      }catch(e){
        console.log("No nodes")
      }
      
      try {
        let tx6 = await pairContract.getReserves();
        let avaxReserve = tx6._reserve1;
        let nebuReserve = tx6._reserve0;

        let tx7 = await avaxusdcContract.getReserves();
        let avax1Reserve = formatToken(tx7._reserve1);
        let usdcReserve = tx7._reserve0;
        usdcReserve = usdcReserve * (1e-6)

        let AvaxPrice = usdcReserve / avax1Reserve;
        let tokenPriceAvax = (avaxReserve / nebuReserve) * AvaxPrice;
        
        let tx8 = await nodeContract.totalSupply();
        let rwsupply = await nodeContract.balanceOf("0x6912B4ee8370306C719F2F78129114b75581DcF8");

        let supply = tx8.sub(rwsupply);
        setMarketCap(<span>{formatToken(supply).toString()} $</span>);

        let tx22 = await stakingContract.poolInfo(0);
        let TVL = formatToken(tx22.stakedAmount) * tokenPriceAvax;
        setcurrentTVL(<span>{TVL.toFixed(2).toString()} $</span>)


        let tokensec = await stakingContract.nebuPerSecond()
        let tokenperhour = tokensec.mul(60).mul(60)

        let totalRewardsPerYear = tokenPriceAvax * Number(tokenperhour.mul(24).mul(365))

        let yearlyAPR = (totalRewardsPerYear / tx22.stakedAmount) * 10

        setAPR(<span>{yearlyAPR.toFixed(2)} %</span>)

        setCurrentPrice(<span>{tokenPriceAvax.toFixed(2).toString()} $</span>)
      }catch(e){
        console.log("No Pair")
      }
    }

    const updateInfoChangeAccount = async () => {

      console.log(account)

      setNodes([])

      
      setMyNodes(0 + "/100")
      setAvailableRewards(<span className="tokenSpan">0 Nebu</span>)

      try{
        let tx = await nodeManagementContract.getNodeNumberOf(account)
        console.log(tx.toString())
        setMyNodes(tx.toString() + "/100")
      }catch (e){
        console.log("error update info change account " + e)
      }

      try{
        let tx9 = await nodeContract.balanceOf(account)
        console.log(tx9.toString())
        setCurrentBalance(<span className="tokenSpan">{formatToken(tx9).toString()} Nebu</span>)
      }catch (e){
        console.log("error update balance info change account " + e)
      }
      
      try{
      let tx2 = await nodeManagementContract.totalNodesCreated()
      console.log(tx2.toString())
      setAllNodes(tx2.toString())
      }catch (e){
        console.log("error" + e)
        
      }

      try {
        let tx3 = await nodeManagementContract.getAllNodesRewards(account)
        console.log((tx3).toString())
        setAvailableRewards(<span className="tokenSpan">{formatToken(tx3).toString()} Nebu</span>)
      }catch (e){
        console.log("error" + e)
        
      }

      try {
        let tx20 = await stakingContract.pendingNebu(0, account)
        console.log(tx20.toString())
        setAvailableStakingRewards(<span className="tokenSpan">{formatToken(tx20).toString()} Nebu</span>)
      }catch (e){
        console.log("error" + e)
        
      }

      try {
        let tx30 = await stakingContractWavax.pendingNebu(0, account)
        console.log(tx30.toString())
      }catch (e){
        console.log("error" + e)
        
      }

      try {
        let tx21 = await stakingContract.userInfo(0, account)
        console.log(tx21.toString())
        setstakedAmount(<span className="tokenSpan">{formatToken(tx21.amount)} Nebu Staked</span>)
      }catch (e){
        console.log("error" + e)
        
      }

      try {
        let tx31 = await stakingContractWavax.userInfo(0, account)
        console.log(tx31.toString())
        setstakedAvaxAmount(<span className="tokenSpan">{formatToken(tx31.amount)} Nebu Staked</span>)
      }catch (e){
        console.log("error" + e)
        
      }

      try {
        let tx6 = await pairContract.getReserves();
        let avaxReserve = tx6._reserve1;
        let nebuReserve = tx6._reserve0;

        let tx7 = await avaxusdcContract.getReserves();
        let avax1Reserve = formatToken(tx7._reserve1);
        let usdcReserve = tx7._reserve0;
        usdcReserve = usdcReserve * (1e-6)

        let AvaxPrice = usdcReserve / avax1Reserve;
        let tokenPriceAvax = (avaxReserve / nebuReserve) * AvaxPrice;
        
        let tx8 = await nodeContract.totalSupply();
        let rwsupply = await nodeContract.balanceOf("0x6912B4ee8370306C719F2F78129114b75581DcF8");

        let supply = formatToken(tx8.sub(rwsupply));
        let marketCap = supply * tokenPriceAvax;
        console.log(marketCap);
        setMarketCap(<span>{marketCap.toFixed(2).toString()} $</span>);

        let tx22 = await stakingContract.poolInfo(0);
        let tx32 = await stakingContractWavax.poolInfo(0);
        let TVL = formatToken(tx22.stakedAmount) * tokenPriceAvax;
        setcurrentTVL(<span>{TVL.toFixed(2).toString()} $</span>)

        let tokensec = await stakingContract.nebuPerSecond()
        let tokenperhour = tokensec.mul(60).mul(60)

        let totalRewardsPerYear = tokenPriceAvax * Number(tokenperhour.mul(24).mul(365))
        let totalRewardsPerDay = tokenPriceAvax * Number(tokenperhour.mul(24))

        let dailyAPR = (totalRewardsPerDay / tx22.stakedAmount) * 10
        let yearlyAPR = (totalRewardsPerYear / tx22.stakedAmount) * 10

        setAPR(<span>{yearlyAPR.toFixed(2)} %</span>)

        setAPRDaily(<span>{dailyAPR.toFixed(2)} %</span>)


        let tokensecAvax = await stakingContractWavax.nebuPerSecond()
        let tokenperhourAvax = tokensecAvax.mul(60).mul(60)

        let totalRewardsPerYearAvax = AvaxPrice * Number(tokenperhourAvax.mul(24).mul(365))
        let totalRewardsPerDayAvax = AvaxPrice * Number(tokenperhourAvax.mul(24))

        let dailyAPRAvax = (totalRewardsPerDayAvax / tx32.stakedAmount) * 10
        let yearlyAPRAvax = (totalRewardsPerYearAvax / tx32.stakedAmount) * 10


        setCurrentPrice(<span>{tokenPriceAvax.toFixed(2).toString()} $</span>)
        
      }catch(e){
        console.log("No Pair")
      }
      
      try {
        
        let tx4 = await nodeManagementContract.getNodesNames(account)
        let namesArray = tx4.toString().split("#")

        let tx5 = await nodeManagementContract.getNodesCreationTime(account)
        let creationTimeArray = tx5.toString().split("#")

        let tx10 = await nodeManagementContract.getAllNodes(account)
        console.log(tx10[0].amount.toString())
  
        let nodes = []
        let total = Number();
        
  
        for (let i = 0; i < creationTimeArray.length; i++) {
          let tx6 = await nodeManagementContract.getNodeReward(account, creationTimeArray[i])
          let dailyrewards = (tx10[i].amount).mul(20).div(1000)
          console.log(formatToken(dailyrewards))
          total = total + Number((formatToken(dailyrewards)))
          
  
          let newNode = {
            name: namesArray[i],
            creationTime: creationTimeArray[i],
            rewards: formatToken(tx6).toString(),
            value: formatToken(tx10[i].amount).toString(),
            daily: formatToken(dailyrewards).toString(),  
          }
          nodes.push(newNode)
      }
      setBlocktime(nodes[0].creationTime)
      setTotalDaily(<span className="tokenSpan">{total.toFixed(2)} Nebu/Day</span>)
      console.log(nodes)
      console.log(blocktime)
      setNodes(nodes)
      }catch(e){
        console.log("No nodes")
      }     
       
    }

    const updateInfoCurrentAccount = async () => {

      console.log(account)

      setAvailableRewards(<span className="tokenSpan">0 Nebu</span>)


      try{
        let tx9 = await nodeContract.balanceOf(account)
        console.log(tx9.toString())
        setCurrentBalance(<span className="tokenSpan">{formatToken(tx9).toString()} Nebu</span>)
      }catch (e){
        console.log("error update balance info change account " + e)
      }
      
      try{
      let tx2 = await nodeManagementContract.totalNodesCreated()
      console.log(tx2.toString())
      setAllNodes(tx2.toString())
      }catch (e){
        console.log("error" + e)
        
      }

      try {
        let tx3 = await nodeManagementContract.getAllNodesRewards(account)
        console.log((tx3).toString())
        setAvailableRewards(<span className="tokenSpan">{formatToken(tx3).toString()} Nebu</span>)
      }catch (e){
        console.log("error" + e)
        
      }

      try {
        let tx20 = await stakingContract.pendingNebu(0, account)
        console.log(tx20.toString())
        setAvailableStakingRewards(<span className="tokenSpan">{formatToken(tx20).toString()} Nebu</span>)
      }catch (e){
        console.log("error" + e)
        
      }

      try {
        let tx30 = await stakingContractWavax.pendingNebu(0, account)
        console.log(tx30.toString())
      }catch (e){
        console.log("error" + e)
        
      }
      

      try {
        let tx6 = await pairContract.getReserves();
        let avaxReserve = tx6._reserve1;
        let nebuReserve = tx6._reserve0;

        let tx7 = await avaxusdcContract.getReserves();
        let avax1Reserve = formatToken(tx7._reserve1);
        let usdcReserve = tx7._reserve0;
        usdcReserve = usdcReserve * (1e-6)

        let AvaxPrice = usdcReserve / avax1Reserve;
        let tokenPriceAvax = (avaxReserve / nebuReserve) * AvaxPrice;
        
        let tx8 = await nodeContract.totalSupply();
        let rwsupply = await nodeContract.balanceOf("0x6912B4ee8370306C719F2F78129114b75581DcF8");

        let supply = formatToken(tx8.sub(rwsupply));
        let marketCap = supply * tokenPriceAvax;
        console.log(marketCap);
        setMarketCap(<span>{marketCap.toFixed(2).toString()} $</span>);

        let tx22 = await stakingContract.poolInfo(0);
        let tx32 = await stakingContractWavax.poolInfo(0);
        let TVL = formatToken(tx22.stakedAmount) * tokenPriceAvax;
        setcurrentTVL(<span>{TVL.toFixed(2).toString()} $</span>)

        let tokensec = await stakingContract.nebuPerSecond()
        let tokenperhour = tokensec.mul(60).mul(60)

        let totalRewardsPerYear = tokenPriceAvax * Number(tokenperhour.mul(24).mul(365))
        let totalRewardsPerDay = tokenPriceAvax * Number(tokenperhour.mul(24))

        let dailyAPR = (totalRewardsPerDay / tx22.stakedAmount) * 10
        let yearlyAPR = (totalRewardsPerYear / tx22.stakedAmount) * 10

        setAPR(<span>{yearlyAPR.toFixed(2)} %</span>)

        setAPRDaily(<span>{dailyAPR.toFixed(2)} %</span>)

        let tokensecAvax = await stakingContractWavax.nebuPerSecond()
        let tokenperhourAvax = tokensecAvax.mul(60).mul(60)

        let totalRewardsPerYearAvax = AvaxPrice * Number(tokenperhourAvax.mul(24).mul(365))
        let totalRewardsPerDayAvax = AvaxPrice * Number(tokenperhourAvax.mul(24))

        let dailyAPRAvax = (totalRewardsPerDayAvax / tx32.stakedAmount) * 10
        let yearlyAPRAvax = (totalRewardsPerYearAvax / tx32.stakedAmount) * 10



        setCurrentPrice(<span>{tokenPriceAvax.toFixed(2).toString()} $</span>)
        
      }catch(e){
        console.log("No Pair")
      }   
       
    }

    function formatToken(decimals){
      const balance = ethers.BigNumber.from(decimals);
      const remainder = balance.mod(1e15);
      return ethers.utils.formatEther(balance.sub(remainder));
    }
    
    useEffect( () => {
      updateInfoChangeAccount()

        const interval = setInterval(() => {
          console.log('This will run every 30 sec!');
          updateInfoCurrentAccount();
        }, 30000);
        return () => clearInterval(interval);

    }, [account])

  return (
      <div id='container'>
      {console.log('reset')}
        <header>          
            <p>{status === 'connected' ? minifyAddress(account) : 'Connect to Metamask' }</p>

            {/* <div id="galaxy">
    
              <div className="planet">
                    <svg id="ring" xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 152.5 135.6">
                    <radialGradient id="SVGID_1_" cx="40.124" cy="364.76" r="65.295" gradientTransform="matrix(.3997 .9167 -.1528 .0666 518.507 -167.787)" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="#CCE0F4" stopOpacity=".1"/>
                      <stop offset=".047" stopColor="#C3DCF2" stopOpacity=".089"/>
                      <stop offset=".124" stopColor="#A9D2EE" stopOpacity=".07"/>
                      <stop offset=".223" stopColor="#80C2E7" stopOpacity=".046"/>
                      <stop offset=".338" stopColor="#47ACDE" stopOpacity=".018"/>
                      <stop offset=".412" stopColor="#1E9CD7" stopOpacity="0"/>
                      <stop offset=".669" stopColor="#0075BE" stopOpacity="0"/>
                      <stop offset=".994" stopColor="#A3DAFF"/>
                    </radialGradient>
                    <path className="ring-style" d="M119.3 91.2c16 18 24.8 32 21.4 35.8-5.4 5.9-38.5-15.4-74-47.6s-59.9-63.1-54.6-69C15.2 7 27.4 12.6 44 24"/>
                  </svg>
                    </div>
                  <div className="c-container">
                  <div className="comet">
                  </div>
                </div>
            </div> */}
            <div>
              <img src={logo} alt="NebuLogo" class="logo" width="250" length="250"/>
            </div>

            <div><a  href="https://traderjoexyz.com/trade?outputCurrency=0x5AA2Ff4Ab706307d8B3D90A462c1ddC055655734" target='_blank' rel="noreferrer noopener">Buy <span className="tokenSpan1">Nebu</span></a></div>
            <div><a  href="https://dexscreener.com/avalanche/0xd177B5D5c73Cb385732b658824F2c6614eB6eD4f" target='_blank' rel="noreferrer noopener">Chart</a></div>

            <div id='socials'>
                <div>
                    <a href="https://discord.gg/m5g3zvTfPs" target='_blank' rel="noreferrer noopener "><i className="fab fa-discord"></i></a>
                </div>
                <div><a href="https://twitter.com/NebulaNodes" target='_blank' rel="noreferrer noopener"><i className="fab fa-twitter"></i></a></div>
                
                <div><a href="https://docs.nebulanodes.finance/" target='_blank' rel="noreferrer noopener"><i className="fas fa-book"></i></a></div>
            </div>
        </header>
        <div id='body'>

        <div className="zone" id="infos">
                <div className="titleZone">Nebula Token informations</div>
                <div className="rowForColumns">
                    <div id='balance'>
                        <div>NeBu Balance</div>
                        {getCurrentNebuBalance()}
                    </div>
                    <div id='price'>
                        <div>NeBu Price</div>
                        {getCurrentNebuPrice()}
                    </div>
                    <div id='mc'>
                        <div>Market Cap</div>
                        {getCurrentMarketCap()}
                    </div>
                    <div id='tvl'>
                        <div>Total Value Locked</div>
                        {getCurrentTVL()}
                    </div>
                </div>               
            </div>

            <div className="zone" id="nodes">
                <div className="titleZone">NebulaNodes informations</div>
                <div className="rowForColumns">
                    <div id='myNodes'>
                        <div>My NebulaNodes</div>
                        {getMyNodes()}
                    </div>
                    <div id='myNodes'>
                        <div>My daily Rewards</div>
                        {getTotalDaily()}
                    </div>
                    <div id='allNodes'>
                        <div className="allNodes">All NebulaNodes</div>
                        {getAllNodes()}
                    </div>
                    <div id='rewards'>
                        <div>Available Rewards</div>
                        {getPendingRewards()}
                    </div>
                </div>
                <div className='toCenter'>
                    <div><Button onClick={handleMainButtonClick} text={status === 'connected' ? 'Get Rewards' : 'Connect to Metamask'} width='250px'/>
                    <Button text={status === 'connected' ? 'Compound All Node' : 'Connect to Metamask'} onClick={handleCompoundNodeButtonClick} width='200px'/>
                    </div>
                    {getUnderMainButtonText()}
                </div>                              
            </div>

            <div className="zone" id='create'>
                <div className="toCenter">
                    <div><TextInput placeholder='NebulaNode Name' onChange={(e) => setNodeName(e.target.value) } /></div>
                    <div><TextInput placeholder='Nb tokens (e.g. 10.0)' onChange={handleTokensNbChange}/></div>
                    <div>
                        <Button text={status === 'connected' ? 'Create a NebulaNode' : 'Connect to Metamask'} onClick={handleCreateNodeButtonClick} width='200px'/>
                        <Button text={status === 'connected' ? 'Migrate Old Node' : 'Connect to Metamask'} onClick={handleMigrateNodeButtonClick} width='200px'/>
                    </div>                    
                    <div >1 NebulaNode = 10 <span className="tokenSpan">Nebu</span> (if you have any problem during migration send a message in v2-migrate-help on discord)</div>
                </div>
            </div>

            <div className="zone" id='create'>
                <div className="toCenter">
                      <div className="titleZone">Nebula Staking</div>
                      <div className="rowForColumns" id='rewardsStaking'>
                        <div>Available Rewards</div>                                                                                                                    
                        <div className="stake">Staked</div>
                        <div className="staked">APR</div>
                        <div className="staked">APR Daily</div>
                    </div>
                    <div className="rowForColumns" id='rewardsStaking'>
                        <div>{getPendingStakingRewards()}</div>                                                                                                                    
                        <div className="stak">{getStakedAmount()}</div>
                        <div className="stakd">{getAPR()}</div>
                        <div className="stak">{getAPRDaily()}</div>
                    </div>
                    <div><TextInput placeholder='Nb tokens (e.g. 10.0)' onChange={handleStakeTokensNbChange}/></div>
                      <div>
                        <Button text={status === 'connected' ? 'Approve' : 'Connect to Metamask'} onClick={handleApproveButtonClick} width='200px'/>
                        <Button text={status === 'connected' ? 'Stake' : 'Connect to Metamask'} onClick={handleStakeButtonClick} width='200px'/>
                        <Button text={status === 'connected' ? 'Claim' : 'Connect to Metamask'} onClick={handleClaimButtonClick} width='200px'/> 
                        <Button text={status === 'connected' ? 'Withdraw' :  'Connect to Metamask'} onClick={handleWithdrawButtonClick} width='200px'/> 
                        </div>                  
                  </div>
              </div>


              <div className="zone" id='create'>
                <div className="toCenter">
                      <div className="titleZone">Nebula Staking for WAVAX</div>
                      <div className="rowForColumns" id='rewardsStaking'>
                        <div>Available Rewards</div>                                                                                                                    
                        <div className="stake">Staked</div>
                        <div className="staked">APR</div>
                        <div className="staked">APR Daily</div>
                    </div>
                    <div className="rowForColumns" id='rewardsStaking'>
                        <div>{getPendingStakingRewardsAvax()}</div>                                                                                                                    
                        <div className="stak">{getStakedAvaxAmount()}</div>
                        <div className="stakd">{getAPRAvax()}</div>
                        <div className="stak">{getAPRDailyAvax()}</div>
                    </div>
                    <div><TextInput placeholder='Nb tokens (e.g. 10.0)' onChange={handleStakeTokensNbChange}/></div>
                      <div>
                        <Button text={status === 'connected' ? 'Withdraw' :  'Connect to Metamask'} onClick={handleWithdrawAvaxButtonClick} width='200px'/> 
                        </div>                  
                  </div>
              </div>

              
   
            <div className="zone" id='owned'>
                <div className="titleZone" id='zone3row1'>
                    <p>Owned <span className="tokenSpan">Nebula</span>Nodes</p>
                    <p>Reload the page to update your <b>rewards</b></p>
                </div>
                <div className="rowForColumns">
                    <div><b>Created Time</b></div>
                    <div className="name"><b>Name</b></div>
                    <div className="rewards"><b>Rewards</b></div>
                    <div className="value"><b>Value</b></div>
                    <div className="value"><b>Daily Rewards</b></div>
                </div>
                {nodes.map( (node) => (
                <div key={node.name} className="rowForColumns">
                    <div>{creationTimeToDate(node.creationTime)}</div>
                    <div className="nameRow">{node.name}</div>
                    <div>{node.rewards} <span className="tokenSpan">Nebu </span></div>
                    <div>{node.value}</div>
                    <div>{node.daily}<span className="tokenSpan"> Nebu </span> per day</div>                 
                </div>)
                )}  
            </div>
            {/* <div className="zone" id='staked'>
                <div className="titleZone">Staked <span className="tokenSpan">Nebu</span> Nodes</div>
                <div className="rowForColumns">
                    <div>Locked Until</div>
                    <div>Name</div>
                    <div>Tokens</div>
                </div>
            </div> */}
        </div>
        {/* <Button text={status === 'connected' ? 'Test button' : 'Connect to Metamask'} onClick={makeItRain} width='150px'/> */}
      </div>
  );
}
export default App;
