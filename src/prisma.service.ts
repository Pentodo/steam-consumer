import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient, app_details } from '@prisma/client';
import axios from 'axios';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	async onModuleInit() {
		await this.$connect();
	}

	async enableShutdownHooks(app: INestApplication) {
		this.$on('beforeExit', async () => {
			await app.close();
		});
	}

	async addAppDetails(appids: Array<number>) {
		const url = 'http://store.steampowered.com/api/appdetails/?appids=';
		const responses: Array<any> = (
			await Promise.all(appids.map(async (appid) => (await axios.get(url + appid)).data[appid]?.data))
		).filter((app) => app);

		const apps_details: Array<app_details> = responses.map((app) => ({
			appid: app.steam_appid,
			type: app.type,
			release_date: app.release_date.date,
			price: app.is_free ? 0 : app.price_overview?.initial || -1,
			description: app.short_description,
			header: app.header_image,
			background: app.background,
		}));

		return this.app_details.createMany({ data: apps_details, skipDuplicates: true });
	}
}
