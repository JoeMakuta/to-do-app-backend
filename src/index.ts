interface TypesSample {
  mame: string;
}

export default class TestClass {
  constructor() {
    console.log('test');
  }

  private _typesSample: TypesSample = { mame: 'test' };
}
