import enum
import uuid
from datetime import datetime

from sqlalchemy import CheckConstraint, DateTime, Enum, String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base

# Límites acordados (docs/decisions/0001-limites-de-comprobacion.md).
MIN_INTERVAL_SECONDS = 30
MAX_INTERVAL_SECONDS = 3600
MIN_TIMEOUT_SECONDS = 1
MAX_TIMEOUT_SECONDS = 30
DEFAULT_TIMEOUT_SECONDS = 10


class MonitorStatus(enum.StrEnum):
    PENDING = "pending"
    UP = "up"
    DOWN = "down"
    PAUSED = "paused"


class Monitor(Base):
    __tablename__ = "monitors"
    __table_args__ = (
        CheckConstraint(
            "interval_seconds BETWEEN "
            f"{MIN_INTERVAL_SECONDS} AND {MAX_INTERVAL_SECONDS}",
            name="interval_seconds_range",
        ),
        CheckConstraint(
            f"timeout_seconds BETWEEN {MIN_TIMEOUT_SECONDS} AND {MAX_TIMEOUT_SECONDS}",
            name="timeout_seconds_range",
        ),
    )

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(100))
    url: Mapped[str] = mapped_column(String(2048))
    interval_seconds: Mapped[int]
    timeout_seconds: Mapped[int] = mapped_column(default=DEFAULT_TIMEOUT_SECONDS)
    status: Mapped[MonitorStatus] = mapped_column(
        Enum(
            MonitorStatus,
            name="monitor_status",
            native_enum=False,
            create_constraint=True,
            length=10,
            values_callable=lambda statuses: [status.value for status in statuses],
        ),
        default=MonitorStatus.PENDING,
    )

    # Instante con zona horaria; PostgreSQL lo guarda en UTC.
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
