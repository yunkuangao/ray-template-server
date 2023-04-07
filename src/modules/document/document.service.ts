import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { OnlyofficeService } from '../onlyoffice/onlyoffice.service';
import { DocumentForceSave, DocumentInfo } from '#entities/document.entity';
import {
  DocumentForceSaveDto,
  DocumentInfoDto,
} from '#modules/document/document.dto';
import Config, { AppConfig } from '#configs';

@Injectable()
export class DocumentService {
  constructor(
    @Inject(`CONFIGURATION(${Config.App})`)
    private readonly appConfig: AppConfig,
    private onlyofficeService: OnlyofficeService,
  ) {}

  async forceSave(
    body: DocumentForceSaveDto,
  ): Promise<DocumentForceSave | null> {
    // 1、保存业务数据
    // 2、调用 Onlyoffice 的强制保存，实际业务中可能还有更多的业务操作，可根据实际情况删改
    const { id: userdata, key, useJwtEncrypt } = body;
    const data = await this.onlyofficeService.forceSave({
      key,
      // 将业务参数传给 Onlyoffice 服务，当回调里面存在多个请求时，标识符将有助于区分特定请求
      userdata,
      useJwtEncrypt,
    });
    // 保存成功
    if (data.error === 0) {
      return null;
    }
    throw new HttpException(data, HttpStatus.OK);
  }

  async documentInfo(
    query: DocumentInfoDto,
    email: string,
    uuid: string,
  ): Promise<DocumentInfo> {
    const editorConfig = this.onlyofficeService.editorDefaultConfig();
    // 添加文档
    editorConfig.document = {
      ...editorConfig.document,
      fileType: 'docx',
      key: query.key,
      url: `${this.appConfig.host}/static/${query.key}`,
      title: '测试文档.docx',
    };
    // 添加用户信息
    editorConfig.editorConfig.user = {
      group: 'none',
      id: uuid,
      name: email,
    };
    // 添加插件配置
    if (query.usePlugin === 'y') {
      editorConfig.editorConfig.plugins = {
        autostart: [],
        pluginsData: [
          `${this.appConfig.host}/static/plugins/plugin-hello/config.json`,
        ],
      };
    }
    // 加密编辑器参数
    if (query.useJwtEncrypt === 'y') {
      this.onlyofficeService.signJwt(editorConfig);
    }
    return {
      id: 1,
      remarks: '业务字段',
      editorConfig,
    };
  }

  async excelInfo(
    query: DocumentInfoDto,
    email: string,
    uuid: string,
  ): Promise<DocumentInfo> {
    const editorConfig = this.onlyofficeService.editorDefaultConfig();
    // 添加文档
    editorConfig.document = {
      ...editorConfig.document,
      fileType: 'xlsx',
      key: query.key,
      url: `${this.appConfig.host}/static/${query.key}`,
      title: '测试表格.xlsx',
    };
    // 修改文档宽度
    editorConfig.width = '100%';
    // 修改编辑器类型
    editorConfig.documentType = 'cell';
    // 添加用户信息
    editorConfig.editorConfig.user = {
      group: 'none',
      id: uuid,
      name: email,
    };
    // 加密编辑器参数
    if (this.appConfig.onlyoffice.jwtEnable == 'true') {
      this.onlyofficeService.signJwt(editorConfig);
    }
    return {
      id: 1,
      remarks: '业务字段',
      editorConfig,
    };
  }
}
