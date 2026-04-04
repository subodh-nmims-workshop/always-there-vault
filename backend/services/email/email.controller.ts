import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

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
        'DeadMan Demo'
      ),
    };
  }
}
