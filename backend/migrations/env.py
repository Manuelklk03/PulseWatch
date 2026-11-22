import os
from logging.config import fileConfig

from alembic import context
from sqlalchemy import engine_from_config, pool

config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# La URL de la base de datos sale de la variable de entorno DATABASE_URL y no de
# alembic.ini, para no guardar credenciales en Git.
database_url = os.environ.get("DATABASE_URL")
if database_url is None:
    raise RuntimeError(
        "Falta la variable de entorno DATABASE_URL. "
        "Ejecuta Alembic con: uv run --env-file ../.env alembic ..."
    )
# configparser trata "%" como carácter especial: se duplica para que una
# contraseña con "%" no rompa la lectura.
config.set_main_option("sqlalchemy.url", database_url.replace("%", "%%"))

# Se conectará con los modelos (Base.metadata) cuando existan, para poder usar
# "alembic revision --autogenerate".
target_metadata = None


def run_migrations_offline() -> None:
    """Genera el SQL sin conectarse a la base de datos."""
    context.configure(
        url=config.get_main_option("sqlalchemy.url"),
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Se conecta a la base de datos y aplica las migraciones."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
