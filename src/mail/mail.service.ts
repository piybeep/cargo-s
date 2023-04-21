import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendNewApplicationMail(code: string) {
    return await this.mailerService
      .sendMail({
        to: this.configService.get<string>('MAIL_TO'),
        subject: 'Новая заявка',
        template: join(__dirname, '../mail/templates/', 'resetCode.tmp.hbs'),
        context: {
          code,
        },
      })
      .catch((e) => {
        console.log(e);

        throw new HttpException(
          `Ошибка работы почты: ${JSON.stringify(e)}`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      });
  }
}
