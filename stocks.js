var rp = require('request-promise');
var parser = require('xml2json');

function getStocks(symbol, callback){
    var options = {
        uri: `http://ws.nasdaqdod.com/v1/NASDAQAnalytics.asmx/GetEndOfDayData?_Token=BC2B181CF93B441D8C6342120EB0C971&Symbols=${symbol}&StartDate=${'11/01/2016'}&EndDate=${'11/13/2016'}&MarketCenters=Q`,
        method: 'GET',
        }

    rp(options).
        then((response) => {
            var res = JSON.parse(parser.toJson( response ));
            res = res.ArrayOfEndOfDayPriceCollection.EndOfDayPriceCollection.Prices.EndOfDayPrice;
            console.log(res);
            if (callback) return callback(null, res);
        })
        .catch((err) => {
            console.error(err);
            if (callback) return callback(err);
        });
}
exports.getStocks = getStocks;
