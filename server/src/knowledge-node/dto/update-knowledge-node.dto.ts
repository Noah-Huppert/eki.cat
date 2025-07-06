import { PartialType } from '@nestjs/mapped-types';
import { CreateKnowledgeNodeDto } from './create-knowledge-node.dto';

export class UpdateKnowledgeNodeDto extends PartialType(CreateKnowledgeNodeDto) {}
