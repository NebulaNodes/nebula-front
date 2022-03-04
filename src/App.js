import { useState, useEffect } from 'react'
import { useMetaMask } from "metamask-react";
import Button from './components/Button'
import TextInput from './components/TextInput'
import { ethers } from "ethers";
import logo from './img/logo.png';

function App() {
  

  const { status, connect, account, chainId, ethereum } = useMetaMask();
  
  const [availableRewards, setAvailableRewards] = useState(<span className="tokenSpan"> 0 Nebu</span>)
  const [nodeName, setNodeName] = useState("")
  const [nodes, setNodes] = useState([])

  const contractAddress = '0x1aEa17a08EdE10D158baac969f809E6747cb2B22'
  const nodeManagementAddress = '0xd311d77c8F4665bdA9e684Cd08f8991f364AbEF5'
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
  const nodeManagementAbi = [{"inputs":[{"internalType":"uint8","name":"_rewardPerNode","type":"uint8"},{"internalType":"uint256","name":"_minPrice","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"uint256","name":"blockTime","type":"uint256"}],"name":"NodeCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"cashoutAllNodesRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"_creationTime","type":"uint256"}],"name":"cashoutNodeReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"_creationTime","type":"uint256"},{"internalType":"uint256","name":"rewardAmount_","type":"uint256"}],"name":"compoundNodeReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"string","name":"nodeName","type":"string"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"createNode","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getAllNodes","outputs":[{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"creationTime","type":"uint256"},{"internalType":"uint256","name":"lastClaimTime","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct NodeManager.NodeEntity[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getAllNodesRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getIndexOfKey","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMinPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getNodeNumberOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"_creationTime","type":"uint256"}],"name":"getNodeReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getNodesCreationTime","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getNodesLastClaimTime","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getNodesNames","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isNodeOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerNode","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalClaimed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalNodesCreated","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8[]","name":"newVal","type":"uint8[]"}],"name":"updateBoostMultipliers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8[]","name":"newVal","type":"uint8[]"}],"name":"updateBoostRequiredDays","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newVal","type":"uint256"}],"name":"updateMinPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"newVal","type":"uint8"}],"name":"updateReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newToken","type":"address"}],"name":"updateToken","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  const nodeManagementContract = new ethers.Contract(nodeManagementAddress, nodeManagementAbi, signer);
  const contractAbi = [    
    "function cashoutAll() external",
    "function createNodeWithTokens(string memory name, uint256 amount_) external"
  ];

  const nodeContract = new ethers.Contract(contractAddress, contractAbi, signer);

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
    
    function getUnderMainButtonText(){
      if(status === 'connected'){
        return <div>Daily Rewards : 1.44 <span className="tokenSpan">Nebu </span>/ Day / NebulaNode</div>
      }else{
        return <div>Connect your Metamask to stake <span className="tokenSpan">Nebu</span></div>
      }
    }

    async function createNode(){
      const tx = await nodeContract.createNodeWithTokens(nodeName, "10000000000000000000")
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

    const updateInfo = async () => {

      try{
        let tx = await nodeManagementContract.getNodeNumberOf(account)
        console.log(tx.toString())
        setMyNodes(tx.toString() + "/100")
      }catch (e){
        console.log("error" + e)
        
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
        let tx4 = await nodeManagementContract.getNodesNames(account)
        let namesArray = tx4.toString().split("#")

        let tx5 = await nodeManagementContract.getNodesCreationTime(account)
        let creationTimeArray = tx5.toString().split("#")
  
        let nodes = []
  
        for (let i = 0; i < creationTimeArray.length; i++) {
          let tx6 = await nodeManagementContract.getNodeReward(account, creationTimeArray[i])
  
          let newNode = {
            name: namesArray[i],
            creationTime: creationTimeArray[i],
            rewards: formatToken(tx6).toString()
          }
          nodes.push(newNode)
        }

        console.log(nodes)
        setNodes(nodes)
      }catch(e){
        console.log("No nodes")
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
        
        let tx4 = await nodeManagementContract.getNodesNames(account)
        let namesArray = tx4.toString().split("#")

        let tx5 = await nodeManagementContract.getNodesCreationTime(account)
        let creationTimeArray = tx5.toString().split("#")
  
        let nodes = []
  
        for (let i = 0; i < creationTimeArray.length; i++) {
          let tx6 = await nodeManagementContract.getNodeReward(account, creationTimeArray[i])
  
          let newNode = {
            name: namesArray[i],
            creationTime: creationTimeArray[i],
            rewards: formatToken(tx6).toString()
          }
          nodes.push(newNode)
      }

      console.log(nodes)
      setNodes(nodes)
      }catch(e){
        console.log("No nodes")
      }      
    }

    function formatToken(decimals){
      const balance = ethers.BigNumber.from(decimals);
      const remainder = balance.mod(1e14);
      return ethers.utils.formatEther(balance.sub(remainder));
    }
    
    useEffect( () => {
      updateInfoChangeAccount()
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
              <img src={logo} alt="StarLogo" class="logo" width="250" length="250"/>
            </div>

            <div><a href="https://traderjoexyz.com/trade?outputCurrency=">Buy <span className="tokenSpan1">Nebu</span></a></div>
            <div><a href="https://dexscreener.com/avalanche/">Chart</a></div>

            <div id='socials'>
                <div>
                    <a href="https://discord.gg/m5g3zvTfPs" target='_blank' rel="noreferrer noopener "><i className="fab fa-discord"></i></a>
                </div>
                <div><a href="https://twitter.com/NebulaNodes" target='_blank' rel="noreferrer noopener"><i className="fab fa-twitter"></i></a></div>
                
                <div><a href="https://docs.nebulanodes.finance/" target='_blank' rel="noreferrer noopener"><i className="fas fa-book"></i></a></div>
            </div>
        </header>
        <div id='body'>

            <div className="zone" id="nodes">
                <div className="titleZone">NebulaNodes informations</div>
                <div className="rowForColumns">
                    <div id='myNodes'>
                        <div>My NebulaNodes</div>
                        {getMyNodes()}
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
                    <div><Button onClick={handleMainButtonClick} text={status === 'connected' ? 'Get Rewards' : 'Connect to Metamask'} width='200px'/></div>
                    {getUnderMainButtonText()}
                </div>                
            </div>

            <div className="zone" id='create'>
                <div className="toCenter">
                    <div><TextInput placeholder='NebulaNode Name' onChange={(e) => setNodeName(e.target.value) } /></div>                    
                    <div>
                        <Button text={status === 'connected' ? 'Create a NebulaNode' : 'Connect to Metamask'} onClick={handleCreateNodeButtonClick} width='200px'/>
                    </div>                    
                    <div >1 NebulaNode = 10 <span className="tokenSpan">Nebu</span></div>
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
                    <div><b>Rewards</b></div>
                </div>
                {nodes.map( (node) => (
                <div key={node.name} className="rowForColumns">
                    <div>{creationTimeToDate(node.creationTime)}</div>
                    <div className="nameRow">{node.name}</div>
                    <div>{node.rewards} <span className="tokenSpan">Nebu </span></div>
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
