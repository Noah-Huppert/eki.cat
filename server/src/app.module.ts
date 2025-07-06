import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnowledgeNodeModule } from './knowledge-node/knowledge-node.module';

@Module({
  imports: [KnowledgeNodeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
