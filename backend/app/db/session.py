import os
from functools import lru_cache

from sqlalchemy import Engine, create_engine


# lru_cache hace que el motor se cree una sola vez y se reutilice.
# Se crea al pedirlo y no al importar, para que las partes de la aplicación que
# no usan la base de datos (como /health) funcionen sin DATABASE_URL.
@lru_cache
def get_engine() -> Engine:
    url = os.environ.get("DATABASE_URL")
    if url is None:
        raise RuntimeError(
            "Falta la variable de entorno DATABASE_URL. "
            "Ejecuta con: uv run --env-file ../.env ..."
        )
    return create_engine(url)
