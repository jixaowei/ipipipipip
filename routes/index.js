var express = require('express');
var router = express.Router();
// var requestIp = require('request-ip');
// var get_ip = require('ipware')().get_ip;
var rp = require('request-promise');
/* GET home page. */
router.get('/', function(req, res, next) {
    // var clientIp = requestIp.getClientIp(req);
    // var clientIp = get_ip(req);
    // var clientIp = req.connection.remoteAddress;
    var clientIp = req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
    clientIp = clientIp.replace('::ffff:', '');
    console.log(clientIp);
    var options = {
        method: 'GET',
        uri: 'http://int.dpool.sina.com.cn/iplookup/iplookup.php',
        qs: {
            ip: clientIp,
            format: 'json'
        },
        json: true // Automatically stringifies the body to JSON
    };
    rp(options)
    .then(function(body){
        res.json(body);
    })
    .catch(function(err){
        console.log(err);
        res.send('err');
    })
//   res.render('index', { title: 'Express' });
});

module.exports = router;
