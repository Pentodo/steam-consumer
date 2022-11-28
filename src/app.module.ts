import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';

@Module({
	imports: [CacheModule.register()],
	controllers: [AppController],
	providers: [
		PrismaService,
		{
			provide: APP_INTERCEPTOR,
			useClass: CacheInterceptor,
		},
	],
})
export class AppModule {}
