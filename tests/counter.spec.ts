import { Provider, setProvider, web3, workspace } from '@project-serum/anchor';
import { assert } from 'chai';

describe('Counter', () => {
  setProvider(Provider.env());
  const application = workspace.Counter;
  const counter = web3.Keypair.generate();

  it('should init', async () => {
    await application.rpc.initCounter({
      accounts: {
        authority: application.provider.wallet.publicKey,
        counter: counter.publicKey,
        systemProgram: web3.SystemProgram.programId,
      },
      signers: [counter],
    });

    const account = await application.account.counter.fetch(counter.publicKey);
    assert.equal(account.data.toNumber(), 0);
  });

  it('should increment', async () => {
    await application.rpc.incrementCounter({
      accounts: {
        authority: application.provider.wallet.publicKey,
        counter: counter.publicKey,
      },
    });

    const account = await application.account.counter.fetch(counter.publicKey);
    assert.equal(account.data.toNumber(), 1);
  });
});
