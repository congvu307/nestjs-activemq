# Nestjs - ActiveMQ

## Installation

Copy dependency `@nestjs/activemq` to your package.json

```json
"dependencies": {
    "@nestjs/activemq": "git+https://github.com/congvu307/nestjs-activemq"
  }
```

Run

```bash
npm install
```

## Usage

```js
//app.module.ts
import { ActiveMQModule } from '@nestjs/activemq'

@Module({
    imports: [{
        ActiveMQModule.forRoot({
            host: 'localhost',
            port: 61613,
            username: 'admin',
            password: 'admin',
            maxConnection: 5
        })
    }]
})
```

```js
//foo.listener.ts

import { ActiveMQHandler } from '@nestjs/activemq'

export class FooListener {
    constructor(@Inject('ACTIVEMQ_PROVIDER') readonly handler: ActiveMQHandler) {
        handler.subscribe('QUEUE_NAME', (err, data) => {
            ...
        })
    }
}

```