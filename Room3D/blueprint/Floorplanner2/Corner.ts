import Utils from '../core/utils'

export class Corner {
  private id: string

  constructor(private x: number, private y: number, id?: string, ) {
    this.id = id || Utils.guid()
  }

  public getId(): string {
    return this.id
  }
}
