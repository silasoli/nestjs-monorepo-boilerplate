export class IEmailMessage {
  to: string;
  subject: string;
}

export class BodyEmailDto extends IEmailMessage {
  body: string;
}

export class TemplateEmailDto extends IEmailMessage {
  template: string;
  context: any;
}
