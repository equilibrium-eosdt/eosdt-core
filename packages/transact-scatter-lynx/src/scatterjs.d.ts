// tslint:disable:member-access
// tslint:disable:max-classes-per-file

declare module "@scatterjs/eosjs2" {
  class Plugin {
    constructor(...args: any[]);
    isSignatureProvider(): any;
    isValid(): any;
    static fromJson(b: any): any;
    static placeholder(): any;
  }

  export default Plugin;
}

declare module "@scatterjs/lynx" {
  class Plugin {
    constructor(...args: any[]);
    isSignatureProvider(): any;
    isValid(): any;
    static fromJson(b: any): any;
    static placeholder(): any;
  }

  export default Plugin;
}
