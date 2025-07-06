import { Module } from '@nestjs/common';
import { KnowledgeNodeService } from './knowledge-node.service';
import { KnowledgeNodeController } from './knowledge-node.controller';

@Module({
  controllers: [KnowledgeNodeController],
  providers: [KnowledgeNodeService],
})
export class KnowledgeNodeModule {}
