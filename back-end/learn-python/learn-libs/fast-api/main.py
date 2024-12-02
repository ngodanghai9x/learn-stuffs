from typing import Union
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from modules.user import router as user_router

app = FastAPI()
app.include_router(user_router)

app.mount("/static", StaticFiles(directory="public"), name="public")

@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
async def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}