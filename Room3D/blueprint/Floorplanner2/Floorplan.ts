import { Model } from './Model'
import { Interactive } from './Interactive'
import { Draw } from './Draw'

export default class Floorplan {
  private model: Model
  private draw: Draw
  private interactive: Interactive

  constructor(canvasDomId: String) {
    this.model = new Model()
    let modelI = {
      getData: this.model.getData.bind(this.model),
      setData: this.model.setData.bind(this.model)
    }

    let canvasEle: any = document.querySelector(`#${canvasDomId}`)
    this.draw = new Draw(canvasEle, modelI)
    let drawI = {
      drawAll: this.draw.drawAll.bind(this.draw),
      drawGrid: this.draw.drawGrid.bind(this.draw)
    }

    this.interactive = new Interactive(canvasEle, modelI, drawI)
  }
}
