import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

async function main() {
	try {
		const response = await axios.get('https://api.steampowered.com/ISteamApps/GetAppList/v2');
		await prisma.app.createMany({
			data: response.data.applist.apps,
			skipDuplicates: true,
		});
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
