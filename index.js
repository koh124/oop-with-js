// -----オブジェクトリテラル-----
// オブジェクトにはgetter, setterをプロパティに定義できる
// オブジェクトのプロパティアクセスで、getが呼ばれる
// オブジェクトのプロパティに代入で、setが呼ばれる
const obj = {
  _value: 10,
  get value() {
    console.log('get value');
    return this._value;
  },
  set value(val) {
    console.log('Setting value to', val);
    this._value = val;
  }
}

// プロパティアクセスでgetが呼ばれる
console.log(obj.value)
// プロパティに代入でsetが呼ばれる
obj.value = 20;
// setterで代入した値が取得できる
console.log(obj.value)

// -----クラス-----
// オブジェクトリテラルを、クラス構文に移植する
class MyClass {
  constructor() {
    this._value = 10;
  }
  get value() {
    console.log('get value');
    return this._value;
  }
  set value(val) {
    console.log('Setting value to', val);
    this._value = val;
  }
}

const myClass = new MyClass();
console.log(myClass.value);
myClass.value = 20;
console.log(myClass.value);

// -----コンストラクタのパラメータ渡し-----
class MyClass2 {
  constructor(parameter) {
    this._value = parameter;
  }
  get value() {
    console.log('get value');
    return this._value;
  }
  set value(val) {
    console.log('Setting value to', val);
    this._value = val;
  }
}

const myClass2 = new MyClass2(20);
console.log(myClass2.value);
myClass2.value = 30;
console.log(myClass2.value);

// -----メソッド-----
// メソッドを定義する
class MyClass3 {
  constructor(parameter) {
    this._value = parameter;
  }
  method1() {
    console.log('method1');
  }
  method2() {
    console.log(this._value);
  }
}
const myClass3 = new MyClass3(10);
myClass3.method1();
myClass3.method2();

// -----継承-----
// 継承すると、親クラスのメソッドを呼び出せる
class ParentClass {
  parentMethod() {
    console.log('This is from the parent class');
  }
}

class ChildClass extends ParentClass {
  childMethod() {
    console.log('This is from the child class');
  }
}

const childClass = new ChildClass();
childClass.parentMethod();
childClass.childMethod();

// -----静的メソッド-----
// 静的クラスは、インスタンスを作らずに呼び出せる
class StaticClass {
  static staticMethod() {
    console.log('This is static method');
  }
}
StaticClass.staticMethod();

// -----継承した静的メソッド-----
class StaticClass2 {
  static staticMethod() {
    console.log('This is static method');
  }
}

class ChildStaticClass extends StaticClass2 {
  static childStaticMethod() {
    console.log('This is child static method');
  }
}

// 継承することで、親クラスの静的メソッドを呼び出せる
ChildStaticClass.staticMethod();
ChildStaticClass.childStaticMethod();

// -----プライベートフィールド-----
class WithPrivate {
  // プライベートプロパティ
  #privateField;

  constructor(value) {
    this.#privateField = value;
  }

  // プライベートプロパティのゲッター
  getPrivateField() {
    return this.#privateField;
  }

  // プライベートメソッド
  #privateMethod() {
    console.log('This is a private method');
  }

  // プライベートメソッドの呼び出し
  publicMethod() {
    return this.#privateMethod();
  }
}

const withPrivateField = new WithPrivate('private');
withPrivateField.getPrivateField();
withPrivateField.publicMethod();
// withPrivateField.#privateField; // privateアクセスなのでエラー
// withPrivateField.#privateMethod(); // privateアクセスなのでエラー

// -----パブリックフィールド-----
class WithPublicField {
  publicCount = 0;
  constructor() {
    // 呼び出しの度にインクリメント
    this.publicCount++;
  }
}

const withPublicField = new WithPublicField();
console.log("with public field: ", withPublicField.publicCount); // publicアクセスなのでOK

// -----静的フィールド-----
// クラスも静的フィールドを持つことができる
class WithStaticField {
  static staticCount = 0;
  constructor() {
    // インスタンス生成の度にインクリメント
    WithStaticField.staticCount++;
  }
}
console.log(WithStaticField.staticCount); // 0
const add1 = new WithStaticField();
console.log(WithStaticField.staticCount); // 1

// -----抽象クラス-----
// javascriptには抽象クラスはないが、抽象クラスのように振る舞うことができる
// 抽象クラスはインスタンスを生成できない
// 抽象クラスは継承して使う
class AbstractClass {
  constructor() {
    // new.targetはコンストラクタがnewで呼ばれた時に、そのコンストラクタ自身を参照する
    if (new.target === AbstractClass) {
      throw new Error('Cannot instantiate abstract class');
    }
  }
  abstractMethod() {
    throw new Error('Must override abstract method');
  }
}

// const abstractClass = new AbstractClass(); // エラー
// abstractClass.abstractMethod(); // エラー

// -----抽象クラスを継承する-----
// 抽象クラスを継承すると、抽象メソッドを実装しなければならない
// 抽象クラスを継承したクラスはインスタンスを生成できる
class ConcreteClass extends AbstractClass {
  abstractMethod() {
    console.log('This is abstract method');
  }
}

const concreteClass = new ConcreteClass();
concreteClass.abstractMethod(); // This is abstract method

// -----インターフェース-----
// インターフェースは、クラスの実装を強制する
class InterfaceClass {
  // オーバーライドせずに呼び出すと、エラーになる
  interfaceMethod() {
    throw new Error('Must override interface method');
  }
}

const interfaceClass = new InterfaceClass();
// interfaceClass.interfaceMethod(); // エラー

class ConcreteClass2 extends InterfaceClass {
  // インターフェースのメソッドをオーバーライドする
  interfaceMethod() {
    console.log('This is interface method');
  }
}

const concreteClass2 = new ConcreteClass2();
concreteClass2.interfaceMethod(); // This is interface method

// -----コンストラクタのオーバーライド-----
// superを使うことで、親クラスのコンストラクタを呼び出せる
class Parent {
  constructor() {
    console.log('Parent constructor');
  }
  sayHello() {
    console.log('Hello from parent');
  }
}

class Child extends Parent {
  constructor() {
    // 親クラスのコンストラクタを呼び出す
    super();
    console.log('Child constructor');
  }
  sayHello() {
    // 親クラスのメソッドを呼び出す
    super.sayHello();
    console.log('Hello from child');
  }
}

// インスタンスの呼び出しだけで、親クラスのコンストラクタとメソッドが呼ばれる
const child = new Child();
child.sayHello();

// -----superを呼び出さないとエラー-----
// superを呼び出さないと、エラーになる
class Parent2 {
  constructor() {
    console.log('Parent constructor');
  }
}

class Child2 extends Parent2 {
  constructor() {
    // superを呼び出さないとエラー
    // super();
    console.log('Child constructor');
  }
}

// const child2 = new Child2();
// ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor

// -----superを不要にする（非推奨）-----
// superを不要にする方法1. サブクラスのconstructorを省略する
class Parent3 {
  constructor() {
    console.log('Parent constructor');
  }
}

class Child3 extends Parent3 {
  // constructorを省略する
  // constructor() {
  //   super();
  //   console.log('Child constructor');
  // }
}

// サブクラスのコンストラクタを省略すると、デフォルトで親クラスのコンストラクタが呼ばれる
const child3 = new Child3();

// superを不要にする方法2. サブクラスのconstructorでreturnする
class Parent4 {
  constructor() {
    console.log('Parent constructor');
  }
}

class Child4 extends Parent4 {
  // コンストラクタでオブジェクトを返すことで、thisの初期化を省略する
  // superの呼び出しが不要になる
  constructor() {
    console.log('Child constructor');
    return { someProp: 'someValue' };
  }
}

const child4 = new Child4();
console.log(child4.someProp); // someValue
