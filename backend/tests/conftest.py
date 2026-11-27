from collections.abc import Iterator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.db.session import get_engine
from app.main import create_app


@pytest.fixture
def client() -> TestClient:
    return TestClient(create_app())


# Una sesión de base de datos para las pruebas que la necesitan. Todo lo que la
# prueba escriba se deshace al terminar (rollback), así que las pruebas no dejan
# datos ni dependen unas de otras.
@pytest.fixture
def session() -> Iterator[Session]:
    with get_engine().connect() as connection:
        transaction = connection.begin()
        with Session(
            bind=connection, join_transaction_mode="create_savepoint"
        ) as session:
            yield session
        transaction.rollback()
