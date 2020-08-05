import { Node } from '../interfaces'

type Predicate = (node: Node) => boolean

export function filterChildren<T>(children: Node[], predicate: Predicate): T[] {
  const elements = [];

  function filter(items: Node[]) {
    return items.reduce<T[]>((acc, curr) => {
      if (Array.isArray(curr)) {
        filter(items)
      }

      if (predicate(curr)) {
        acc.push(curr as unknown as T)
      }

      return acc
    }, elements)
  }

  return filter(children)
}
