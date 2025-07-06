import { Injectable } from '@nestjs/common';
import { CreateKnowledgeNodeDto } from './dto/create-knowledge-node.dto';
import { UpdateKnowledgeNodeDto } from './dto/update-knowledge-node.dto';

@Injectable()
export class KnowledgeNodeService {
  create(createKnowledgeNodeDto: CreateKnowledgeNodeDto) {
    return 'This action adds a new knowledgeNode';
  }

  findAll() {
    return `This action returns all knowledgeNode`;
  }

  findOne(id: number) {
    return `This action returns a #${id} knowledgeNode`;
  }

  update(id: number, updateKnowledgeNodeDto: UpdateKnowledgeNodeDto) {
    return `This action updates a #${id} knowledgeNode`;
  }

  remove(id: number) {
    return `This action removes a #${id} knowledgeNode`;
  }
}
