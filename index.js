const express = require("express");
const redis = require("redis");

const app = express();
const redisClient = redis.createClient({
    host: 'redis-server',
    port: 6379
});

app.get('/', (req, res) => {
    console.log('sent response');    
    redisClient.get('visits', (err, visits)=> {        
        if(!visits){
            redisClient.set('visits', 0);
            visits = 0;
        }        
        res.send('Site visits : ' + visits );
        redisClient.set('visits', parseInt(visits) + 1);
    });
});

app.listen(8080, () => {
    console.log('Listening on port 8080!!!');    
});