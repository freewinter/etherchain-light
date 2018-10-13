var web3 = require('web3');
var net = require('net');

var config = function () {
  
  this.logFormat = ":remote-addr [:date[clf]] :status :url :referrer :user-agent";
  //this.ipcPath = process.env.HOME + "/.Ethersocial/gesc.ipc";
  //this.provider = new web3.providers.IpcProvider(this.ipcPath, net);
  this.provider = new web3.providers.HttpProvider("http://115.68.99.203:8545");
  
  this.bootstrapUrl = "https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/yeti/bootstrap.min.css";
  
  this.names = {
    "0xc02ab66f5648b6d9d511f466b772647c619f2552": "[Pool] esn.koinpool.io",
    "0x02aa3e57361752742cfd683275ade72bc9ebae97": "[Pool] esn.dragonpool.top",
    "0x0b292a321fe5e20cc943648a782184f8ab44d2eb": "[Pool] moricpool.com",
    "0x2eb64b8ab13f0d7823158217d15ba310ed3d0e58": "[Pool] esn.topmining.co.kr",
    "0x2930822031420731f09dce572554a8b8c1eaa09b": "[Pool] esn.gonsmine.com",
    "0xa8c321024a3c015d881efca33bd1b2c1788b379e": "[Pool] esn.gonspool.com_3rd",
    "0x2dabf2142856acd7db362dd3d6845f49766b29e0": "[Pool] esn.gonspool.com_2nd",
    "0xc734480388db099cb43fd1c3ed530b39b9d8d567": "[Pool] esn.gonspool.com",
    "0xae17de3ae6127022e53ebcf9e08457174cdee0e9": "[Pool] esnmine.com",
    "0x7bea6240f245e649563253fa4c1da39b12625da7": "[Pool] esn.e-pools.com",
    "0xfc35930abb108ae6cae33fd065dfb799808ea326": "[Pool] comining.io",
    "0x18fcccbe8d92b481a0e9cc4b55666da9bc3b08e7": "[Pool] esn.dreampool.info",
    "0x498c6f9063705054fae07260d4176c3d55a97650": "[Pool] esc.dreampool.info",
    "0xbe9052073198f4087cf8b2ab98ff46fdd3eee9a5": "[Pool] esnpool.ssadaegi.com",
    "0xf35074bbd0a9aee46f4ea137971feec024ab704e": "[Pool] esn.solopool.org",
    "0x1021286d2bffcdf1892bd9144d7a0349e336e087": "[Pool] esn.coabit.com",
    "0xe3ec5ebd3e822c972d802a0ee4e0ec080b8237ba": "[Pool] pool.sejun.info / Block Explorer served by ::pool.sejun.info::",
    "0xa0c6c220a53b7dc790f7a5b462a106245c761f70": "Owned by DDENGLE, but it is going to be coin-burn.",
    "0x11d96a76166ec579e2b6cfa903f66da4af669351": "Owned by DDENGLE, but it is going to be coin-burn.",
    "0x28167a591d66ae52ab22a990954a46e1555c8098": "Owned by DDENGLE, but it is going to be coin-burn.",
    "0x02f718c94b2c8e8d62752f8632443504c1e4b6e2": "Owned by DDENGLE, but it is going to be coin-burn.",
    "0x2d2c9525e2811f4d1016c042f476faf23274aa31": "Owned by DDENGLE",
    "0x43160b2bc00f7f8f7fc806e2f6e2ffdc62b3a651": "Owned by DDENGLE",
    "0xfb3d76c8165bcb3c93fd3b2b10c20588d0fa97aa": "Owned by DDENGLE",
    "0x43ddd2d33dcb7e578f4e59ad6b9c61a24c793aa8": "Owned by DDENGLE",
    "0x40e5ce1e18c78d6c792f46ed6246bfb31bcdb6af": "Owned by DDENGLE",
    "0xc061c5b0d0ce7af95ded1805abb23f743e13c455": "Owned by DDENGLE",
    "0x65ed78d0c4ef1150e8765b24b210f056e079cd59": "Owned by DDENGLE",
    "0x98a9b2f7d1ba7838e3242b5e4cbf1f2897aa4bc5": "Owned by DDENGLE",
    "0x297cfb72cd1b8b2808fd1b25cdcf7d8de279ad96": "Owned by DDENGLE",
    "0xbfb00182321502e0729d9a0862ec1df1b3e2208e": "Owned by DDENGLE",
    "0x92808a38ffc5a339b1ab6b0b472f9975718d4a07": "Owned by DDENGLE",
    "0xfc9183ed137be071ad183d025395a0ebe2674654": "Owned by DDENGLE",
    "0xcd9d9d07fcf476a8ee7240324a602449606d75f4": "Owned by DDENGLE",
    "0x8ec980d3066cb6afa793577cf88ccb46ce8d13f2": "Owned by DDENGLE",
    "0x732e97b992e4f8a53034cf29cf11aacba7452261": "Owned by DDENGLE",
    "0x5fdea351c5eccedf2394fb54437b149ae423ecf3": "Owned by DDENGLE",
    "0xa7344654f2a1a44b3774e236f130dff8a4721e82": "Owned by DDENGLE",
    "0x7a629c4783079cd55633661d2b02e6706b45cf8e": "Owned by DDENGLE",
    "0xe61869d1cf72f25e195898217f5bf5bcec9c9038": "Owned by DDENGLE",
    "0xa56a7865b526e315a9eb41f4847485c7e0c952fd": "Owned by DDENGLE",
    "0x9c003e74b62f192a864045d678639580c672fc22": "Owned by DDENGLE",
    "0xb8a949bfd9751c29c4cd547cca2e584d8dac4e12": "Owned by DDENGLE",
    "0x8dc718b49fb68584d9472490743f9be1b0ad683b": "Owned by DDENGLE",
    "0x4f5ac8dfe79c366010eb340c6135fbee56f781d8": "Owned by DDENGLE",
    "0xa8a7cb416b938ceab471d6c6a55273218b0c7e05": "Owned by DDENGLE",
    "0x484a0addd8cdc6b9940ca273b55d764dc0486be5": "Owned by DDENGLE",
    "0xb1cc20b7048fd9185d140a0bc6e444a1f3938daa": "Owned by DDENGLE",
    "0xc1b4134f4757d19a687d05bd7087872b5625405f": "Owned by DDENGLE",
    "0x27593d2271aced83e81034e8dd603d098238320c": "Owned by DDENGLE",
    "0x920dc90d11e087a0d8912c1d43db102e9ba4f43e": "Owned by DDENGLE",
    "0x74926cbdacd0e871cad0d926c8e17cb2c00475b9": "Owned by DDENGLE",
    "0xd656d14acfb2f0fbde2ed2a137a52d852bb6288b": "Owned by DDENGLE",
    "0x24f5f8e7d6a23b55c95fcdc1300de05f9d2abd83": "Owned by DDENGLE",
    "0x097f152b3f837d38ab1e8c0683d62f5a01d67902": "Owned by DDENGLE",
    "0xdc10be66aa11acbd42a2b1953714f09b5281681b": "Owned by DDENGLE",
    "0xaccd52b63822d8cb5117d9deb56596e072462614": "Owned by DDENGLE",
    "0xa36b9b8b2adb20fb4a84d3025bf2e35baa8b7fef": "Owned by DDENGLE",
    "0xd59679fc40a71897065bf1b3a73f331226cdae72": "Owned by DDENGLE",
    "0x09a6772629ef0bf402ae6d27cd32e6eefb220a12": "Owned by DDENGLE",
    "0x2ee5abcc0d0d51d4b18947b5aaaa95d037be4e2c": "Owned by DDENGLE",
    "0xd7b34387880daede6cbdad11bb3db67daf942975": "Owned by DDENGLE",
    "0x1bfd3c2ba6a537e97cedd542cd554a5050963d54": "Owned by DDENGLE",
    "0x64b7f2c22c20a59c07cb0dd7f8f692153c68f3f8": "Owned by DDENGLE",
    "0xc3511391c4515cf8f27e9bc0f777a02a4125c8b1": "Owned by DDENGLE",
    "0x20ed8ca39dd148edf22e03b8021af32cecadd42a": "Owned by DDENGLE",
    "0xbbc509b7999b0e94534477b98ec8927cba879677": "Owned by DDENGLE",
    "0x35b20459a7daa5f44ae423fd4a1b451ea5090b09": "Owned by DDENGLE",
    "0xdb4f05a66c0ccf0532ea1ecb931e05a400a6f4a7": "Owned by DDENGLE",
    "0xf6f43a6d9517471436d2ce5047a2b707580e7149": "Owned by DDENGLE",
    "0x7f89c2b9daba034841f19ae843cfb6cd6f75b1d7": "Owned by DDENGLE",
    "0x355a555a36e319e76042e62875a15e1db3012b86": "Owned by DDENGLE",
    "0x9de2687242cbf9fb94fee0ad873acc7494ebd2bf": "Owned by DDENGLE",
    "0xc2c028dd17f8a89b9131b7daaeae9cb1dddf86e7": "Owned by DDENGLE",
    "0xf50eac35eef0a1bfa23ba31020ef60e89bf8e9df": "Owned by DDENGLE",
    "0x22cc48cf48e8ee207bc08411240f913a4e594529": "Owned by DDENGLE",
    "0xcddf5b34342200c37ba96eb0dd662ca4c29f89f8": "Owned by DDENGLE",
    "0x2b5c97b6402ac189e14bbca3e7759319ca8a9222": "Owned by DDENGLE",
    "0x4610286f8a2649dcfbc6d91735745f418a6abc75": "Owned by DDENGLE",
    "0xe5a364113076273352e0c31bf505028e0b7edbaa": "Owned by DDENGLE",
    "0x149a483758a98ffe28f7f25cfa17d7433f852ebe": "Owned by DDENGLE",
    "0x10aa08064689ee97d5f030a537f3cd4d8bbdaf74": "Owned by DDENGLE",
    "0x04ec8d0b5157370f5a2671a2aa68ae486b7a7842": "Owned by DDENGLE",
    "0x4a6c428f245e8d9115b34764bab17eb86ac472be": "Owned by DDENGLE",
    "0x1f3d4a903bd32a537efae19592f5516698c95a20": "Owned by DDENGLE",
    "0x7de81daaa7ed5cbf4d379cdd26ae353cbd5a2489": "Owned by DDENGLE",
    "0x60850fa9e09d414af3690e4b5daefb1b906b0d20": "Owned by DDENGLE",
    "0xd1cccaa22259c547993df3c147d5b545f003adb8": "Owned by DDENGLE",
    "0x8dfd7edb7d28e8b3df1faab70a8ef9e3b923d998": "Owned by DDENGLE",
    "0x7445c657c24d014f3a9dddc3e446868bc2dbd13e": "Owned by DDENGLE",
    "0x9f70204d1194f539c042a8b0f9a88b0a03bbcd8b": "Owned by DDENGLE",
    "0xb156bafe05973bc839c4f115be847bbde8a67cb1": "Owned by DDENGLE",
    "0x544ffeab53bdc59ef8edaff0042b03c2ea123615": "Owned by DDENGLE",
    "0x0e29bef5f4f66c38a0f05cca1e4938d57ff09c70": "Owned by DDENGLE",
    "0x3ef6a396d6611df6c79ec1e6ad6bbd253917fbe9": "Owned by DDENGLE",
    "0x4f47a62aba6ea049fc0e92d8afbe1682472d98bf": "Owned by DDENGLE",
    "0x3d84fd9785a6bd3148847038c6f1e135042a892e": "Owned by DDENGLE",
    "0xe7bfcf3125e37755e57804dfe4479657b212a8ca": "Owned by DDENGLE",
    "0xf8afb4f5684c56ff7ce71b4e4cf7e42062470e08": "Owned by DDENGLE",
    "0xedb720c9bde4801e204e90282de2a6cf1c44c4ad": "Owned by DDENGLE",
    "0x4440ccbc77249a4d891d9ab5a5f2026b17aff7c7": "Owned by DDENGLE",
    "0xa3330c73e2d79355a14e570da1ec2e80f8048c69": "Owned by DDENGLE",
    "0xba895406774ced5fd2e759b58f9ffaed5e04fb14": "Owned by DDENGLE",
    "0x31e73a3b5451ebe1163571e9e0567c425bbbfb83": "Owned by DDENGLE",
    "0x1d635125c494b1137ca5f15ac95dd6d93c3a9546": "Owned by DDENGLE",
    "0x0edafc1058879a9568e711445b18ec4da31d2480": "Owned by DDENGLE",
    "0x0ea63fef218ebf570a4ee62ef6ed712dbe623c44": "Owned by DDENGLE",
    "0xe1e1c163f391ffad2d0be68641253b0860485a95": "Owned by DDENGLE",
    "0x3c27bd92c4be1a19974ec773bd20b13afe582c9f": "Owned by DDENGLE",
    "0xe36eff7c061dec48446d47675f176b4da3c2e950": "Owned by DDENGLE",
    "0xbd92dc94b6e81a3da5dc3ae6bd80782622658196": "Owned by DDENGLE",
    "0x1b8d57e995749618c7bb3e60194ac6fc57e9b3eb": "Owned by DDENGLE",
    "0x31379702391cb5a737db3f3ffc336bd03aaa181f": "Owned by DDENGLE",
    "0x17cefb6611033759b8755197b983de2d7e98315e": "Owned by DDENGLE",
    "0xc5b129c764daac8bfbf023646b9306d817a8ebdd": "Owned by DDENGLE",
    "0xc82238664bedfa8ded51e91969a39f13a8262a37": "Owned by DDENGLE",
    "0xf9c68991ff7ac307e41ea1c673f8ebb1a6afbd99": "Owned by DDENGLE",
    "0x100bde3d73fda700369e78229127b58d2ade9177": "Owned by DDENGLE",
    "0x5923a65a796934e69081715657e8dfec8874e40d": "Owned by DDENGLE",
    "0xe7b0f75f9c69ae464b1b63cf295555d0815fc532": "Owned by DDENGLE",
    "0xb3d1a2c0ab2d8987446d74f49e357adf5bf15986": "Owned by DDENGLE",
    "0x16987ad8e10dda7f9e5d95c0f0ee36f46b10e168": "Owned by DDENGLE",
    "0x81d4c3bf72837b21203b2a4f90bf42fda10acf48": "Owned by DDENGLE",
    "0xfdbdaec57829f25ad48e18d94e0b8533f2801818": "ESN Alpha or Beta Testers",
    "0xf14338307bc5e6ab71fa202447ce240947568b3c": "ESN Alpha or Beta Testers",
    "0xf1960640b52af75fc71101aec2611499c17cd9c6": "ESN Alpha or Beta Testers",
    "0xf419759927eea6afe77701c4cf4a98791a709ad1": "ESN Alpha or Beta Testers",
    "0xf641b4a721dcefa497274fd06888eb998b9bc038": "ESN Alpha or Beta Testers",
    "0xca7c9a1b6fdcf34b4c9b5d9e5c6b19b639e6a5a6": "ESN Alpha or Beta Testers",
    "0xda9551b635c3619f81641571e267755b89f7fe1e": "ESN Alpha or Beta Testers",
    "0xe9b35c7ca775661bbd3a4844e2c6bc5effcdea58": "ESN Alpha or Beta Testers",
    "0xa6dae08f99e4fb57b066a645a259d8e4f7ac2bc8": "ESN Alpha or Beta Testers",
    "0xa748cced92a87066db8b29f931fb92e827488a9e": "ESN Alpha or Beta Testers",
    "0xda72ec2cd7b8e3924f8baaea75d5ed23ef39394c": "ESN Alpha or Beta Testers",
    "0xd6e99ccb72d24e8a60f24d47afd4074b1d1fd336": "ESN Alpha or Beta Testers",
    "0xe62812ad5834747f17c92435d863639e84d132fc": "ESN Alpha or Beta Testers",
    "0xfbce66a6898ecd70893db6b4b8c3d00afef8e20b": "ESN Alpha or Beta Testers",
    "0x9a3b06257088ef8c17410a8f2d63392edb9b55ce": "ESN Alpha or Beta Testers",
    "0xb81ca2bc63cb4008cebdda3ce8f4eaba322efca6": "ESN Alpha or Beta Testers",
    "0xc66b1d84c42018b16dbc4777409bf50a49febba9": "ESN Alpha or Beta Testers",
    "0xca0d08f6019884f94f2b5b191ac9bb247150cd13": "ESN Alpha or Beta Testers",
    "0xcf7539096fd0cd97cd316efcfe9d3c87a101a74c": "ESN Alpha or Beta Testers",
    "0x8dda0e7ddde515480ef08cf90a1eb4e78f50a2c4": "ESN Alpha or Beta Testers",
    "0x8f813b88e6e125eab71a63455f326322ef505501": "ESN Alpha or Beta Testers",
    "0x940fcd215bab373d1b736e354f2def501244885a": "ESN Alpha or Beta Testers",
    "0x9593ce72919cb0648ddacc58af233d942963e2e6": "ESN Alpha or Beta Testers",
    "0x83b88314b606df40d5e716df488980bc64125b46": "ESN Alpha or Beta Testers",
    "0x6c1fddb4254ff46b3750de322ebb7d6238c0a606": "ESN Alpha or Beta Testers",
    "0x7c5a56c45f23c353ff9f6f71ec86c9a6a1a0ca67": "ESN Alpha or Beta Testers",
    "0x7dcfaa795586c92f1ce7d5c7b10608fe6a773fe4": "ESN Alpha or Beta Testers",
    "0x82831d451b8f92fbf6a763adb708010a3e66bb60": "ESN Alpha or Beta Testers",
    "0x684ae403d9a08e4f4f971cfedf81094074daa77f": "ESN Alpha or Beta Testers",
    "0x520b22776b1befd3064636da0dd251afe569ef13": "ESN Alpha or Beta Testers",
    "0x4ca59432835d6c0618064ab0b7114c92a90ae0be": "ESN Alpha or Beta Testers",
    "0x43b370c4457cf39a3be86cc00c2b27614ca6e638": "ESN Alpha or Beta Testers",
    "0x44052eb938c02776b5240f38ec99f5ef51ef0d87": "ESN Alpha or Beta Testers",
    "0x407253b005ae97857f812fc60d441e5367b4bac8": "ESN Alpha or Beta Testers",
    "0x3a69e1c351978ced418cea6cee019f220bcb065f": "ESN Alpha or Beta Testers",
    "0x359d92e3e8757a4a97187a96d408c0c11f5c7eb9": "ESN Alpha or Beta Testers",
    "0x343c6b82b13f0dc82d4269e2c806d2d58e6dde35": "ESN Alpha or Beta Testers",
    "0x336ba81ea6ec4f0da38c1a1761ed3d97fd3ca28c": "ESN Alpha or Beta Testers",
    "0x2d3e60496d0092a4efc665389a916be1a9f8b378": "ESN Alpha or Beta Testers",
    "0x28b04ec8eb18b0c6a384f9d92cfb44d1d43ecb51": "ESN Alpha or Beta Testers",
    "0x2387973589fb07a8c1ec92492c0b8ba9ab5e52a2": "ESN Alpha or Beta Testers",
    "0x22b655a19810307750ed1b6b093da10a863d4fe2": "ESN Alpha or Beta Testers",
    "0x181417a4883c429ef26a4baeb48e70d4f00278b4": "ESN Alpha or Beta Testers",
    "0x0601011f80279190b96f641205c6a524a8ad5a28": "ESN Alpha or Beta Testers",
    "0x07428c95ef3862026e54d3a963911cdc673dbcd9": "ESN Alpha or Beta Testers",
    "0x09600bbb9d9b23661d269dbe1ed066d8e573b5e1": "ESN Alpha or Beta Testers",
    "0xfedced7aa1cf3f3a7eec321cc0274759b154ea8e": "ESN Alpha or Beta Testers",
    "0x0015ac7f8bb2a2c7d954fc2dbd4e20c0db5942a5": "ESN genesis allocation",
    "0x006a79cc154917cf204d8097728f290e29716d43": "ESN genesis allocation",
    "0x008e8fbffc2fdbefaa7e3be4f4a9160db826d05f": "ESN genesis allocation",
    "0x0126d86b9814b0e78c4e01a3916bee6a7778145b": "ESN genesis allocation",
    "0x0182f7286ae9d4d6bc514d5175d14685d520bde7": "ESN genesis allocation",
    "0x052fda414fe1279c6276a237b07e1b4148a8cc77": "ESN genesis allocation",
    "0x054ed2f55028257212b996f9a3d34758d1d4ffd1": "ESN genesis allocation",
    "0x05ef2894a2a1c6eb6c0a768d04ef5b573f357712": "ESN genesis allocation",
    "0x0a42b3145257154e76a97db8147c93be4cffd97b": "ESN genesis allocation",
    "0x0c85fbd7492d1ae87bf3d286c4750a34f1fd3121": "ESN genesis allocation",
    "0x0ce646412a1524c3f73edfd753c0ba3ee7338275": "ESN genesis allocation",
    "0x0efce4565062b23b43dbc1e261463e363e4a5b4c": "ESN genesis allocation",
    "0x0fb0ce787306ce13dcd614ab3d0e15d9772106ac": "ESN genesis allocation",
    "0x0fb1d306d240360056f60f197dc7f68f732ac515": "ESN genesis allocation",
    "0x0c9fd6123e313f7d1f0cb25d99839102da08b2c5": "ESN genesis allocation",
    "0x0e443353b42e042ff5168e9b3c6de37070368223": "ESN genesis allocation",
    "0x0fe3571f498a6d945e123ac8ff6e3fed348d9432": "ESN genesis allocation",
    "0x102028c7626970a28677bbdc7733484c8b14c2d2": "ESN genesis allocation",
    "0x10417d0ff25c115b25915dd10ca57b16be497bf6": "ESN genesis allocation",
    "0x109736465b4bbe31ea65ad01fc98f04498271e6c": "ESN genesis allocation",
    "0x1156a129183e5bdfdf2bf7a70963285a979363a0": "ESN genesis allocation",
    "0x119f822a796fee9c41a488949fcb14b589ffa628": "ESN genesis allocation",
    "0x131a5da679863c05dc627d53634f2925ba0ce731": "ESN genesis allocation",
    "0x139fa969e8b74bee1f6113a362f15060ea998b15": "ESN genesis allocation",
    "0x13ec3aa8f4a427ecdecc7901060ccac9bea7a61e": "ESN genesis allocation",
    "0x16858eb1a6f0e7ff01b91aa9c92d0a433a5f767c": "ESN genesis allocation",
    "0x16fdf76180796c6e4335eaa2842775b2e4a22e0b": "ESN genesis allocation",
    "0x19a5a213e6abfee29f17e871222cbe9ac45322c8": "ESN genesis allocation",
    "0x1a27309b0c09be2234fd64afdbcfb099f8e2e7cd": "ESN genesis allocation",
    "0x1c95ab5229fd08c638a1728c022f09291b8dc55d": "ESN genesis allocation",
    "0x1e76296584058670ea80fe9a39d8f457c03747c5": "ESN genesis allocation",
    "0x1ee077bdef6d45d491602342cee008cd1e2912e3": "ESN genesis allocation",
    "0x1a8d282e82c606e992f69ce618ba634d98bf2683": "ESN genesis allocation",
    "0x1c6a94810bd0afcf79ceea11afe86c34f6813211": "ESN genesis allocation",
    "0x1f6431696efc6f1ab98dcc2ef0e8553da697e6f1": "ESN genesis allocation",
    "0x20b61f2eb5e18b1e8568d18235918f9e2f596c32": "ESN genesis allocation",
    "0x21681cda53aa1a4cfb3e3ea645c8eeaecfc3ba4f": "ESN genesis allocation",
    "0x21f54f92a7d9a91915e1751ceb02cb8e3ed3d622": "ESN genesis allocation",
    "0x2369d9dbbfd0f8aa8a3d84d8f2aea840a0cdf760": "ESN genesis allocation",
    "0x23ee14215c531f6ff1baef2c74b1754306f4532d": "ESN genesis allocation",
    "0x2433612fb939236a87a97261ff7b3bc7b754afb1": "ESN genesis allocation",
    "0x246c510dfaf5b49bc0fe01c8256d3879c1b5f89a": "ESN genesis allocation",
    "0x25fa2162d5c86cda10e4be42c14a24329e455ad8": "ESN genesis allocation",
    "0x25bda1418853a22eb6a5380e8a2862d2a74949bc": "ESN genesis allocation",
    "0x266f4c232ebc946c46979cd90d70868380e186d8": "ESN genesis allocation",
    "0x26b4da905780fb0c5c3e7e5315989fed3aeef135": "ESN genesis allocation",
    "0x270a32b41dde877463d2106ea4f4529557a5e1d3": "ESN genesis allocation",
    "0x2738b3746d6bda9bd72858eaa76f8b5ce7a88c8c": "ESN genesis allocation",
    "0x27aa0d45d3506f8446816e0e2e9675d46285f6e0": "ESN genesis allocation",
    "0x27eb0529279f7a71e50efb70bb1767cbe1ffa4ce": "ESN genesis allocation",
    "0x2897ff80794153edb721801fb91c6d8373c965f4": "ESN genesis allocation",
    "0x2a10204a0c7c9f7701e33c1b71c9427ea16e2e45": "ESN genesis allocation",
    "0x2db1faf35901e272aee74a2469a278fdaa6e6e18": "ESN genesis allocation",
    "0x2dbae8e1ad37384ca5ff0b4470d3dbc73559841c": "ESN genesis allocation",
    "0x2e5c43868f45de268967fb22f3f4107da401510d": "ESN genesis allocation",
    "0x2f220872a4c37974f0a7898356cdbc68204781c9": "ESN genesis allocation",
    "0x2ae076c36b18a60f1e3c05d434276a1e16f3f838": "ESN genesis allocation",
    "0x2b2bb67fe9e44165d2108676579a9437c760da30": "ESN genesis allocation",
    "0x2c7275511fe06ee86663b3a618497168b35b0cdf": "ESN genesis allocation",
    "0x2da9d2a6f0b92651a36b05c5e9d2a717c6e166de": "ESN genesis allocation",
    "0x2e6000778fb225ddb3e1a2f297d56774e85d9c9d": "ESN genesis allocation",
    "0x2ed8788f1c31b508e37079098a7337bff77b49cc": "ESN genesis allocation",
    "0x30095e6a4ccd1ac2014c3d1d98dce003d775708e": "ESN genesis allocation",
    "0x30912555bb14023e9b7c90aa2314721918cdf1f9": "ESN genesis allocation",
    "0x30bcc93965fa36bbaabcd781326e42227c4e1a51": "ESN genesis allocation",
    "0x34153174cd4d3f1eaed7438638d302f6414d5965": "ESN genesis allocation",
    "0x34e1d8c8a32ce0f6378abb9bd05ea1f9bfdc5782": "ESN genesis allocation",
    "0x34c026a39e44955d1051e8669f9cc58a027455c1": "ESN genesis allocation",
    "0x351fc1f25e88b4ccf090266ebb408593418d8fde": "ESN genesis allocation",
    "0x3588c47ba9204b672c456ee9b5c1ae70f3c738ac": "ESN genesis allocation",
    "0x35d554233ca690130aaa43501e121a208c657226": "ESN genesis allocation",
    "0x36df854d0123e271529a8767d1cded4e7b5f31d6": "ESN genesis allocation",
    "0x36f59989a902cd10725ff7fe2cab1689aa4e9326": "ESN genesis allocation",
    "0x3776f82701c384ce6cbf6a8fea40772cb882b66d": "ESN genesis allocation",
    "0x37f82962c3097f0cd9ff605db66e792025a540cb": "ESN genesis allocation",
    "0x38f764c861def6d5d65e5ec099536f4cfcc3af55": "ESN genesis allocation",
    "0x396403f26b388150b4876485b124a49845101464": "ESN genesis allocation",
    "0x3e3329bcc90e47e4dabb5c93572b18b5e0efa024": "ESN genesis allocation",
    "0x3d754df1151b9b62a6ed48b477225121c29af063": "ESN genesis allocation",
    "0x3dc7367c3218f88de8867c425f89102d2f2056f4": "ESN genesis allocation",
    "0x3ffce0475430de0bd9b09a412e404bc63aa28eea": "ESN genesis allocation",
    "0x4091e1fb1c7af51a64c201d6a0c8f0183dfb7ca5": "ESN genesis allocation",
    "0x40950bad9580d4b111955da7d3f9ada26dd9f05a": "ESN genesis allocation",
    "0x41a893429d5f8487c1866b87779155d4bfe33198": "ESN genesis allocation",
    "0x424fb0a3ec325bf42e7edbef7e450f2ffd1cf318": "ESN genesis allocation",
    "0x42f7956fd659e00d3be2f3d1d4f3ed187aef04d6": "ESN genesis allocation",
    "0x43153845e89eeeaa84a0104d38cb824e23cdafdc": "ESN genesis allocation",
    "0x434f1b9b193c88bf58685124aac0167fe69f9014": "ESN genesis allocation",
    "0x43535982688844fa703cb9bd5723790cab364049": "ESN genesis allocation",
    "0x4515edc7154bedd7143b69a04c4e738f8aa4ab18": "ESN genesis allocation",
    "0x45b450961882850f7038d5cdcd2a8fa2dc4b5469": "ESN genesis allocation",
    "0x45bdfdf3840d4341503cd7fc87e4b66f6179e5fe": "ESN genesis allocation",
    "0x46045cddd940d80596826ce5354489b3047663bb": "ESN genesis allocation",
    "0x46256e00ff927d54b0ca139ddccac2148784273b": "ESN genesis allocation",
    "0x4664a920f7fe9b0d78a665e1a4aeb95f287d6059": "ESN genesis allocation",
    "0x467cdc210ae48ba99740d37ee79fa57c4216bc81": "ESN genesis allocation",
    "0x46e615324f6e4fb242f9bfecffc0c802ba7733c9": "ESN genesis allocation",
    "0x476455d48fc858a06bd7854fcf1bd60bcfde9ed3": "ESN genesis allocation",
    "0x4a2daeacf0468d137e3bc464d6d5fa3893a9136b": "ESN genesis allocation",
    "0x4caf77eefe062a6f053a464171bc75254b47f52b": "ESN genesis allocation",
    "0x4e70bbcb50c4e875fd573dcb694908abf3b30b37": "ESN genesis allocation",
    "0x5387a1ce4cd2ef4f90075c15dc3c0744948ec356": "ESN genesis allocation",
    "0x53e1f85147e000ae1ff6a5910407395e388c683c": "ESN genesis allocation",
    "0x5428a31f736c0d2b3c4e80baefb75a76ed44d3f7": "ESN genesis allocation",
    "0x5444a1735913eeac177d947ef38de7cd6bdfc0a6": "ESN genesis allocation",
    "0x5472591efd048dd60a4d6afdb549e95a65578b0a": "ESN genesis allocation",
    "0x54984a41eeaa8e710e4e5b8a7f68c96057b7df3a": "ESN genesis allocation",
    "0x54b125d8b260386633b756056b7d7e78e7071715": "ESN genesis allocation",
    "0x560a11493b5a0ec28589e80276fe975ee26c6a3e": "ESN genesis allocation",
    "0x56730e1d11a84970355c43ac7659f2f4786dadcd": "ESN genesis allocation",
    "0x56db15729e52d615a744a04f8a59d63e3b9f735b": "ESN genesis allocation",
    "0x586f545062ec7dc0ffc213eacd59af80660df570": "ESN genesis allocation",
    "0x58e7010e6b8d97a556c0e7f0d90151224ebf674e": "ESN genesis allocation",
    "0x5a538adb2c7f6a80634b0ec20ec5152ff6bb4d5f": "ESN genesis allocation",
    "0x5ab68d762750d5185138187db7751c9f71db5836": "ESN genesis allocation",
    "0x5c7b14ce51abf629bb0953ee4e2d9d87fc86eb4d": "ESN genesis allocation",
    "0x5b638e4b6dfdb6928b07586e63d5879dce69a1f8": "ESN genesis allocation",
    "0x5ce91ef7ae254b2bd6d910cbf0d380814200811b": "ESN genesis allocation",
    "0x5d2ccc795b19df400f21f24c0dca4d0e9e898093": "ESN genesis allocation",
    "0x5d8dd54178b68bb36e1963d47d29c123864fd0ef": "ESN genesis allocation",
    "0x5e2d38a06f33c784303abf2012f9af12622d9e5a": "ESN genesis allocation",
    "0x5e479e616585e7fa84bd6f7465d394a1c0302be7": "ESN genesis allocation",
    "0x60037df7e4092466656a6b9571437fc4600c66e3": "ESN genesis allocation",
    "0x6027bafcd0ade24fda8c345dcbc812d59df74bf7": "ESN genesis allocation",
    "0x6074f20675f975ae2c081930cae8f299710f0bba": "ESN genesis allocation",
    "0x61c1169e8ba43ee6b919e5be2eac19542eb913b4": "ESN genesis allocation",
    "0x6255d6d3b49443891661b209056d530ecd63bcca": "ESN genesis allocation",
    "0x62865e637d723393ab9654d6439db7fb5abf8803": "ESN genesis allocation",
    "0x640ffd856e48528b05d5ef1e60348048ce291960": "ESN genesis allocation",
    "0x6427792a164bbeab45f6c3acf17c76f721b90e81": "ESN genesis allocation",
    "0x659d60d67a07774ecc5cfea9e56809bec024d639": "ESN genesis allocation",
    "0x65c9bc3b8b0ce7c4d16b35abe1a5c285a59f672e": "ESN genesis allocation",
    "0x65d5b458d9b1a9659c1125d20d970d5e6c29dc3e": "ESN genesis allocation",
    "0x68935ff3a3a3b6ef16ae7df58cee50b157658dd2": "ESN genesis allocation",
    "0x689f508256ea64f5dbd6bb77f1ce1bdaf36d7152": "ESN genesis allocation",
    "0x68a3e6e7c191a8c1add988bfbbb9b51d4f36f521": "ESN genesis allocation",
    "0x693d909842877d017e0f102e37a55024517dd0ae": "ESN genesis allocation",
    "0x6964c3c2c7bc719ec94a51bc4bf412e137d2b4e9": "ESN genesis allocation",
    "0x69f566c44802b0140f5e1c9234f46006773c03d4": "ESN genesis allocation",
    "0x6a6e3e82f98ce891f47721770301dbe2652a9e25": "ESN genesis allocation",
    "0x6bfd3aedeac7c6ec086c0a4ec29d2d0f5bd69bc5": "ESN genesis allocation",
    "0x70859a14f33b8ab873fa5781a4af1ce40dff65c0": "ESN genesis allocation",
    "0x740154120c4f41c50b0aaa0636a2000ff1e870ad": "ESN genesis allocation",
    "0x75f587a69a97eb4d1c4c4078418d5fa85dff6f94": "ESN genesis allocation",
    "0x762aed2e3aa2293e69dc2110b1fc6c806ae799a5": "ESN genesis allocation",
    "0x765cbc0a89fd727a2c1a6b055139faee53f11330": "ESN genesis allocation",
    "0x76af4103a231b1302d314c486a0ba524d0427899": "ESN genesis allocation",
    "0x7706c80af4eb372e168501eedfe7bda6dc942243": "ESN genesis allocation",
    "0x7731a4175eee5077e2ede48878e6e2a18fce0f9e": "ESN genesis allocation",
    "0x780a645d59027e7b0670d9565898dc00704cbe5f": "ESN genesis allocation",
    "0x79193e660b4431e8aca9c821b7daa88064e33750": "ESN genesis allocation",
    "0x79e98193ff8770f26af824734bbb1c2ce8197b6f": "ESN genesis allocation",
    "0x7a2a3fbe27e33df867ba8800788995d7662c046b": "ESN genesis allocation",
    "0x7d39324f5ff62e849b0f0f46ab8ee396fbd85581": "ESN genesis allocation",
    "0x7e34971b187047e7f7980650630b936eedc11023": "ESN genesis allocation",
    "0x7e69b383671f96b7abc2d1fed8b61477b87a58dd": "ESN genesis allocation",
    "0x7b27e070ca4158d13f8333b34842d4c28b678c92": "ESN genesis allocation",
    "0x7f792b094c0b96d6819823cf21bc0c402fc27bf9": "ESN genesis allocation",
    "0x819618c19a4a490b821f8156c5633749ea782ca2": "ESN genesis allocation",
    "0x822d6388145e96cdeb2900420a0e0436e940b670": "ESN genesis allocation",
    "0x82a1c733c3c937ba0a1a49481e4d1f6226157d2a": "ESN genesis allocation",
    "0x838da0414211392b644e73541e51e9f0fba26615": "ESN genesis allocation",
    "0x83ee8ebaed62092d2116de6b4e90778454e8dfc4": "ESN genesis allocation",
    "0x847409e5d6ed2c4e54ff97f2ed58217ac5fc3d68": "ESN genesis allocation",
    "0x8547989af8c99a3432038a03d3fb30a054d90413": "ESN genesis allocation",
    "0x85a2221cbbb47e8b74fc2617d6087a98f47e2738": "ESN genesis allocation",
    "0x8633d245c5f1b63403e3d7828dc197ce1cfafc0f": "ESN genesis allocation",
    "0x8707652ebd3928574d9e044ffe540679ba186ebd": "ESN genesis allocation",
    "0x87d479659a472af7c8ea78a3c658605f8c40bec6": "ESN genesis allocation",
    "0x88656958d9cd758d71546ba52c4ea646b658c84c": "ESN genesis allocation",
    "0x88da27b1f0a604a87fdedd9ea51087a331179cb4": "ESN genesis allocation",
    "0x8a07242231f4a654aeea65b857d1519385a18065": "ESN genesis allocation",
    "0x8c2deeeaf095be075a2646ed7b8764d3665acf14": "ESN genesis allocation",
    "0x8c8f3796a2942a2298d14ff1a9e3264e9f63f2bd": "ESN genesis allocation",
    "0x8f36ffd921e12083e374335d3cc43fcfeeadfa46": "ESN genesis allocation",
    "0x8b47e07f192c33bd7d298bae717dfcd68a8097ae": "ESN genesis allocation",
    "0x8be0b6ab14e15b46905335d07df03726fb1df0e8": "ESN genesis allocation",
    "0x8c5671a6f4610ddbd05a5139659c7190f54117b5": "ESN genesis allocation",
    "0x8cec1886f2cc71b09ca32a1cf77a280ae3a6a9fe": "ESN genesis allocation",
    "0x8d7ee7a9c1c263ba8061f54dcf62d9f8420e2008": "ESN genesis allocation",
    "0x8dedad1511c11798c338334dde7be967de96e9b2": "ESN genesis allocation",
    "0x91ddc95cadeb6dcf6ebbdb3300a29699ac8ded39": "ESN genesis allocation",
    "0x95b9a9ad563a4c1ff7b6ebcf5fabcf5dbdb4a6a3": "ESN genesis allocation",
    "0x9644a2af2ff70eb43584a4351bfbe027c42ba3f9": "ESN genesis allocation",
    "0x97115f7544cb05009b3fad2f0c2817f3ee77dd4d": "ESN genesis allocation",
    "0x9780a9c86160e27f627179535c3d3f23b6b29917": "ESN genesis allocation",
    "0x9898e969629502a891b758efecc9fdc5ada7d32c": "ESN genesis allocation",
    "0x98b8308c37a2f6cc1bb382dba2ba95a3c5ca2834": "ESN genesis allocation",
    "0x98c8a323a0022bd147a466fa1ac867977e12eb92": "ESN genesis allocation",
    "0x9c59dbc48b9cf53fe668784e89d30493da9995b3": "ESN genesis allocation",
    "0x9dbcb5026e0f444a33197da240856f108db14ff0": "ESN genesis allocation",
    "0x9e7b7b522834dd7e83ff2bb6b6e4cd2972330899": "ESN genesis allocation",
    "0x9f4571748463eee19e59ff9bd734a62a66613850": "ESN genesis allocation",
    "0x9a3a8eff6fb82377da6c17ba658dca87ca0dfe26": "ESN genesis allocation",
    "0x9d754d94a15ab6d738e511fe4c775ee6d20a53ee": "ESN genesis allocation",
    "0x9d8cf5d7bb8bdd4101eeccefae42a582e058d60d": "ESN genesis allocation",
    "0x9ef20a338e85044922f08f3648355e834874d551": "ESN genesis allocation",
    "0x9fa47455be14ad2eecce495281ed0eea926ec6a6": "ESN genesis allocation",
    "0xa10bc9f4d05678b26c4ffd2d92ab358163020b61": "ESN genesis allocation",
    "0xa17d5bed36c1059561e184a8a90a38ce955b92e4": "ESN genesis allocation",
    "0xa3d414d9f210f7b77f90790ce09f6128abe50adc": "ESN genesis allocation",
    "0xa645de09d56e553ad1c0886a74d09d70706c9a6d": "ESN genesis allocation",
    "0xaaedb3fa2cf0ebca0ef4a121a28a406264ccc900": "ESN genesis allocation",
    "0xaa9e04077d44d288978a3a3ab0d7c251c0447a4c": "ESN genesis allocation",
    "0xb3c2ac85b99abed4a2a52b5f96a2c98040d16022": "ESN genesis allocation",
    "0xb47f63e14f6de6c3413b2be95a725e367ac18fb6": "ESN genesis allocation",
    "0xb622bb67e95a03f58dc9aecf82c217e86f2cf7c3": "ESN genesis allocation",
    "0xb801f49018317caf30f310dbe116f4e876184874": "ESN genesis allocation",
    "0xbe4feae01d429c872601ae84dfae8fddc3372686": "ESN genesis allocation",
    "0xba77d056d52f84e740579aa527792f826591c858": "ESN genesis allocation",
    "0xbc66241ca430dc31a3e2f44dedba868e16b9a6a1": "ESN genesis allocation",
    "0xbc7c371af0688b1c409f4b07662609a1c9efd120": "ESN genesis allocation",
    "0xc2fd7296210b7013d476205d2517d51b21c9e76c": "ESN genesis allocation",
    "0xc69e4de93457f251b1e0879b5250b26e57839fec": "ESN genesis allocation",
    "0xc7147a95cc4f6bedce6292e8f95539caf550e9d6": "ESN genesis allocation",
    "0xc7c0632cff11812130c30163c83746839a625f95": "ESN genesis allocation",
    "0xc9a0da2a3be799e751738e61b9cc376eb06e2b00": "ESN genesis allocation",
    "0xc9e4b61d8ddeee339e31ba088efb5d608c3464a5": "ESN genesis allocation",
    "0xcc2af3921727d6d2de31d5f656f837a5475de6cf": "ESN genesis allocation",
    "0xd1c79160d0b8c1a1546b86db5123e87645a45d13": "ESN genesis allocation",
    "0xd21ac89a20d67e309f96f64adf05fc48f55918a9": "ESN genesis allocation",
    "0xd3e8d577323d97407246b198c4c61f7943c468cd": "ESN genesis allocation",
    "0xdf92802ffe9892c7704875755bdec648914430e6": "ESN genesis allocation",
    "0xdaa7f446923f7481115ad285ca468c865147e563": "ESN genesis allocation",
    "0xe13958af480da6443b9ec1067f0f33440634a282": "ESN genesis allocation",
    "0xe2f136d3693aa0b2346a968a22aca6707fc1d0e5": "ESN genesis allocation",
    "0xe41546f68bbe1771febbdac2a4a5999eef50edf3": "ESN genesis allocation",
    "0xe4690f5d024a395355a7cb5238fb7e0dc921b1e8": "ESN genesis allocation",
    "0xe5c71c7170e5c9b07e62cc307d81a4a3053ed64c": "ESN genesis allocation",
    "0xe71dac161206e7d3686d13b98fd922ab73587988": "ESN genesis allocation",
    "0xe8b5a83497198a513fb2e244bcf05f9d4cf09d62": "ESN genesis allocation",
    "0xeac1b0868b710e40d6d5c66a461dfc8f78abbaa9": "ESN genesis allocation",
    "0xeb0220406832a8a5d4f242538e82c80bd83d0ac6": "ESN genesis allocation",
    "0xec15ad0aafe0c0f18089de50b2397509e15a20de": "ESN genesis allocation",
    "0xed16770d5a56dced87224d4ff68a361a2285fef2": "ESN genesis allocation",
    "0xeee276140ea24e36eccb4fd748f675df1acd3b73": "ESN genesis allocation",
    "0xecc2d6e129c7daa37a93f559c6d4f575171d8386": "ESN genesis allocation",
    "0xecc3aca2a21cb317c5b9debdcb2090f3931d5cd7": "ESN genesis allocation",
    "0xf1b93a6cfd4b1c7e0e89ebed119c5fe55af2035e": "ESN genesis allocation",
    "0xf2662356cb3ae7b82efd6c82c3591ee40854892b": "ESN genesis allocation",
    "0xf36a149466982c030ce3b9717f34b593613804d5": "ESN genesis allocation",
    "0xf47ce4c5aaef82692e47f7a810ba38d1faec0eea": "ESN genesis allocation",
    "0xf4c5e2f043ef3548a2c1c27d968087bec65e2f7d": "ESN genesis allocation",
    "0xf4ed736a413464eb93f8a430e093a64f0bd4222d": "ESN genesis allocation",
    "0xf69c6eaf077b795f19a9590ee8b578543558e4c4": "ESN genesis allocation",
    "0xf77668db085a87b0a0405a275e1c2516d3e02b66": "ESN genesis allocation",
    "0xf966fdbc4a42f055f8f52d31c23ad7b6a07a5e22": "ESN genesis allocation",
    "0xfbe8fe04084fc93dff8228861fe100bfeeb057b6": "ESN genesis allocation",
    "0xfcc49c62d7738fa1b92aa6a69a12b671e4c7c8d9": "ESN genesis allocation",
    "0xfdc318ba5b1f8ad33e00528828b93a840592e2fb": "ESN genesis allocation",
    "0xfe3b1032e524674cba5f329f940c837850fa53ed": "ESN genesis allocation",
    "0xffbf91a9d1a6377b7435e3e734132e7b34188dac": "ESN genesis allocation",
    "0xa0a967418a3fcb3ee3827a08efa851347c528a60": "ESN genesis allocation",
    "0xa1617dcf3acda60737e5ca9e4d0ecd82a98ef667": "ESN genesis allocation",
    "0xa2ee35300ddf6a2491ec0e1848f8b56defafd7fe": "ESN genesis allocation",
    "0xa3580034590e3052b9de5abd635e514ec5ba8694": "ESN genesis allocation",
    "0xa488cd48258e57d66f44e73a60c121f963cb29f5": "ESN genesis allocation",
    "0xa4ff3b5abfe4e50adad16d01aaf62c3d4cdb5260": "ESN genesis allocation",
    "0xa6d9c82784fa20dcf28266d047db441cfeb8855b": "ESN genesis allocation",
    "0xa7dcdd9b9785a44a2dd4c5eeeb863ac1feae0f66": "ESN genesis allocation",
    "0xa8013e9dca1bd38975748de2fb6cb3af5cae74d9": "ESN genesis allocation",
    "0xa8799eeff72929ee6cbfb5b0c02985cd4841be3c": "ESN genesis allocation",
    "0xac4000d9ad080740ef4a2ebe4a3075877bea277e": "ESN genesis allocation",
    "0xaf04430b3e40e746127623532353a0f177a88fe3": "ESN genesis allocation",
    "0xafa4c5b674934e31a9aa5e3e723d85060d51c4d0": "ESN genesis allocation",
    "0xac0b6e7aadfb5ffafd5cb3ef3620ebb0691cc3fe": "ESN genesis allocation",
    "0xac7445c09372f15259fd852cc458783d6140c0db": "ESN genesis allocation",
    "0xace83deb83fa8d319979658592b75ed13bdf97c7": "ESN genesis allocation",
    "0xadaf4d39b6806d132128ac438c2862c0a1650cff": "ESN genesis allocation",
    "0xb562e4010a0a5fd0906a4cd9f47fc28f6f51e210": "ESN genesis allocation",
    "0xb792a0fd762c002a7585cfdefd36cf7ffb42fc05": "ESN genesis allocation",
    "0xb95dc62e74e44a18c53dff5cea30c449eeae7778": "ESN genesis allocation",
    "0xbf3d86edfcf52733e91a9c59be606a95bd921885": "ESN genesis allocation",
    "0xba96fab21a4926fd1137558ae996b52ec14538a6": "ESN genesis allocation",
    "0xbf2b867313a44bd04aceaa644771d1e95317c881": "ESN genesis allocation",
    "0xc0ee350e5e09a2daeff332a66a6e117fad102112": "ESN genesis allocation",
    "0xc18e9bc05dfee2a39fe2b6778a24a48d5bf0f141": "ESN genesis allocation",
    "0xc20013e25ae53d0d41bf365aa767822bbbe70936": "ESN genesis allocation",
    "0xc4c09f4bbae0ee06f2a52ff0ef0de1978b5305e9": "ESN genesis allocation",
    "0xc55d7ae4f29d857182d5f1ac2a78cbf35a694dc2": "ESN genesis allocation",
    "0xc6f40b81a5860dece34305f53570be61cdf9a8fa": "ESN genesis allocation",
    "0xc99fba8321d16cb19c55703b407c54ed106dcdc4": "ESN genesis allocation",
    "0xcdd1df8bd54941e26ea26eebbd537e751f64f5f7": "ESN genesis allocation",
    "0xd314bac1bf85eedeac0b359dd2106dbae8fc6947": "ESN genesis allocation",
    "0xd33ce3c3b64d1b3d399651432c15ecb943d16c70": "ESN genesis allocation",
    "0xd369c0e01b9a9d519b3b099a98fead19867c019c": "ESN genesis allocation",
    "0xd39a75b4831543e1bc99e7a5ca8875c4f69da45b": "ESN genesis allocation",
    "0xd3bf1c0a6b0470c30fc49d995025af5e6b639e61": "ESN genesis allocation",
    "0xd3e76066c2e32d9a693161de07f2d3b7e6ea07eb": "ESN genesis allocation",
    "0xd4d95059c808cf41e64f7f353246ffae635419d4": "ESN genesis allocation",
    "0xd5dcc82fa169b4677a3fc26d78f38e27dcc763f3": "ESN genesis allocation",
    "0xd72f90d9879f6d2d407b4fdf5d128b98d518f1a5": "ESN genesis allocation",
    "0xd81dcf5756da397ff1f783ffe5391d1ffd4ff227": "ESN genesis allocation",
    "0xd833c6d08f5fff8f77628ab1e86584d052976d1f": "ESN genesis allocation",
    "0xd884bdbdb7e13cc523e7f192310230c7bdbb4a07": "ESN genesis allocation",
    "0xd8b1aee24264efebd1c677fcab6ada6e0f000cc5": "ESN genesis allocation",
    "0xdb0d6c28e9b913f611accaab15cc887f9b770f58": "ESN genesis allocation",
    "0xe0e779e4e3573ea77096daec252ac2b3f1c0013a": "ESN genesis allocation",
    "0xe2f229054293e32cf3e83f9bb88d9cf1d6acd66b": "ESN genesis allocation",
    "0xe425d63d711a9996c09d928ba8df94c88163aea9": "ESN genesis allocation",
    "0xe535b94d370190d1e0955d3c0d12480e558f00dd": "ESN genesis allocation",
    "0xe630b92aa8443eb077e1f6990a2e194d99cf53ec": "ESN genesis allocation",
    "0xe68e8f04b2cff484da2d41dd639ae8880920f781": "ESN genesis allocation",
    "0xe9c5ef50d4a194e53928659b4486a1c456df9e56": "ESN genesis allocation",
    "0xeba44ca2d6f36df8221a2021bf0644cf6cb59452": "ESN genesis allocation",
    "0xedd1d2dcba881202bc546943194d64e59bf74bfd": "ESN genesis allocation",
    "0xed99b72a58a519ca7aa8f46b8d254c3f1eeea0d6": "ESN genesis allocation",
    "0xf2484911e0aa707f88d9dd970db21e8f24b9de2f": "ESN genesis allocation",
    "0xf38f767eeb8002ef051b32fe2f40193bf0751d92": "ESN genesis allocation",
    "0xf56ff110d521ceaec29dbf2842f1e78b24463cea": "ESN genesis allocation",
    "0xf622bf9b8f7be2f75d5ed73d318a0e7fa62a587f": "ESN genesis allocation",
    "0xf6a73c4b958b4d6044f3f4da7147d0fa80e2ea31": "ESN genesis allocation",
    "0xf707b491ac27b2d2e5e1f9d4123635ee0af92c5c": "ESN genesis allocation",
    "0xf961a293bbce366a6fcc98d2ba0342e2ef3c5519": "ESN genesis allocation",
    "0xfc8011850c09c9288e737ea58ca5c15cded6dc8d": "ESN genesis allocation",
    "0xfcacbbc6810c586522012ad32c3dfac80eb563b4": "ESN genesis allocation",
    "0xffbff1fab9f2bc2f387d0cc9cc28f6aac533c813": "ESN genesis allocation",
    "0xfb8b7efb02ea5292304c0f0abc8c555684653587": "ESN genesis allocation",
    "0xfde5a9911a10770d733db4d32ca9a5493478399c": "ESN genesis allocation",
    "0xffc7534b64a8fe8760e931a710883119d28ae106": "ESN genesis allocation"
  };
};

module.exports = config;
