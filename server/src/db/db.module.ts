import { Module } from '@nestjs/common';
import { dbProvider } from './connection';

@Module({
    providers: [
        dbProvider,
    ],
})
export class DbModule {}
