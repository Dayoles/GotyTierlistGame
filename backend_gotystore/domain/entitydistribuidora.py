# entitydistribuidora.py

from pydantic import BaseModel, ConfigDict, Field


class EntityDistribuidoraIn(BaseModel):
    """Datos que envia el cliente en POST y PUT (sin identificador:
    el Backend asigna el Id)."""

    model_config = ConfigDict(
        str_strip_whitespace=True,
        json_schema_extra={
            "example": {
                "NombreDistribuidora": "Steam Latinoamerica",
                "Pais": "Colombia",
                "Ciudad": "Medellin",
                "Estado": True
            }
        }
    )

    NombreDistribuidora: str = Field(..., min_length=1, max_length=100)
    Pais: str = Field(..., min_length=1, max_length=60)
    Ciudad: str = Field(..., min_length=1, max_length=60)
    Estado: bool = True


class EntityDistribuidora(BaseModel):
    """Entidad completa almacenada en memoria (incluye el identificador)."""

    IdDistribuidora: int
    NombreDistribuidora: str
    Pais: str
    Ciudad: str
    Estado: bool
