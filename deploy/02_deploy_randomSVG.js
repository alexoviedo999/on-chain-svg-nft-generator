let { networkConfig } = require('../helper-hardhat-config');

module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId
}) => {
    const { deploy, get, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = await getChainId();

    let linkTokenAddress, vrfCoordinatorAddress;
    
    if(chainId == 31337) {
        let linkToken = await get('LinkToken');
        linkTokenAddress = linkToken.address;
        let vrfCoordinatorMock = await get('VRFCoordinatorMock');
        vrfCoordinatorAddress = vrfCoordinatorMock.address;
    } else {
        linkTokenAddress = networkConfig[chainId]['linkToken'];
        vrfCoordinatorAddress = networkConfig[chainId]['vrfCoordinator'];
    }
    const keyHash = networkConfig[chainId]['keyHash'];
    const fee = networkConfig[chainId]['fee'];
    let args = [vrfCoordinatorAddress, linkTokenAddress, keyHash, fee];
    log("---------------------------");
    const RandomSVG = await deploy('RandomSVG', {
        from: deployer,
        args: args,
        log: true
    });
}
module.exports.tags = ['all', 'rsvg'];
