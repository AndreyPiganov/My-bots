import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSubjectDto {
    @ApiProperty({
        description: 'Линк зум конфренции для подключения к занятию по данному предмету',
        example: 'link Zoom конференции'
    })
    @IsString()
    @IsNotEmpty()
    link: string;

    @ApiProperty({
        description: 'Название предмета',
        example: 'Тестирование'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'линк контур конфренции для подключения к занятию по данному предмету',
        example: 'link Kontur конфренции'
    })
    konturLink?: string;
}
