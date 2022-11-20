import { Controller, Get, Query } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { app, genre } from '@prisma/client';

@Controller()
export class AppController {
	constructor(private readonly prismaService: PrismaService) {}

	@Get(['', 'apps'])
	async getAllApps(): Promise<app[]> {
		return this.prismaService.app.findMany();
	}

	@Get('apps/details')
	async getAppsDetails(@Query('appids') appids: string): Promise<app[]> {
		const ids: Array<number> = appids.split(',').map((num) => Number(num));
		const query: any = {
			where: { appid: { in: ids }, app_details: null },
			include: { app_details: true },
		};

		await this.prismaService.addAppDetails(
			(await this.prismaService.app.findMany(query)).map((app) => app.appid)
		);

		delete query.where.app_details;
		return this.prismaService.app.findMany(query);
	}

	@Get('genres')
	async getAllGenres(): Promise<genre[]> {
		return this.prismaService.genre.findMany();
	}
}
