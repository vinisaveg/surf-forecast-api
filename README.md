## Surf Forecast API

This is an API built with nodejs and express with the help of Waldemar Neto's Node.js API course on [`Youtube`](https://www.youtube.com/watch?v=W2ld5xRS3cY&list=PLz_YTBuxtxt6_Zf1h-qzNsvVt46H8ziKh&index=2)

### Techs :computer:

- [`Typescript`](https://www.typescriptlang.org)

### Testing :heavy_check_mark:

- [`Jest`](https://jestjs.io)
- [`ts-jest`](https://kulshekhar.github.io/ts-jest/)

### Installing :construction_worker:

- First clone this repo

```

    git clone https://github.com/vinisaveg/surf-forecast-api.git

```

- Install all dependencies

```

    yarn install

```

- Setting up the environment

Use the example.env to create the .env file with the needed variables.

```

    MONGO_INITDB_ROOT_USERNAME
    MONGO_INITDB_ROOT_PASSWORD
    ME_CONFIG_MONGODB_ADMINUSERNAME
    ME_CONFIG_MONGODB_ADMINPASSWORD
    ME_CONFIG_MONGODB_SERVER
    STORMGLASS_API_KEY

```

- Running Docker containers

```

    docker-compose -f docker-compose.yaml up

```

Now you are good to:

- `yarn dev` -> to start the app in development mode
- `yarn test` -> to run all the tests
- `yarn build` -> to compile the app to production
- `yarn start` -> to run the app in production mode

Happy Coding! :smile:
