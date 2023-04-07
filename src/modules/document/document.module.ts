import {Module} from '@nestjs/common';

import {DocumentService} from './document.service';
import {OnlyofficeService} from '../onlyoffice/onlyoffice.service';
import {DocumentController} from "#modules/document/document.controller";
import {HttpModule} from "@nestjs/axios";
import {JwtService} from "@nestjs/jwt";

@Module({
  controllers: [DocumentController],
  providers: [DocumentService, OnlyofficeService, JwtService],
  imports: [HttpModule]
})
export class DocumentModule {
}
