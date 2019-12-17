# EOS Client

Main library for data fetching in EOSDT applications

## Usage

```TypeScript
  import Client from "@eosdt/client";
  import Provider from "@eosdt/transact-scatter";
  
  const networks = [{
    blockchain: "eos",
    protocol: "https",
    host: "nodeos.production.eosdt.com",
    port: 8443,
    chainId:
    "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
  }];

  const client = new Client({ name: "eosdt", networks });

  (async () => {
      // You can fetch data from EOS blockchain prior to provider initialization
      const table = await client.rpc.get_table_rows({
        code: "eosdtorclize",
        scope: "eosdtorclize",
        table: "orarates",
        json: true,
        limit: 1000
      });
      
      console.log({ table }); // Token rates
      
      // To do transactions you must initialize transaction provider
      await client.init(Provider);

      if (!client.account) {
        await client.login(); // If you are not yet logged in then do it
      }

      // Now you can sign and broadcast transactions to EOS blockchain
      await client.rpc.transact({ actions: [{
        account: "eosdtsttoken",
        name: "transfer",
        authorization: [{ actor: "someeosacnt1", permission: "active" }],
        data: {
          to: "someeosacnt2",
          from: "someeosacnt1",
          quantity: "1.000000000 EOSDT", // always use full decimals for token  
          memo: "Transfer message"
        }
      }]}, { blocksBehind: 3, expireSeconds: 30 });

  })().catch((e) => console.error(e.stack));
```
