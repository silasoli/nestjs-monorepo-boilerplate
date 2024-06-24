import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BodyEmailDto, TemplateEmailDto } from '../dto/body-email.dto';
import * as ejs from 'ejs';
import * as fs from 'fs';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as path from 'path';

@Injectable()
export class MailService {
  transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor(private readonly config: ConfigService) {
    const mailHost = config.get('MAIL_HOST');

    if (!mailHost) throw new Error('Host não encontrado');

    console.log(config.get('MAIL_HOST'))

    this.transporter = nodemailer.createTransport({
      host: config.get('MAIL_HOST'),
      port: Number.parseInt(config.get('MAIL_PORT')),
      secure: config.get('MAIL_SECURE') == 'true',
      auth: {
        user: config.get('MAIL_USER'),
        pass: config.get('MAIL_PASSWORD'),
      },
      tls: { rejectUnauthorized: false },
    });
  }

  async sendEmail(
    message: BodyEmailDto,
  ): Promise<SMTPTransport.SentMessageInfo> {
    const mailMessage: Mail.Options = {
      from: this.config.get('MAIL_FROM'),
      to: message.to,
      subject: message.subject,
      html: message.body,
    };

    return this.transporter.sendMail(mailMessage);
  }

  async sendTemplateEmail(
    message: TemplateEmailDto,
  ): Promise<SMTPTransport.SentMessageInfo> {
    const filename = path.join(
      this.config.get('MAIL_TEMPLATE_PATH'),
      `${message.template}.ejs`,
    );

    if (!fs.existsSync(filename)) throw new Error('Template não encontrado');

    const templateString = fs.readFileSync(filename, { encoding: 'utf-8' });

    const body = ejs.render(templateString, { context: message.context });

    return this.sendEmail({ ...message, body });
  }
}
