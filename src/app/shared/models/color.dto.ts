import { BaseDto } from './base.dto';

export interface CreateColorDto {
	name: string;
	value: string;
}

export type UpdateColorDto = Partial<CreateColorDto>;

export type ResponseColorDto = { colorId: number } & CreateColorDto & BaseDto;
