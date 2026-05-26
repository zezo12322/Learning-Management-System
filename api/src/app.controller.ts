import { Controller, Get } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

@ApiTags('Health')
@Controller()
export class AppController {
  @Get('health')
  @ApiOperation({ summary: 'Health Check' })
  health() {
    return {
      status: 'ok',
      message: 'OptimaTech LMS API شغالة ✅',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    }
  }
}
