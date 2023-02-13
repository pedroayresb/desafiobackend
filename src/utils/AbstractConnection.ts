export default abstract class AbstractConnection<T> {
  abstract connect(): T;
}
