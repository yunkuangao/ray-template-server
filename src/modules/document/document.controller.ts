import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DocumentService } from './document.service';
import { DocumentInfo } from '#entities/document.entity';
import {
  DocumentForceSaveDto,
  DocumentInfoDto,
} from '#modules/document/document.dto';
import { JWTUserGuard } from '#modules/auth/guards/jwt-user.guard';
import { User } from 'nestjs-xion/decorator';
import { JWTUserPayload } from '#modules/auth/strategies/jwt.strategy';

@ApiTags('Document')
@JWTUserGuard()
@Controller('document')
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Post('forceSave')
  @ApiOperation({
    summary: '强制保存文档',
    description:
      '通过调用 Onlyoffice 提供的指令接口间接保存文件，最终文件的报错操作还是在 editorConfig.callbackUrl 所指定的接口里面完成的',
  })
  async forceSave(@Body() body: DocumentForceSaveDto): Promise<any> {
    return await this.documentService.forceSave(body);
  }

  @Get('documentInfo')
  @ApiOperation({
    summary: '获取文档信息',
    description: '仅构造 Onlyoffice 文档编辑器显示和保存需要的必要信息',
  })
  async documentInfo(
    @User() { email, uuid }: JWTUserPayload,
    @Query() query: DocumentInfoDto,
  ): Promise<DocumentInfo> {
    return await this.documentService.documentInfo(query, email, uuid);
  }

  @Get('excelInfo')
  @ApiOperation({
    summary: '获取表格信息',
    description: '仅构造 Onlyoffice 表格编辑器显示和保存需要的必要信息',
  })
  async excelInfo(
    @User() { email, uuid }: JWTUserPayload,
    @Query() query: DocumentInfoDto,
  ): Promise<DocumentInfo> {
    return await this.documentService.excelInfo(query, email, uuid);
  }
}
