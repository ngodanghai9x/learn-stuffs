from fastapi import FastAPI
from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    HTTPException,
    Query,
    UploadFile,
    status,
    Security,
)
from typing import Union

router = APIRouter(
    # include_in_schema=True,
    prefix="/health",
    tags=["health"],
    # dependencies=[Depends(has_health_token)],
)


@router.get("/")
async def read_root():
    return {"Hello": "World"}


@router.get("/items/{item_id}")
async def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
