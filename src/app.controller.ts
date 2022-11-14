import { Controller, Get, Param, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { app } from '@prisma/client';

@Controller()
export class AppController {
	constructor(private readonly prismaService: PrismaService) {}

	@Get('apps')
	async getAllApps(): Promise<app[]> {
		return this.prismaService.app.findMany();
	}
}
