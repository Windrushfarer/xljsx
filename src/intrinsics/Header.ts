import * as exceljs from 'exceljs'

import ColumnElement from './Column'
import { Node } from '../interfaces'
import { filterChildren } from '../utils/filterChildren';

export interface IHeaderAttributes extends Partial<exceljs.Style> {}

function isColumn(node: Node) {
  return ColumnElement.isColumnElement(node)
}

export class HeaderElement {
  public type: 'header' = 'header'
  public options: IHeaderAttributes
  public columns: ColumnElement[]

  static isHeaderElement(instance: any): instance is HeaderElement {
    return instance instanceof HeaderElement
  }

  constructor(attributes: IHeaderAttributes, children: Node[]) {
    this.options = attributes

    this.columns = filterChildren<ColumnElement>(children, isColumn)
  }
}

export default HeaderElement
