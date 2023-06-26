// https://www.typescriptlang.org/docs/handbook/utility-types.html
interface Obj {
  abc: string;
  a123: number;
}
class Clazz {
  x = 0;
  y = 0;
  cFunc() {}
  constructor(p1: string, p2: number, p3) {}
}
function func(p1: string, p2: number, p3?) {
  return "abc";
}
declare function func2(p1: string, p2: number, p3?): string;

type myUnion = string | number | null | undefined;
type Type = myUnion;

type Keys = keyof Clazz;
type Keys1 = keyof InstanceType<typeof Clazz>;
type Keys2 = keyof Obj;
var a: Keys1 = "cFunc";
var b: Keys2 = "a123";

// Partial<Type>
// Required<Type>
// Readonly<Type>
// Record<Keys, Type>
// Pick<Type, Keys>
// Omit<Type, Keys>

// Exclude<UnionType, ExcludedMembers>
// Extract<Type, Union>

// NonNullable<Type>
type myNonNullable = NonNullable<myUnion>;
type myParameters = Parameters<typeof func>;
type myParameters2 = Parameters<typeof func2>;
func2("1", 1); // will throw error because func2 just declare but has not a expression (instance)
// ConstructorParameters<Type>
type myConstructorParameters1 = ConstructorParameters<ErrorConstructor>;
type myConstructorParameters2 = ConstructorParameters<typeof Clazz>;
// ReturnType<Type>
type myReturnType = ReturnType<typeof func>;
// InstanceType<Type>
type myInstanceType = InstanceType<typeof Clazz>;

// ThisParameterType<Type>
// OmitThisParameter<Type>
// ThisType<Type>

// Intrinsic String Manipulation Types
// Uppercase<StringType>
// Lowercase<StringType>
// Capitalize<StringType>
// Uncapitalize<StringType>

type PropEventSource<Type> = {
  on(
    eventName: `${string & keyof Type}Changed`,
    callback: (newValue: any) => void
  ): void;
};

/// Create a "watched object" with an 'on' method
/// so that you can watch for changes to properties.
declare function makeWatchedObject<Type>(
  obj: Type
): Type & PropEventSource<Type>;
const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
});

person.on("firstNameChanged", (newValue) => {
  console.log(`firstName was changed to ${newValue}!`);
});
