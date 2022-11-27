import { PrismaClient, app, genre, app_details, app_genres, sale } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

async function main() {
	const appListUrl = 'https://api.steampowered.com/ISteamApps/GetAppList/v2';
	const appDetailsUrl = 'http://store.steampowered.com/api/appdetails/?appids=';

	const featuredUrl = 'https://store.steampowered.com/api/featured/?currency=BRL';
	const featuredCategoriesUrl = 'https://store.steampowered.com/api/featuredcategories/?currency=BRL';

	const getAppDetails = (obj: any): app_details => ({
		appid: obj.steam_appid,
		type: obj.type,
		release_date: obj.release_date.date,
		price: obj.is_free ? 0 : obj.price_overview?.initial || -1,
		description: obj.short_description,
		header: obj.header_image,
		background: obj.background,
	});

	const filterSales = (obj: any) => obj.type === 0 && obj.original_price && obj.discount_percent;
	const getSale = (obj: any): sale => ({
		appid: obj.id,
		discount_percent: obj.discount_percent,
		original_price: obj.original_price,
		final_price: obj.final_price,
	});

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

		const apps_details: Array<app_details> = detailsResponses.map(getAppDetails);

		const featuredResponses = await Promise.all([
			axios.get(featuredUrl),
			axios.get(featuredCategoriesUrl),
		]);

		const featured: Array<sale> = [
			...featuredResponses[0].data.featured_win.filter(filterSales).map(getSale),
			...featuredResponses[1].data.specials.items.filter(filterSales).map(getSale),
		];

		const sales = featured.filter((sale) => sale.original_price && sale.discount_percent);

		await Promise.all([
			prisma.app.createMany({ data: apps, skipDuplicates: true }),
			prisma.genre.createMany({ data: genres, skipDuplicates: true }),
		]);

		await Promise.all([
			prisma.sale.createMany({ data: sales, skipDuplicates: true }),
			prisma.app_details.createMany({ data: apps_details, skipDuplicates: true }),
			prisma.app_genres.createMany({ data: apps_genres, skipDuplicates: true }),
		]);
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
