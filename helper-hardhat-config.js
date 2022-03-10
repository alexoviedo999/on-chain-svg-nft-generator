const networkConfig = {
    31337: {
        name: 'localhost',
        keyHash: '0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc',
        fee: '250000000000000000'
    },
    4: {
        name: 'rinkeby',
        linkToken: '0x01BE23585060835E02B77ef475b0Cc51aA1e0709',
        vrfCoordinator: '0x6168499c0cFfCaCD319c818142124B7A15E857ab',
        keyHash: '0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc',
        fee: '250000000000000000'
    }
}

module.exports = {
    networkConfig
}