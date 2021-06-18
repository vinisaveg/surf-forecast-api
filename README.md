## Surf Forecast API

This is an API built with nodejs and express with the help of Waldemar Neto's Node.js API course on [`Youtube`](https://www.youtube.com/watch?v=W2ld5xRS3cY&list=PLz_YTBuxtxt6_Zf1h-qzNsvVt46H8ziKh&index=2)

### Techs :computer:

- [`Typescript`](https://www.typescriptlang.org)
- [`OvernightJS`](https://github.com/seanpmaxwell/overnight/#readme)
- [`Express`](https://expressjs.com)
- [`axios`](https://github.com/axios/axios)
- [`mongoose`](https://mongoosejs.com)

### Database :floppy_disk:

- [`MongoDB`](https://www.mongodb.com)

### Testing :heavy_check_mark:

- [`Jest`](https://jestjs.io)
- [`ts-jest`](https://kulshekhar.github.io/ts-jest/)
- [`supertest`](https://github.com/visionmedia/supertest#readme)
- [`nock`](https://github.com/nock/nock#readme)

### Installing :construction_worker:

- First clone this repo

```

    git clone https://github.com/vinisaveg/surf-forecast-api.git

```

- Install all dependencies

```

    yarn install

```

### Setting up the environment :electric_plug:

Use the example.env to create the .env file with the needed variable.

```

    ME_CONFIG_MONGODB_SERVER=mongodb

```

Change the _apiToken_ and the _auth_ secret on config/default.json

```

    apiToken: "YOUR stormglass.io API KEY"
    key: "Auth Secret"

```

- Running Docker containers

```

    docker-compose -f docker-compose.yaml up

```

- Mongo Express interface listening on:

```

    http://localhost:8081

```

Now you are good to:

- `yarn dev` -> to start the app in development mode
- `yarn test:unit` -> to run all the unit tests
- `yarn test:functional` -> to run all the functional tests
- `yarn build` -> to compile the app to production
- `yarn start` -> to run the app in production mode

Happy Coding! :smile:
