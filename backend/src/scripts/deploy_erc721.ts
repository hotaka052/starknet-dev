import {
  Provider,
  Account,
  shortString,
  CompiledContract,
  CompiledSierraCasm,
  constants,
  Contract,
} from 'starknet';
import compiledErc721Sierra from '@/contract/erc721/target/dev/erc721_ERC721.sierra.json';
import compiledErc721Casm from '@/contract/erc721/target/dev/erc721_ERC721.casm.json';

(async () => {
  const provider = new Provider({ sequencer: { baseUrl: 'http://starknet.local:5050' } });

  const accountAddress = '0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a';
  const privateKey = '0xe3e70682c2094cac629f6fbed82c07cd';

  const account = new Account(provider, accountAddress, privateKey);

  const declareResponse = await account.declare({
    contract: compiledErc721Sierra as unknown as CompiledContract,
    casm: compiledErc721Casm as unknown as CompiledSierraCasm,
  });

  console.log(declareResponse.class_hash);

  const deployResponse = await account.deployContract({
    classHash: declareResponse.class_hash,
    constructorCalldata: {
      name: shortString.encodeShortString('musubi'),
      symbol: shortString.encodeShortString('MTC'),
    },
  });

  console.log(deployResponse);

  const deployContract = new Contract(compiledErc721Sierra.abi, deployResponse.address, account);
  const mintResponse = await deployContract.mint(accountAddress);

  console.log(mintResponse);
})();
