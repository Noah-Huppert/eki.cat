import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnowledgeNodeModule } from './knowledge-node/knowledge-node.module';
import { DbModule } from './db/db.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [KnowledgeNodeModule, DbModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
