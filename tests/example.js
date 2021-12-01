const assert = require("assert");
const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

describe("example", () => {
  // Use a local provider.
  const provider = anchor.Provider.local();

  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

    // The Account to create.
    const counter = anchor.web3.Keypair.generate();
    const program = anchor.workspace.Example;

  it("Creates a counter", async () => {
    // #region code-simplified
    // The program to execute.
    
    await program.rpc.create(provider.wallet.publicKey, {
      accounts: {
        counter: counter.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [counter],
    });
    // #endregion code-simplified

    // Fetch the newly created account from the cluster.
    let counterAccount = await program.account.counter.fetch(counter.publicKey);

    // Check it's state was initialized.
    assert.ok(counterAccount.authority.equals(provider.wallet.publicKey));
    assert.ok(counterAccount.count.toNumber() === 0)

    // Store the account for the next test.
  });

  it("Update a counter", async () => {

    await program.rpc.increment({
      accounts: {
        counter: counter.publicKey,
        authority: provider.wallet.publicKey,
      },
    });

    // Fetch the newly updated account.
    const counterAccount = await program.account.counter.fetch(counter.publicKey);

    assert.ok(counterAccount.authority.equals(provider.wallet.publicKey))
    assert.ok(counterAccount.count.toNumber() == 1)
  });
});