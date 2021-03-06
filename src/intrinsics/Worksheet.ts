import RowElement from './Row'
import RowGroupElement from './RowGroup'
import HeaderElement from './Header'

import { Node } from '../interfaces'
import { filterChildren } from '../utils/filterChildren';

export interface IWorksheetAttributes {
  name: string
  defaultRowHeight?: number
}

type Row = RowElement | RowGroupElement

function isRow(node: Node) {
  return RowElement.isRowElement(node) || RowGroupElement.isRowGroupElement(node)
}

export class WorksheetElement {
  public type: 'worksheet' = 'worksheet'
  private options: IWorksheetAttributes
  private rowsAndGroups: Array<RowElement | RowGroupElement>
  private header: HeaderElement

  static isWorksheetElement(instance: any): instance is WorksheetElement {
    return instance instanceof WorksheetElement
  }

  constructor(attributes: IWorksheetAttributes, children: Node[]) {
    this.options = attributes

    const filteredValues = filterChildren<Row>(children, isRow)
    const header = children.find(
      (node): node is HeaderElement => HeaderElement.isHeaderElement(node)
    )

    if (!header) {
      throw new Error('Header is not specified')
    }

    this.header = header

    this.rowsAndGroups = filteredValues
  }

  public getName() {
    return this.options.name
  }

  public getOptions() {
    return {
      name: this.options.name,
      defaultRowHeight: this.options.defaultRowHeight
    }
  }

  public getChildren() {
    return this.rowsAndGroups
  }

  public getRows() {
    return this.flat(this.rowsAndGroups)
  }

  private flat(children: Array<RowElement | RowGroupElement>): RowElement[] {
    return children.reduce<RowElement[]>((acc, curr) => {
      if (RowGroupElement.isRowGroupElement(curr)) {
        const flattenRows = this.flat(curr.rowsAndGroups)

        return [...acc, ...flattenRows]
      }

      return [...acc, curr]
    }, [])
  }

  public getHeader() {
    return this.header
  }
}

export default WorksheetElement
