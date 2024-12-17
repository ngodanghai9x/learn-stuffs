import asyncio

async def fetch_data(silent=False):
    print("Fetching data...") if not silent else None
    await asyncio.sleep(1)
    print("Data fetched!") if not silent else None
    return {"data": "sample data"}

async def runPromise():
    print("🐍 File: asyncio/basic.py | Line: 10 | undefined ~ runPromise")
    # Tạo một tác vụ background
    task = asyncio.create_task(fetch_data())

    print("Doing other work in the main function...")
    await asyncio.sleep(0.5)

    # Đợi task hoàn thành (nếu cần)
    await task

asyncio.run(runPromise())

async def notRunPromise():
    print("🐍 File: asyncio/basic.py | Line: 23 | undefined ~ notRunPromise")
    # Gán coroutine vào biến
    promise = fetch_data()  # Coroutine chưa chạy ngay lúc này
    print("Coroutine created but not started.")
    
    # Thực hiện một tác vụ khác trước khi await
    print("Doing other work...")
    await asyncio.sleep(0.5)
    print("Now awaiting the promise...")

    # Await để lấy kết quả từ coroutine
    result = await promise
    print("Result:", result)

asyncio.run(notRunPromise())

async def runParallel():
    print("🐍 File: asyncio/basic.py | Line: 40 | undefined ~ runParallel")
    promise1 = fetch_data(silent=True)
    promise2 = fetch_data(silent=True)
    # Chạy song song với asyncio.gather
    results = await asyncio.gather(promise1, promise2)
    print(results)

asyncio.run(runParallel())


