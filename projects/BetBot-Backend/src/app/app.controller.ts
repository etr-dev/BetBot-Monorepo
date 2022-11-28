import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HeaderApiKeyStrategy } from 'src/auth/auth-header-api-key.strategy';
import { AppService } from './app.service';

@Controller()
  @UseGuards(AuthGuard('api-key'))
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  health(): string {
    return this.appService.health();
  }
}
