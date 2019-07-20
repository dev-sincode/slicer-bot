console.log('The bot is loading...');
var Twit = require('twit');
var config =  require('./config');
 
var T = new Twit(config);
//console.log(config);


// geting tweets based on a query parameters
query ={
    q: 'challenge', 
    count: 2
};
T.get('search/tweets', query, tweetReceived);

function tweetReceived(err, data, response) {
    if(err){
        console.log('Something went wrong!!');
        //console.log(err);
    }
    else{
        var tweets = data.statuses;
        for (var c=0;c<tweets.length;c++){
            console.log(tweets[c].text);
        }
        
    }
  };

// posting a tweet
tweetText ={
    status: '#maser-bot hello world!'
};

T.post('statuses/update', tweetText , tweetedSuccess);

function tweetedSuccess(err, data, response) {
    if (err){
        console.log('Something went wrong while posting the tweet!!');
        //console.log(err);    
    }
    else{
        console.log(data)
    }
    
  }