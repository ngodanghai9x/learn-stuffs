import { retryPromise } from "./retryPromise";

interface IPromise {
  callTime: number;
  message: string;
}

class CasePromise {
  callTime: { [key: string]: number } = {};

  promise(time: number, key: string): Promise<IPromise> {
    if (!this.callTime[key]) this.callTime[key] = 1;

    return new Promise((res, rej) => {
      if (time === this.callTime[key]) {
        res({
          callTime: this.callTime[key],
          message: "ok",
        });
        this.callTime[key] = 1;
        return;
      }

      rej({
        callTime: this.callTime[key],
        message: "fail",
      });
      this.callTime[key]++;
      return;
    });
  }
}

describe("test retryPromise", () => {
  test("retry 3 time then success", async () => {
    const casePromise = new CasePromise();
    try {
      const data = await retryPromise<IPromise>(
        () => casePromise.promise(4, "try_success"),
        5,
        2
      );
      expect(data.callTime - 1).toBe(3);
      expect(data.message).toBe("ok");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      expect(err.message).toBe("ok");
    }
  });

  test("retry 5 time then fail", async () => {
    const casePromise = new CasePromise();
    try {
      const data = await retryPromise<IPromise>(
        () => casePromise.promise(8, "try_fail"),
        5,
        2
      );
      expect(data.message).toBe("fail");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      expect(err.callTime - 1).toBe(5);
      expect(err.message).toBe("fail");
    }
  });
});
