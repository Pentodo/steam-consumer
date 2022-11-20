import { PrismaClient, genre, app, app_details, app_genres } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

async function main() {
	const appListUrl = 'https://api.steampowered.com/ISteamApps/GetAppList/v2';
	const appDetailsUrl = 'http://store.steampowered.com/api/appdetails/?appids=';

	try {
		const appsResponse = await axios.get(appListUrl);

		const apps: Array<app> = appsResponse.data.applist.apps;

		const detailsResponses: Array<any> = (
			await Promise.all(
				apps
					.slice(0, 100)
					.map(async (app) => (await axios.get(appDetailsUrl + app.appid)).data[app.appid]?.data)
			)
		).filter((app) => app);

		const genres: Array<genre> = [];
		const apps_genres: Array<app_genres> = [];

		detailsResponses
			.filter((app) => app.genres)
			.forEach((app) => {
				app.genres.forEach((genre: any) => {
					const id = Number(genre.id);

					genres.push({ id, description: genre.description });
					apps_genres.push({ appid: app.steam_appid, genderid: id });
				});
			});

		const apps_details: Array<app_details> = detailsResponses.map((app) => ({
			appid: app.steam_appid,
			type: app.type,
			release_date: app.release_date.date,
			price: app.is_free ? 0 : app.price_overview?.initial || -1,
			description: app.short_description,
			header: app.header_image,
			background: app.background,
		}));

		await prisma.app.createMany({ data: apps, skipDuplicates: true });
		await prisma.genre.createMany({ data: genres, skipDuplicates: true });

		await prisma.app_details.createMany({ data: apps_details, skipDuplicates: true });
		await prisma.app_genres.createMany({ data: apps_genres, skipDuplicates: true });
	} catch (error: any) {
		console.error(error.message);
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
