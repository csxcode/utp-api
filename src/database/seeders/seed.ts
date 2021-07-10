import { configService } from 'src/config/config.service';
import { UnitOfWorkService } from 'src/core/services/unit-of-work.service';
import { ConnectionOptions, createConnection } from 'typeorm';
import { FakeDataSeed } from './fake-data';
import { InitDataSeed } from './init-data';

async function run() {
    console.log('> Beginning dbseed task.');

    const opt = {
        ...configService.getTypeOrmConfig(),
        //debug: true,
    };

    const connection = await createConnection(opt as ConnectionOptions);
    console.log('database connected.');              

    const uow = new UnitOfWorkService(connection);

    return uow.doTransactional(async (): Promise<any> => {        
        //await (new InitDataSeed(uow)).run()
        await (new FakeDataSeed(uow)).run()
    });    
}

run()
    .then(() => console.log('> Seed was successfully executed!'))
    .catch((error) => console.error('> [Seed Error]:', error))
    .finally(() => process.exit(0));    

