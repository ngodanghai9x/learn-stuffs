import asyncio
from typing import Any

async def calc_sth(x, y):
    await asyncio.sleep(1)
    print(f"Result: {x + y}")

# *args nhận danh sách các tham số vị trí (positional arguments).
# **kwargs nhận danh sách các tham số từ khóa (keyword arguments).
async def wrapper_func(callback, *args, **kwargs) -> Any | None:
    try:
        print("Wrapper func")
        if asyncio.iscoroutinefunction(callback):  # Kiểm tra nếu là async function
            return await callback(*args, **kwargs)
        else:
            return callback(*args, **kwargs)
    except Exception as e:
        print(f"Wrapper func with error: {e}")

        return None

async def main():
    await wrapper_func(calc_sth, 3, 4)

if __name__ == "__main__":
    asyncio.run(main())