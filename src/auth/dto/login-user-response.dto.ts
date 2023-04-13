import { ApiProperty } from '@nestjs/swagger';

export class LoginUserResponseDto {
  @ApiProperty({
    type: 'string',
    example: '26d30416-170e-4710-adaa-013216a2f48d',
    description: 'id пользователя',
  })
  id: string;
  @ApiProperty({
    type:'string',
    example: 'test@gmail.com',
    description: 'email пользователя',
  })
  email: string;
}
