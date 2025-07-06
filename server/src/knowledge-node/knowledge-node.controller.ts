import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KnowledgeNodeService } from './knowledge-node.service';
import { CreateKnowledgeNodeDto } from './dto/create-knowledge-node.dto';
import { UpdateKnowledgeNodeDto } from './dto/update-knowledge-node.dto';

@Controller('knowledge-node')
export class KnowledgeNodeController {
  constructor(private readonly knowledgeNodeService: KnowledgeNodeService) {}

  @Post()
  create(@Body() createKnowledgeNodeDto: CreateKnowledgeNodeDto) {
    return this.knowledgeNodeService.create(createKnowledgeNodeDto);
  }

  @Get()
  findAll() {
    return this.knowledgeNodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.knowledgeNodeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKnowledgeNodeDto: UpdateKnowledgeNodeDto) {
    return this.knowledgeNodeService.update(+id, updateKnowledgeNodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.knowledgeNodeService.remove(+id);
  }
}
