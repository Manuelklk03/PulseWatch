import uuid
from datetime import UTC

import pytest
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models import Monitor, MonitorStatus


def build_monitor(**overrides: object) -> Monitor:
    values: dict[str, object] = {
        "name": "Web principal",
        "url": "https://example.com",
        "interval_seconds": 60,
    }
    values.update(overrides)
    return Monitor(**values)


def test_monitor_gets_defaults_when_saved(session: Session) -> None:
    monitor = build_monitor()

    session.add(monitor)
    session.flush()
    session.refresh(monitor)

    assert isinstance(monitor.id, uuid.UUID)
    assert monitor.status is MonitorStatus.PENDING
    assert monitor.timeout_seconds == 10
    # El instante de creación lleva zona horaria y está en UTC.
    assert monitor.created_at.tzinfo is not None
    assert monitor.created_at.utcoffset() == UTC.utcoffset(None)


@pytest.mark.parametrize("interval_seconds", [29, 3601])
def test_rejects_interval_outside_limits(
    session: Session, interval_seconds: int
) -> None:
    session.add(build_monitor(interval_seconds=interval_seconds))

    with pytest.raises(IntegrityError, match="interval_seconds_range"):
        session.flush()


@pytest.mark.parametrize("timeout_seconds", [0, 31])
def test_rejects_timeout_outside_limits(session: Session, timeout_seconds: int) -> None:
    session.add(build_monitor(timeout_seconds=timeout_seconds))

    with pytest.raises(IntegrityError, match="timeout_seconds_range"):
        session.flush()


def test_accepts_interval_and_timeout_at_the_limits(session: Session) -> None:
    session.add(build_monitor(interval_seconds=30, timeout_seconds=1))
    session.add(build_monitor(interval_seconds=3600, timeout_seconds=30))

    session.flush()
