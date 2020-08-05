import * as exceljs from 'exceljs'

import RowElement from './Row'
import { Node, IRowGroupRenderContext, IWorksheetChildrenRenderResult } from '../interfaces'
import { filterChildren } from '../utils/filterChildren';

export interface IRowGroupOnRender {
  (rowGroupElement: RowGroupElement, result: IWorksheetChildrenRenderResult, context: IRowGroupRenderContext): void
}

export interface IRowGroupAttributes {
  onRender?: IRowGroupOnRender
}

type Row = RowElement | RowGroupElement

function isRow(node: Node) {
  return RowElement.isRowElement(node) || RowGroupElement.isRowGroupElement(node)
}

export class RowGroupElement {
  public type: 'rowGroup' = 'rowGroup'
  public options: IRowGroupAttributes

  public rowsAndGroups: Array<RowElement | RowGroupElement> = []

  static isRowGroupElement(instance: any): instance is RowGroupElement {
    return instance instanceof RowGroupElement
  }

  constructor(attributes: IRowGroupAttributes, children: Node[]) {
    this.options = attributes

    this.rowsAndGroups = filterChildren<Row>(children, isRow)
  }
}

export default RowGroupElement
