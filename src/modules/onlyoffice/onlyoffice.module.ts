import {Module} from '@nestjs/common';

import {OnlyofficeService} from './onlyoffice.service';
import {OnlyofficeController} from "#modules/onlyoffice/onlyoffice.controller";
import {HttpModule} from "@nestjs/axios";
import {JwtService} from "@nestjs/jwt";

@Module({
  controllers: [OnlyofficeController],
  providers: [OnlyofficeService,JwtService],
  imports: [HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
  })],
})
export class OnlyofficeModule {
}
