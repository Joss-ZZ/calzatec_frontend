import { BaseDto } from './base.dto';

export interface CreateBodyDto {
	name: string;
}

export type UpdateBodyDto = Partial<CreateBodyDto>;

export type ResponseBodyDto = { bodyId: number } & CreateBodyDto & BaseDto;
