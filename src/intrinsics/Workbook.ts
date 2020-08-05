import WorksheetElement from './Worksheet'
import { Node } from '../interfaces'
import { filterChildren } from '../utils/filterChildren';

export type IWorkbookAttributes = Partial<{
  creator: string
  lastModifiedBy: string
  created: Date
  modified: Date
  lastPrinted: Date
}>

function isWorksheet(node: Node) {
  return WorksheetElement.isWorksheetElement(node)
}

type IWorkbookParameter = keyof IWorkbookAttributes

const workbookParameters: IWorkbookParameter[] = [
  'creator',
  'created',
  'lastModifiedBy',
  'lastPrinted',
  'modified',
]

export class Workbook {
  public type: 'workbook' = 'workbook'
  private options: IWorkbookAttributes
  private worksheets: WorksheetElement[]

  static isWorkbookElement(instance: any): instance is Workbook {
    return instance instanceof Workbook
  }

  constructor(attributes: IWorkbookAttributes, children: Node[]) {
    this.options = attributes

    this.worksheets = filterChildren<WorksheetElement>(children, isWorksheet)
  }

  public getOptions() {
    const validKeys = Object.keys(this.options).filter<IWorkbookParameter>(
      (key: IWorkbookParameter): key is IWorkbookParameter =>
        Boolean(workbookParameters.indexOf(key) + 1)
    )

    return validKeys.reduce<IWorkbookAttributes>((acc, curr) => {
      if (this.options[curr]) {
        acc[curr] = this.options[curr]
      }

      return acc
    }, {})
  }

  public getWorksheets() {
    return this.worksheets
  }
}

export default Workbook
