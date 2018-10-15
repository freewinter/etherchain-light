var express = require('express');
var router = express.Router();

var async = require('async');
var Web3 = require('web3');
var redis = require("redis"),
    client = redis.createClient();

Object.size = function (obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

router.get('/:account/:offset?', function (req, res, next) {
    const max_blocks = 50;

    var config = req.app.get('config');
    var web3 = new Web3();
    //web3.setProvider(config.provider);
    web3.setProvider(config.provideripc);
    var db = req.app.get('db');
    var tokenExporter = req.app.get('tokenExporter');

    var data = {};
    var allContractObject = {};
    allContractObject.tokenlist = [];
    allContractObject.accountList = [];

    var contractEvents = {};
    var blocks = {};
    data.contractnum = 0;
    data.address = req.params.account;

    client.on("error", function (err) {
        console.log("Redis Error " + err);
    });


    var totalblocks = [];
    const devide = 2000;

    async.waterfall([
            function (callback) {
                web3.eth.getBlock("latest", false, function (err, result) {
                    callback(err, result); //마지막 블럭 정보를 받아서 전달
                });
            },
            function (lastBlock, callback) {
                data.nextBlockNumber = lastBlock.number;
                var blockNumber = lastBlock.number;
                if (!req.params.offset) {
                    blockNumber = lastBlock.number;
                } else if (req.params.offset > 100 && req.params.offset < lastBlock.number) {
                    blockNumber = req.params.offset;
                } else if (req.params.offset < 101) {
                    blockNumber = 101;
                } else {
                    blockNumber = lastBlock.number;
                }

                web3.eth.getBlock(blockNumber, false, function (err, result) {
                    callback(err, result); //마지막 블럭 정보를 받아서 전달
                });
            },
            function (targetBlock, callback) {
                data.lastBlock = targetBlock.number;
                var idxblock;
                for (idxblock = data.lastBlock; idxblock > devide; idxblock = idxblock - devide) {
                    totalblocks.push(idxblock);
                }
                if (idxblock > devide) {
                    totalblocks.push(idxblock);
                }
                web3.eth.getBalance(data.address, function (err, balance) {
                    callback(err, balance); //해당 계정의 보유량을 받아서 전달
                });
            },
            function (balance, callback) {
                data.balance = balance;
                web3.eth.getCode(data.address, function (err, code) {
                    callback(err, code); //해당 계정의 코드를 받아서 전달
                });
            },
            function (code, callback) {
                data.code = code;
                if (data.code !== "0x") {
                    data.isContract = true;
                }
                client.hgetall('esn_contracts:transfercount', function (err, replies) {
                    callback(null, replies);
                });

            },
            function (result, callback) {
                if (result) {
                    async.eachOfSeries(result, function (value, key, eachOfSeriesCallback) {
                        if (value > 0) {
                            allContractObject.accountList.push(key);
                        }
                        eachOfSeriesCallback();
                    }, function (err) {
                        if (err) {
                            console.log("[ERROR] exporter1: ", err);
                        }
                        callback(null, allContractObject.accountList);
                    });
                } else {
                    callback(null, null);
                }
            },
            function (accountList, callback) {
                //console.log("accountList.length: ", accountList.length);
                if (accountList.length > 0 && data.code === "0x") {
                    async.eachSeries(accountList, function (account, accountListeachCallback) {
                        //TokenDB Start
                        //console.log("[OUT] [tokenAddress]", tokenExporter[account].tokenAddress, "\n[token_name]", tokenExporter[account].token_name, "\n[token_decimals]", tokenExporter[account].token_decimals);
                        async.waterfall([
                            function (tokenlistcallback) {
                                tokenExporter[account].db.find({
                                    _id: data.address
                                }).exec(function (err, balance) {
                                    if (err) {
                                        console.log("[tokendb.find]", err);
                                        tokenlistcallback(null, null);
                                    } else {
                                        if (balance.length !== 0 && balance[0]._id) {
                                            tokenExporter[account].db.find({
                                                $or: [{
                                                    "args._from": data.address
                                                }, {
                                                    "args._to": data.address
                                                }]
                                            }).sort({
                                                timestamp: -1
                                            }).skip(0).limit(1000).exec(function (err, events) {
                                                var tmpTokeninfo = {};
                                                tmpTokeninfo.account = account;
                                                tmpTokeninfo.balance = balance[0];
                                                tmpTokeninfo.events = events;
                                                tmpTokeninfo.name = tokenExporter[account].token_name;
                                                tmpTokeninfo.decimals = tokenExporter[account].token_decimals;
                                                tmpTokeninfo.symbol = tokenExporter[account].token_symbol;
                                                tmpTokeninfo.totalSupply = tokenExporter[account].token_totalSupply;
                                                tokenlistcallback(null, tmpTokeninfo);
                                            });
                                        } else {
                                            tokenlistcallback(null, null);
                                        }
                                    }
                                });
                            }
                        ], function (err, tokeninfo) {
                            if (err) {
                                console.log("Error " + err);
                            } else {
                                //console.dir(tokeninfo);
                                if (tokeninfo && tokeninfo.balance && tokeninfo.balance.balance > 0) {
                                    //console.log("tokeninfo: " + tokeninfo);
                                    //console.dir(tokeninfo);
                                    allContractObject.tokenlist[tokeninfo.account] = tokeninfo;
                                }
                            }
                            accountListeachCallback();
                        });
                        //TokenDB End
                    }, function (err) {
                        return callback(null, allContractObject.tokenlist);
                    });
                    //callback(null, null);
                } else {
                    callback(null, null);
                }
            },
            function (tokenlist, callback) {

                // fetch verified contract source from db
                db.get(data.address.toLowerCase(), function (err, value) {
                    callback(null, value); //디비에서 해당 계정의 정보를 가지고 온다.
                });
            },
            function (source, callback) {
                if (source) {
                    data.source = JSON.parse(source);
                    //console.log(data.source);
                    data.contractState = [];
                    if (!data.source.abi) {
                        return callback(null, null);
                    } else {
                        var abi = JSON.parse(data.source.abi);
                        var contract = web3.eth.contract(abi).at(data.address);

                        async.eachSeries(abi, function (item, eachCallback) {
                            if (item.type === "function" && item.inputs.length === 0 && item.constant) {
                                try {
                                    contract[item.name](function (err, result) {
                                        data.contractState.push({
                                            name: item.name,
                                            result: result
                                        });
                                        return eachCallback();
                                    });
                                } catch (e) {
                                    console.log(e);
                                    return eachCallback();
                                }
                            } else {
                                return eachCallback();
                            }
                        }, function (err) {
                            return callback(err, contract);
                        });
                    }
                } else if (data.isContract) {
                    data.contractState = [];

                    data.token_name = '';
                    if (tokenExporter[data.address] && tokenExporter[data.address].token_name) {
                        data.token_name = tokenExporter[data.address].token_name;
                        data.contractState.push({
                            name: "name",
                            result: tokenExporter[data.address].token_name
                        });
                    }

                    data.token_totalSupply = '';
                    if (tokenExporter[data.address] && tokenExporter[data.address].token_totalSupply) {
                        data.token_totalSupply = tokenExporter[data.address].token_totalSupply;
                        data.contractState.push({
                            name: "totalSupply",
                            result: tokenExporter[data.address].token_totalSupply
                        });
                    }

                    data.token_decimals = '';
                    if (tokenExporter[data.address] && tokenExporter[data.address].token_decimals) {
                        data.token_decimals = tokenExporter[data.address].token_decimals;
                        data.contractState.push({
                            name: "decimals",
                            result: tokenExporter[data.address].token_decimals
                        });
                    }

                    data.token_symbol = '';
                    if (tokenExporter[data.address] && tokenExporter[data.address].token_symbol) {
                        data.token_symbol = tokenExporter[data.address].token_symbol;
                        data.contractState.push({
                            name: "symbol",
                            result: tokenExporter[data.address].token_symbol
                        });
                    }

                    if (tokenExporter[data.address] && tokenExporter[data.address].contract) {
                        var allEvents = tokenExporter[data.address].contract.allEvents({
                            fromBlock: 0,
                            toBlock: "latest"
                        });
                        allEvents.get(function (err, events) {
                            if (err) {
                                console.log("Error receiving historical events:", err);
                                callback(null, null);
                            } else {
                                callback(null, events);
                            }
                        });
                    } else {
                        callback(null, null);
                    }
                } else {
                    return callback(null, null);
                }
            },
            function (cevents, callback) {
                data.previousBlockNumber = 1;
                data.fromBlock = 1;
                if (cevents) {
                    async.eachSeries(cevents, function (event, contracteachCallback) {
                        async.waterfall([
                                function (contractcallback) {
                                    if (event.blockNumber && (event.event === "Transfer" || event.event === "Approval")) {
                                        if (event.args && event.args._value) {
                                            contractcallback(null, event.args._value.toNumber(), event.blockNumber);
                                        } else {
                                            contractcallback(null, null, null);
                                        }
                                    } else {
                                        //console.dir(event);
                                        contractcallback(null, null, null);
                                    }
                                },
                                function (amount, blockNumber, contractcallback) {
                                    //console.log("_value: ", amount, "blockNumber: ", blockNumber);
                                    if (amount) {
                                        event.args._value = amount;
                                        web3.eth.getBlock(blockNumber, false, function (err, block) {
                                            contractcallback(block.timestamp, null);
                                        });
                                    } else {
                                        contractcallback(null, null);
                                    }
                                }
                            ],
                            function (blockTimestamp, err) {
                                //console.dir("blockTimestamp: " + blockTimestamp);
                                if (blockTimestamp) {
                                    event.timestamp = (new Date(blockTimestamp * 1000)).toLocaleString();
                                    if (!contractEvents[data.contractnum]) {
                                        contractEvents[data.contractnum] = [];
                                    }
                                    contractEvents[data.contractnum].push(event);
                                    //console.log("contractEvents[", data.contractnum, "]", contractEvents[data.contractnum]);
                                    data.contractnum++;
                                    //console.log(contractEvents.length + "  --------------async.waterfall----------------");
                                }
                                contracteachCallback();
                            });
                    }, function (err) {
                        callback(err, contractEvents);
                    });
                } else {
                    async.eachSeries(totalblocks, function (subblocks, outeachCallback) {
                            //console.log("[TAG Test] subblocks: ", subblocks, " Object.size(blocks): ", Object.size(blocks), " max_blocks: ", max_blocks);
                            if (Object.size(blocks) >= max_blocks) {
                                return callback(null, null);
                            } else {
                                const startblocknumber = (subblocks - devide - 1).toString(16);
                                const endblocknumber = subblocks.toString(16);
                                async.waterfall([
                                        function (incallback) {
                                            web3.trace.filter({
                                                "fromBlock": "0x" + startblocknumber,
                                                "toBlock": "0x" + endblocknumber,
                                                "toAddress": [data.address]
                                            }, function (err, totraces) {
                                                if (err) {
                                                    console.log("(subblocks - devide - 1): ", subblocks, devide, (subblocks - devide - 1));
                                                    //(subblocks - devide - 1):  2741 1000 1740
                                                    console.log("totraces Error: ", err);
                                                }
                                                async.eachOfSeries(totraces, function (value, key, eachOfSeriesCallback) {
                                                    totraces[key].calltype = "to";
                                                    eachOfSeriesCallback();
                                                }, function (err) {
                                                    incallback(err, totraces);
                                                });
                                            });
                                        },
                                        function (totraces, incallback) {
                                            web3.trace.filter({
                                                "fromBlock": "0x" + startblocknumber,
                                                "toBlock": "0x" + endblocknumber,
                                                "fromAddress": [data.address]
                                            }, function (err, fromtraces) {
                                                if (err) {
                                                    console.log("fromtraces Error: ", err);
                                                }
                                                async.eachOfSeries(fromtraces, function (value, key, eachOfSeriesCallback) {
                                                    fromtraces[key].calltype = "from";
                                                    eachOfSeriesCallback();
                                                }, function (err) {
                                                    incallback(err, totraces, fromtraces);
                                                });
                                            });
                                        },
                                        function (totraces, fromtraces, incallback) {
                                            var traces = totraces.concat(fromtraces);
                                            traces.sort(function (a, b) {
                                                return (a.blockNumber < b.blockNumber) ? 1 : ((b.blockNumber < a.blockNumber) ? -1 : 0);
                                            });

                                            async.eachSeries(traces, function (trace, ineachCallback) {
                                                const num = trace.blockNumber;
                                                trace.isContract = false;
                                                trace.action._value = '';
                                                trace.action._to = '';
                                                if (trace.type === 'reward') {
                                                    web3.eth.getBlock(num, true, function (err, result) {
                                                        if (result.transactions && result.transactions.length > 0) {
                                                            var totalGasUsed = 0;
                                                            async.eachOfSeries(result.transactions, function (value, key, eachOfSeriesCallback) {
                                                                totalGasUsed += result.gasUsed * result.transactions[key].gasPrice;
                                                                eachOfSeriesCallback();
                                                            }, function (err) {
                                                                trace.action.value = "0x".concat((parseInt(trace.action.value, 16) + totalGasUsed).toString(16));
                                                            });
                                                        }
                                                    });
                                                    if (Object.size(blocks) < max_blocks) {
                                                        if (!blocks[num]) {
                                                            blocks[num] = [];
                                                        }
                                                        blocks[num].push(trace);

                                                        data.previousBlockNumber = num - 1;
                                                        data.fromBlock = num;
                                                    }
                                                    ineachCallback();
                                                } else if (trace.type === 'call') {
                                                    if (tokenExporter[trace.action.to]) {
                                                        trace.isContract = true;
                                                        if (tokenExporter[trace.action.to].token_decimals) {
                                                            trace.token_decimals = tokenExporter[trace.action.to].token_decimals;
                                                        } else {
                                                            trace.token_decimals = 0;
                                                        }

                                                        if (tokenExporter[trace.action.to].token_symbol) {
                                                            trace.token_symbol = tokenExporter[trace.action.to].token_symbol;
                                                        } else {
                                                            trace.token_symbol = 'n/a';
                                                        }

                                                        if (allContractObject.tokenlist[trace.action.to] && allContractObject.tokenlist[trace.action.to].events) {
                                                            async.eachSeries(allContractObject.tokenlist[trace.action.to].events, function (event, eventeachCallback) {
                                                                if (trace.transactionHash === event.transactionHash) {
                                                                    if (event.event === "Transfer" || event.event === "Approval") {
                                                                        if (event.args && event.args._value && trace.transactionPosition == event.transactionIndex) {
                                                                            //console.dir(event.args);
                                                                            /*
                                                                            data:    :10442 - { _from: '0x3e2c6a622c29cf30c04c9ed8ed1e985da8c95662',
                                                                            data:    :10442 -   _to: '0xf94fda503c3f792491fa77b3702fd465f028810d',
                                                                            data:    :10442 -   _value: 1e+23 }
                                                                            */
                                                                            trace.action._value = "0x".concat(event.args._value.toString(16));
                                                                            trace.action._to = event.args._to;
                                                                        }
                                                                    } else {
                                                                        console.dir(event.args);
                                                                    }
                                                                }
                                                                eventeachCallback();
                                                            });
                                                        }
                                                    }
                                                    if (Object.size(blocks) < max_blocks) {
                                                        if (!blocks[num]) {
                                                            blocks[num] = [];
                                                        }
                                                        blocks[num].push(trace);

                                                        data.previousBlockNumber = num - 1;
                                                        data.fromBlock = num;
                                                    }
                                                    ineachCallback();
                                                } else if (trace.type === 'create') {
                                                    trace.isContract = true;
                                                    //console.dir(trace);
                                                    //console.log("-----------------------trace.type === 'create'-----------------------");
                                                    var erc20Contract = web3.eth.contract(config.erc20ABI).at(trace.result.address);
                                                    async.eachSeries(config.erc20ABI, function (item, abieachCallback) {
                                                        if (item.type === "function" && item.inputs.length === 0 && item.constant) {
                                                            try {
                                                                erc20Contract[item.name](function (err, result) {
                                                                    if (item.name === "decimals") {
                                                                        if (result && result.toString().length >= 1) {
                                                                            trace.token_decimals = result;
                                                                        }
                                                                    } else if (item.name === "symbol") {
                                                                        if (result && result.length >= 1) {
                                                                            trace.token_symbol = result;
                                                                        }
                                                                    }
                                                                    return abieachCallback();
                                                                });
                                                            } catch (e) {
                                                                console.log(e);
                                                                return abieachCallback();
                                                            }
                                                        } else {
                                                            return abieachCallback();
                                                        }
                                                    });
                                                    if (Object.size(blocks) < max_blocks) {
                                                        if (!blocks[num]) {
                                                            blocks[num] = [];
                                                        }
                                                        blocks[num].push(trace);

                                                        data.previousBlockNumber = num - 1;
                                                        data.fromBlock = num;
                                                    }
                                                    ineachCallback();
                                                }
                                            });
                                            incallback(null);
                                        }
                                    ],
                                    function (err) {
                                        if (err) {
                                            console.log("outeachCallback Error " + err);
                                        }
                                        outeachCallback();
                                    });
                            }
                        },
                        function (err) {
                            if (err) {
                                console.log("callback Error " + err);
                            }
                            callback(err, null);
                        });
                }
            },
            function (cevents, callback) {
                //console.log("data.isContract: ", data.isContract);
                if (!data.isContract) {
                    var tokenBlocks = {};
                    //console.dir(allContractObject.tokenlist);
                    async.eachSeries(allContractObject.accountList, function (account, accountListeachCallback) {
                        //console.dir(allContractObject.tokenlist[account]);
                        //console.log("============= allContractObject.tokenlist[account] =============");
                        if (allContractObject.tokenlist[account] && allContractObject.tokenlist[account].events) {
                            //console.dir(allContractObject.tokenlist[account].events);
                            async.eachSeries(allContractObject.tokenlist[account].events, function (event, eventeachCallback) {
                                if (event.event === "Transfer" || event.event === "Approval") {
                                    if (event.args && event.args._value) {
                                        event.args._value = "0x".concat(event.args._value.toString(16));
                                        event.token_decimals = allContractObject.tokenlist[account].decimals;
                                        event.token_symbol = allContractObject.tokenlist[account].symbol;
                                        if (!tokenBlocks[event.blockNumber]) {
                                            tokenBlocks[event.blockNumber] = [];
                                        }
                                        tokenBlocks[event.blockNumber].push(event);
                                    }
                                } else {
                                    console.dir(event);
                                    console.log("[INFO] XXXXXXXX event.event === 'Transfer' || event.event === 'Approval' XXXXXXXX");
                                }
                                eventeachCallback();
                            });
                        }
                        accountListeachCallback();
                    });
                    callback(null, tokenBlocks);
                } else {
                    callback(null, null);
                }
            }
        ],
        function (err, tokenEvents) {
            if (err) {
                console.log("Final Error " + err);
            }

            data.officialurl = 'https://ethersocial.net/addr/' + data.address;

            data.blocks = [];
            for (var block in blocks) {
                data.blocks.push(blocks[block]);
            }
            data.blocks = data.blocks.reverse();

            if (tokenEvents) {
                data.tokenBlocks = [];
                for (var tokenBlock in tokenEvents) {
                    if (tokenEvents[tokenBlock]) {
                        data.tokenBlocks.push(tokenEvents[tokenBlock]);
                    }
                }
                data.tokenBlocks = data.tokenBlocks.reverse();
            }

            //console.dir(data.tokenBlocks);
            //console.log(" ============= console.dir(data.tokenBlocks) ============= ");

            if (data.source) {
                data.name = data.source.name;
            } else if (config.names[data.address]) {
                data.name = config.names[data.address];
            }

            if (!data.isContract) {
                data.tokens = [];
                for (var tokenaddress in allContractObject.tokenlist) {
                    data.tokens.push(allContractObject.tokenlist[tokenaddress]);
                }
            }

            //console.dir(data.tokens);
            //console.log("================= data.tokens =================");
            let setNodeText = new Set();
            let mapNodeText = new Map();

            for (var nodekey = 0; nodekey < data.blocks.length; nodekey++) {
                for (var idxtrace = 0; idxtrace < data.blocks[nodekey].length; idxtrace++) {
                    var tmpBlock = data.blocks[nodekey][idxtrace];
                    if (tmpBlock.type == "call") {
                        setNodeText.add(tmpBlock.action.from).add(tmpBlock.action.to);

                        let mapKey = tmpBlock.action.from.concat(",").concat(tmpBlock.action.to);
                        let mapValue = mapNodeText.get(mapKey);
                        if (mapValue != undefined) {
                            mapNodeText.set(mapKey, mapValue + parseInt(tmpBlock.action.value, 16) / 10e+17);
                        } else {
                            mapNodeText.set(mapKey, parseInt(tmpBlock.action.value, 16) / 10e+17);
                        }
                    } else if (tmpBlock.type == "reward") {
                        setNodeText.add("Mining").add(tmpBlock.action.author);
                        let mapKey = "Mining,".concat(tmpBlock.action.author);
                        let mapValue = mapNodeText.get(mapKey);
                        if (mapValue != undefined) {
                            mapNodeText.set(mapKey, mapValue + parseInt(tmpBlock.action.value, 16) / 10e+17);
                        } else {
                            mapNodeText.set(mapKey, parseInt(tmpBlock.action.value, 16) / 10e+17);
                        }
                    }
                }
            }

            data.nodeDataArray = [];
            data.linkDataArray = [];
            var nodeindex = 1;
            for (let nodetext of setNodeText) {
                data.nodeDataArray.push({
                    key: nodeindex,
                    text: nodetext
                });
                nodeindex++;
            }
            mapNodeText.forEach(function (value, key) {
                var nodelink1 = 0;
                var nodelink2 = 0;
                var arrkey = key.split(",");
                data.nodeDataArray.forEach(function (item, index, array) {
                    if (item.text == arrkey[0]) {
                        nodelink1 = item.key;
                    } else if (item.text == arrkey[1]) {
                        nodelink2 = item.key;
                    }
                });
                data.linkDataArray.push({
                    from: nodelink1,
                    to: nodelink2,
                    text: value.toFixed(3)
                });
            });

            if (contractEvents) {
                data.contractEvents = [];

                for (var contractnum in contractEvents) {
                    //console.dir(contractEvents[contractnum]);
                    data.contractEvents.push(contractEvents[contractnum][0]);
                }

                data.contractEvents = data.contractEvents.reverse(); //.splice(0, 100);
                //console.dir(data.contractEvents);
            }
            res.render('account', {
                account: data,
                nodedata: JSON.stringify(data.nodeDataArray),
                linkdata: JSON.stringify(data.linkDataArray)
            });
        });
});

module.exports = router;