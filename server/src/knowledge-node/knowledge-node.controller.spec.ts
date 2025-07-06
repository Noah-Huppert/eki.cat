import { Test, TestingModule } from '@nestjs/testing';
import { KnowledgeNodeController } from './knowledge-node.controller';
import { KnowledgeNodeService } from './knowledge-node.service';

describe('KnowledgeNodeController', () => {
  let controller: KnowledgeNodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KnowledgeNodeController],
      providers: [KnowledgeNodeService],
    }).compile();

    controller = module.get<KnowledgeNodeController>(KnowledgeNodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
