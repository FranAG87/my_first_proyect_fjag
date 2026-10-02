import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'francisco.prueba@example.com' })
  email!: string;

  @ApiPropertyOptional({ example: 'Francisco de prueba' })
  name?: string;

  @ApiProperty({ example: 'Prueba123!' })
  password!: string;

  @ApiPropertyOptional({ example: '88888888' })
  telephone?: string;

  @ApiProperty({
    example: 1,
    description: 'ID del tenant al que pertenece el usuario',
  })
  tenantId!: number;
}