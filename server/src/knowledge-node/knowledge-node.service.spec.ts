import { Test, TestingModule } from '@nestjs/testing';
import { KnowledgeNodeService } from './knowledge-node.service';

describe('KnowledgeNodeService', () => {
  let service: KnowledgeNodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KnowledgeNodeService],
    }).compile();

    service = module.get<KnowledgeNodeService>(KnowledgeNodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
