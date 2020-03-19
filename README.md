# Example Project for Polyglot Apollo Federation

## What is this thing??

So its really cool! Basically, this project is an example of how you can create
a federated apollo gateway that is connected to existing graphql servers. Specifically,
this incliudes the following:

1. An existing node graphql server `nodeql`
2. An existing django graphql server `djangoql`
3. A new apollo gateway `gateway`

There are comments in the code that show how the apps were converted ( like three lines of code per app )

Also this project includes and example of how to add a local schema to the gateway.

## Getting Started

### Run Servers ( Order matters )

from `/djangoql`

```
python3 manage.py runserver
```

This will runn django app on `localhos:8000`

from `nodeql`

```
npm run start
```

This will runn node app on `localhos:8001`

from `gateway`

```
npm run start
```

This will runn gateway app on `localhos:4000`

Now go ahead and hit `localhost:4000/graphql` take a look at the federated schema!
