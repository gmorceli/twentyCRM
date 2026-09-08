import { Logger } from '@nestjs/common';

import { type SendMailOptions } from 'nodemailer';

import { type EmailDriverInterface } from 'src/engine/core-modules/email/drivers/interfaces/email-driver.interface';

const RESEND_API_URL = 'https://api.resend.com/emails';

export class ResendDriver implements EmailDriverInterface {
  private readonly logger = new Logger(ResendDriver.name);

  constructor(private readonly apiKey: string) {}

  async send(sendMailOptions: SendMailOptions): Promise<void> {
    const payload = {
      from: sendMailOptions.from,
      to: Array.isArray(sendMailOptions.to)
        ? sendMailOptions.to
        : [sendMailOptions.to],
      subject: sendMailOptions.subject,
      html: sendMailOptions.html,
      text: sendMailOptions.text,
    };

    fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.text();

          this.logger.error(
            `Resend API error for '${sendMailOptions.to}': ${res.status} ${body}`,
          );
        } else {
          this.logger.log(
            `Email to '${sendMailOptions.to}' successfully sent via Resend`,
          );
        }
      })
      .catch((err) =>
        this.logger.error(
          `Failed to send email to '${sendMailOptions.to}': ${err}`,
        ),
      );
  }
}
