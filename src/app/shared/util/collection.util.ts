export default class CollectionUtil {
  static removeIndex(collection: Array<any>, index: number) {
    collection.splice(index, 1);
  }

  static getLastElement(collection: Array<any>) {
    if (!collection || collection.length == 0) return null;
    return collection[collection.length - 1];
  }

  static insertToFirstIndex(collection: Array<any>, element: any) {
    if (collection) {
      collection.unshift(element);
    }
  }
}
