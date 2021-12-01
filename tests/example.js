const assert = require("assert");
const anchor = require("@project-serum/anchor");

describe("error", () => {
  const provider = anchor.Provider.local();
  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  const program = anchor.workspace.Error;

  it("Is initialized!", async () => {
    try {
      // Add your test here.
      const tx = await program.rpc.hello({});
      console.log("Your transaction signature", tx);
      assert.ok(false);
    } catch (err) {
      const errMsg =
        "This is an error message clients will automatically display";
      assert.equal(err.toString(), errMsg);
      console.log(err.toString());
    }
  });
});