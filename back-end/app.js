const express = require("express");
const app = express();
const yelp = require('yelp-fusion');

const apiKey = 'bGUpGzGf-7Yh2sjeqg7YRyxWfir6FuivphISjD6YxcgidHufzzzBeLH9CR-nyLFzAMLp76O1WRPi7mR91inn5Q_HH21hIFJsxwKQ3YcyjKl_2WfdfZhu2-85YBV9Y3Yx';

  
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/retrieveYelpData", (req, res) => {
  const query = req.query;

  const limit = query?.limit ? query?.limit : 20;
  const location = query?.location ? query?.location : 'NYC';
  const sort = query?.sort && query?.sort != '' ? query?.sort : 'best_match';

  if (query && query.transaction) {
    const searchRequest = {
      location: location
    };
  
    const client = yelp.client(apiKey);
  
    client.transactionSearch(query.transaction, searchRequest).then(response => {
      res.set('Access-Control-Allow-Origin', '*');
      res.send(response.jsonBody.businesses);
    }).catch(e => {
      res.send('{businesses: undefined}');
      console.log(e);
    });
  }
  else {
    const searchRequest = {
      location: location,
      limit: parseInt(limit),
      sort_by: sort
    };
  
    const client = yelp.client(apiKey);
  
    client.search(searchRequest).then(response => {
      res.set('Access-Control-Allow-Origin', '*');
      res.send(response.jsonBody.businesses);
    }).catch(e => {
      res.send('{businesses: undefined}');
      console.log(e);
    });
  }

});
  
const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));