export abstract class IredisDriver {
  abstract setValue(key: string, value: any);

  abstract getValue(key: string): Promise<any>;
}
