import httpx
from typing import Optional, Dict, Any, Literal

# Hàm gọi API chung với method và URL tùy chỉnh
async def call_api(
    method: Literal['GET', 'POST', 'PUT', 'DELETE'], 
    url: str, 
    params: Optional[Dict[str, Any]] = None, 
    headers: Optional[Dict[str, str]] = None, 
    json: Optional[Dict[str, Any]] = None
) -> dict:
    """
    Hàm gọi API chung với các method khác nhau: GET, POST, PUT, DELETE.
    
    :param method: Method HTTP (GET, POST, PUT, DELETE)
    :param url: URL của API cần gọi
    :param params: Tham số URL (tùy chọn)
    :param headers: Thông tin header (tùy chọn)
    :param json: Dữ liệu JSON cho body (tùy chọn)
    
    :return: Kết quả trả về từ API dưới dạng dict
    """
    async with httpx.AsyncClient() as client:
        response = await client.request(
            method, 
            url, 
            params=params, 
            headers=headers, 
            json=json
        )
        # Kiểm tra nếu status code không phải 200
        response.raise_for_status()
        return response.json()  # Trả về kết quả dưới dạng dict

# Hàm gọi API POST với body là JSON và API Key trên header
async def call_api_post_with_json(
    url: str, 
    json_body: Dict[str, Any], 
    api_key: str
) -> dict:
    """
    Hàm gọi API POST với body là JSON và API Key được thêm vào header.
    
    :param url: URL của API cần gọi
    :param json_body: Dữ liệu JSON cần gửi trong body của POST request
    :param api_key: API Key cần gửi trong header
    
    :return: Kết quả trả về từ API dưới dạng dict
    """
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json; charset=UTF-8",
    }
    
    # Gọi API POST thông qua hàm call_api
    return await call_api(
        method="POST",
        url=url,
        headers=headers,
        json=json_body
    )

async def main():
    try:
        api_url = "https://jsonplaceholder.typicode.com/posts"
        api_key = "your-api-key"
        
        # Dữ liệu JSON bạn muốn gửi trong POST request
        json_data = {
            'title': 'foo',
            'body': 'bar',
            'userId': 2,
        }

        resp2 = await call_api('GET', api_url, params={'userId': 3})
        print("🐍 File: httpx/callApi.py | Line: 80 | undefined ~ resp2",resp2)
        
        # Gọi API POST
        resp1 = await call_api_post_with_json(api_url, json_data, api_key)
        print("🐍 File: httpx/callApi.py | Line: 77 | undefined ~ resp1",resp1)


        
    except Exception as e:
        print(e)

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
