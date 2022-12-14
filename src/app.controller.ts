import { Controller, Get, Query } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { app, genre, sale } from '@prisma/client';

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

	@Get('apps/genres')
	async getAppsGenres(@Query('appids') appids: string): Promise<app[]> {
		const ids: Array<number> = appids.split(',').map((num) => Number(num));
		const query: any = {
			where: { appid: { in: ids } },
			include: { app_genres: { select: { genderid: true } } },
		};

		// prettier-ignore
		await this.prismaService.addAppGenres(
			(await this.prismaService.app.findMany(query))
				.map((app: any) => {
					if (!app.app_genres.length) {
						return app.appid;
					}
				})
				.filter((appid) => appid)
		);

		return this.prismaService.app.findMany(query);
	}

	@Get('genres')
	async getAllGenres(): Promise<genre[]> {
		return this.prismaService.genre.findMany();
	}

	@Get('sales')
	async getAllSales(): Promise<sale[]> {
		return this.prismaService.sale.findMany();
	}
}
