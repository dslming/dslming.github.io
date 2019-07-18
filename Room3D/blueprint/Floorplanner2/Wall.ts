import { Corner } from './Corner'

export class Wall {
  private id: string;

  constructor(private start: Corner, private end: Corner) {
    this.id = this.getUuid()
  }

  private getUuid(): string {
    return [this.start.getId(), this.end.getId()].join();
  }
}
