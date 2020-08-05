import * as exceljs from 'exceljs'
import { IRowRenderContext, IRowRenderResult, Node } from '../interfaces'
import { filterChildren } from '../utils/filterChildren';
import CellElement from './Cell'

export interface IRowOnRender {
  (rowElement: RowElement, result: IRowRenderResult, context: IRowRenderContext): void
}

export interface IRowAttributes extends Partial<exceljs.Style> {
  onRender?: IRowOnRender
}

function isCellElement(node: Node) {
  return CellElement.isCellElement(node)
}

class RowElement {
  public type: 'row' = 'row'
  public options: IRowAttributes
  private cells: CellElement[]

  static isRowElement(instance: any): instance is RowElement {
    return instance instanceof RowElement
  }

  constructor(attributes: IRowAttributes, children: Node[]) {
    this.options = attributes

    this.cells = filterChildren<CellElement>(children, isCellElement)
  }

  public getCells() {
    return this.cells
  }
}

export default RowElement
