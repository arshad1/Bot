var express = require('express');
var router = express.Router();
var bittrex = require('node-bittrex-api');

/* GET home page. */
router.get('/', function(req, res, next) {
var coinName = req.param('coin');

 /*   bittrex.options({
        'apikey' : 'xxxxxxxxxxxxxxxxx',
        'apisecret' : 'xxxxxxxxxxxxxxx',
    }); // kmarshad*/
    bittrex.options({
        'apikey' : 'xxxxxxxxxxxxx',
        'apisecret' : 'xxxxxxxxxxxxxxxxxx',
    }); // nazim
  /*  bittrex.getbalance({ currency : 'BTC' }, function( data, err ) {
        console.log( data, err );
    });*/

    bittrex.getorderbook({market: 'BTC-'+coinName, depth: 10, type: 'both'}, function (data, err) {

        var lastamount;
        if (data === null) {
            res.json('Coin error')
        }
        else {
            lastamount = data.result.sell[0].Rate;
           var qnty = 0.05 / lastamount ;
            console.log(qnty,lastamount/2);
            var lastAmtHalf = lastamount/2;

             bittrex.tradebuy({
                MarketName: 'BTC-'+coinName,
                OrderType: 'LIMIT',
                Quantity: qnty,
                Rate: lastamount,
                TimeInEffect: 'GOOD_TIL_CANCELLED', // supported options are 'IMMEDIATE_OR_CANCEL', 'GOOD_TIL_CANCELLED', 'FILL_OR_KILL'
                ConditionType: 'NONE', // supported options are 'NONE', 'GREATER_THAN', 'LESS_THAN'
                Target: 0, // used in conjunction with ConditionType
            }, function (data, err) {
                console.log(data, err);
                res.json({1:qnty,2:lastamount,3:data,4:err});
            });


        }
    });


 /*   bittrex.websockets.client(function() {
        console.log('Websocket connected');
        bittrex.websockets.subscribe(['BTC-LTC'], function(data) {

            if (data.M === 'updateExchangeState') {
                data.A.forEach(function(data_for) {
                    console.log('Market Update for '+ data_for.MarketName, data_for);
                });
            }
        });
    });*/

});

module.exports = router;
