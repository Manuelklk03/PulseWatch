# Literal["ok"] significa: el único valor permitido es exactamente "ok".
from typing import Literal

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class HealthResponse(BaseModel):
    status: Literal["ok"]


@router.get("/health")
def get_health() -> HealthResponse:
    return HealthResponse(status="ok")
