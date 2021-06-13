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

- Accessing mongo container

```

    docker container exec -it <mongo-container-name> /bin/bash

```

- Accessing mongo shell

```

    mongo --username <MONGO_INITDB_ROOT_USERNAME>

```

- Edit the Mongo URI on /config/default.json

```

    "mongoUrl": "mongodb://<username>:<password>@localhost:27017/<dbname>?authSource=admin"

```

Now you are good to:

- `yarn dev` -> to start the app in development mode
- `yarn test:unit` -> to run all the unit tests
- `yarn test:functional` -> to run all the functional tests
- `yarn build` -> to compile the app to production
- `yarn start` -> to run the app in production mode

Happy Coding! :smile:
