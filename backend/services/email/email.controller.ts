import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('test-diagnose')
  async testDiagnose(@Query('email') email: string) {
    if (!email) {
      return {
        success: false,
        error: 'Email parameter is required. Usage: /api/email/test-diagnose?email=your-email@example.com',
      };
    }
    return await this.emailService.diagnoseSmtp(email);
  }

  @Post('welcome')
  async sendWelcome(@Body() body: { email: string; name: string }) {
    return {
      success: await this.emailService.sendWelcomeEmail(body.email, body.name),
    };
  }

  @Post('beneficiary-added')
  async sendBeneficiaryAdded(
    @Body() body: { email: string; name: string; ownerName: string },
  ) {
    return {
      success: await this.emailService.sendBeneficiaryAddedEmail(
        body.email,
        body.name,
        body.ownerName,
      ),
    };
  }

  @Post('heartbeat-reminder')
  async sendHeartbeatReminder(
    @Body() body: { email: string; name: string; daysOverdue: number },
  ) {
    return {
      success: await this.emailService.sendHeartbeatReminderEmail(
        body.email,
        body.name,
        body.daysOverdue,
      ),
    };
  }

  @Post('test-demo')
  async sendTestDemo(@Body() body: { email: string }) {
    console.log('Sending test demo mail to:', body.email);
    return {
      success: await this.emailService.sendBeneficiaryAddedEmail(
        body.email,
        'Subodh',
        'Always There Demo'
      ),
    };
  }
}
