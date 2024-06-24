export class UpdateApiCallDto {
  running: boolean;

  duration: string;

  ok: boolean;

  result?: object | null;

  error?: object | null;
}
