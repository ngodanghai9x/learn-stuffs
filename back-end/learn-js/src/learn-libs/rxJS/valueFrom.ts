import {
  AsyncSubject,
  Observable,
  firstValueFrom,
  interval,
  lastValueFrom,
  take,
} from "rxjs";

const observer = {
  next: (val: any) => console.log(val),
  error: (err: any) => console.log(err),
  complete: () => console.log("done"),
};

async function example1() {
  console.log(`${new Date()} example1`);
  const source$ = interval(500).pipe(take(5));
  const firstNumber = await firstValueFrom(source$);
  console.log(`${new Date()} The final number is ${firstNumber}`);
  const finalNumber = await lastValueFrom(source$);
  console.log(`${new Date()} The final number is ${finalNumber}`);
  // await example2();
}

async function example2() {
  console.log(`${new Date()} example2`);
  const observable = new Observable((observer) => {
    [1, 2, 3, 4, 5].forEach((val) => {
      observer.next(val);
    });
    observer.complete();
  });
  const firstNumber = await firstValueFrom(observable);
  console.log(`${new Date()} The final number is ${firstNumber}`);
  const finalNumber = await lastValueFrom(observable);
  console.log(`${new Date()} The final number is ${finalNumber}`);
}

async function example3() {
  console.log(`${new Date()} example3`);
  const subject = new AsyncSubject();
  [1, 2, 3, 4, 5].forEach((val) => {
    subject.next(val);
  });
  subject.complete();
  subject.subscribe(observer);
}

example3();
