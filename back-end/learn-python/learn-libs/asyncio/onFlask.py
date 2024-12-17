from flask import Flask, jsonify
import asyncio

app = Flask(__name__)

# Hàm async để thực hiện một tác vụ bất đồng bộ (ví dụ: gọi API hoặc xử lý công việc dài)
async def async_task():
    await asyncio.sleep(2)  # Mô phỏng tác vụ bất đồng bộ
    return {"message": "Hello from async task"}

# Hàm đồng bộ gọi hàm async
def run_async_task():
    # asyncio.run() không được dùng trong event loop hiện có, thay vào đó, ta dùng asyncio.create_task() hoặc run trong event loop riêng
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    result = loop.run_until_complete(async_task())
    loop.close()
    return result

@app.route('/async-example', methods=['GET'])
def async_example():
    # Gọi hàm async bên trong hàm đồng bộ
    result = run_async_task()
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
