# Second-hand market API
#### prototype

Second-hand goods market API.

API has next endpoints:
* register
* auth
* tags
* advertisements

## Running
After project cloning and installing dependencies, you have to run server by:
`npm start`.

In **development** environment doesn't use cluster mode.

In **production** environment, use only **builded** package. You need to installed **pm2** in your work environment and run `pm2 start index.js -i 0` script. It will start server in cluster mode, using available CPUs.

## Example
Request examples in curl.

Query:

+ lang: error message language priority
+ token: for `adverts` request

### register
###### Register new user
```curl
curl -XPOST http://localhost:3000/apiv1/register?lang=es -H 'Content-Type: application/json' -d '{ "name": "dimpiax", "email": "dimpiax@gmail.com", "passwd": "root", "lang": "UA" }'
```

### auth
###### Auth user
Returns `AUTH_TOKEN`
```curl
curl -XPOST http://localhost:3000/apiv1/auth -H 'Content-Type: application/json' -d '{ "email": "dimpiax@gmail.com", "passwd": "root" }'
```

### tags
###### Get existed unique tags
```curl
curl -XGET http://localhost:3000/apiv1/adverts/tags?lang=es\&token=AUTH_TOKEN
```

### advertisements
###### Get advertisements
Query has additional keys:

Documents includes in response that satisfy conditions:

+ name *(*string*)*: starts by given string
+ price *(*string | double*)*: partly or whole range for `price` property
+ toSell *(*boolean*)*: advertisement type
+ tag *(*string*)*: value that exist in `tags` array property
+ limit *(*number*)*: limit documents count in response
+ start *(*number*)*: show page relatively to limit count. I.e.: start is **5** and limit is **10**, documents will be shown from *50* index.

Documents can be sorted:

+ sort *(*string*)*: ascending sorting by set specific property

Requests:

+ paging, sorting, price interval, tag
```curl
curl -XGET http://localhost:3000/apiv1/adverts?token=AUTH_TOKEN\&start=0\&limit=2\&sort=toSell\&price=10-230.15\&tag=motor
```
+ advertisement type
```curl
curl -XGET http://localhost:3000/apiv1/adverts?token=AUTH_TOKEN\&toSell=false
```

### Technical information
Project implemented on JavaScript, using the latest ES features, dated on the latest commit.

Its development environment based on: Babel, Flow, ESLint.
