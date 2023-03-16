# Movie Spot!

Movie Spot! is a web that contain list of Movie Data from The Movie DB API.

This web is using `NEXT.JS`.

In this page you can:
* Search Movies by title.
* Get a list of movies sorted by Popularity.
* Get a list of movies sorted by Top Rated.

## Table of Contents
1. [Requirements](#requirements)
2. [Getting Started](#getting-started)

## Requirements
* node `v14.15.1 (LTS)`
* npm `6.14.9`


## Getting Started

After confirming that your development environment meets the specified [requirements](#requirements),
you can start the site by running these commands:

```bash
$ npm install                   # Install project dependencies
$ npm run dev                     # Compile and launch on development environment
```

While developing, you will probably rely mostly on `npm run dev`; however, there are additional scripts at your disposal:

|`npm run <script>`|Description|
|------------------|-----------|
|`dev` |Serves your app at `localhost:3000`.|
|`build`|Compiles the application for deployment purpose.|
|`start`|Serves your server in `production` mode but requires `next build` (usually used for running the app in production).|