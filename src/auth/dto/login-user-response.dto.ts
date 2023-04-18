import { ApiProperty } from '@nestjs/swagger';

export class LoginUserResponseDto {
  @ApiProperty({
    type: 'string',
    example: '26d30416-170e-4710-adaa-013216a2f48d',
    description: 'Id пользователя',
  })
  id: string;
  @ApiProperty({
    type: 'string',
    example: 'test@gmail.com',
    description: 'Email пользователя',
  })
  email: string;
}
