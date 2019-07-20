console.log('The bot is loading...');
var Twit = require('twit');
var config =  require('./config');
 
var T = new Twit(config);
//console.log(config);


// geting tweets based on a query parameters
keywords =['coding','love','coffee','heroes','javscript','games'];
var min = 0;
var max =6;
var pick_keyword = keywords[Math.floor(Math.random() * (+max - +min)) + +min];
//console.log(pick_keyword);

query ={
    q: pick_keyword, 
    count: 10
};
T.get('search/tweets', query, tweetReceived);

function tweetReceived(err, data, response) {
    if(err){
        console.log('Something went wrong!!');
        //console.log(err);
    }
    else{
        
        var tweets = data.statuses;
        var slicedTweet='';
        //console.log(tweets);
        for (var c=0;c<tweets.length;c++){
            tweetText= tweets[c].text;
            //console.log(typeof(tweetText)); //strings
            var stringarray = tweetText.split(" ");
            //console.log(stringarray);
            //console.log(typeof(stringarray));
            var randPick = [];
            randPick.push(stringarray[Math.floor(Math.random() * (+stringarray.length - +0)) + +0]);
            //console.log(randPick);
            
            for (var i=0 ; i<randPick.length ; i++){
                slicedTweet = slicedTweet + ' '+ randPick[0];
            }

            //console.log(slicedTweet);
            
        }
        setInterval(postTweet,1000*60*120); //posting every 2 hours
        postTweet(slicedTweet);
        
    }
  };

// posting a tweet

//setInterval(postTweet,1000*60*120);

function postTweet(txt) {

    //var rand = Math.floor(Math.random()*100);

tweetText ={
    status: txt
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
};