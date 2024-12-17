import asyncio

async def sample_task():
    await asyncio.sleep(1)
    return "Task completed!"

# Tạo event loop thủ công
loop = asyncio.new_event_loop()
asyncio.set_event_loop(loop)

try:
    result = loop.run_until_complete(sample_task())
    print(result)
finally:
    loop.close()
