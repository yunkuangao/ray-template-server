import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class WebCreateTodoDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Remember to buy 3 eggs before tonight' })
  readonly message!: string;
}
