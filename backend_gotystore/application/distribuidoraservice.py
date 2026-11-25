# distribuidoraservice.py:

from http import HTTPStatus

from domain.entitydistribuidora import EntityDistribuidoraIn
from infrastructure.memoryrepository import MemoryRepository


def _respuesta(codigo: HTTPStatus, success: bool, message: str, data=None):
    """Retorna (codigo HTTP, cuerpo JSON estandar)."""
    return int(codigo), {
        "success": success,
        "message": message,
        "data": data
    }


class DistribuidoraService:

    def __init__(self):
        self.repository = MemoryRepository()

    def consultar(self):

        datos = self.repository.get_all()

        return _respuesta(
            HTTPStatus.OK, True,
            "Consulta realizada correctamente",
            [d.model_dump() for d in datos]
        )

    def consultar_por_id(self, id_distribuidora: int):

        if id_distribuidora <= 0:
            return _respuesta(
                HTTPStatus.BAD_REQUEST, False,
                "El identificador debe ser mayor que cero"
            )

        entitydistribuidora = self.repository.get_one(id_distribuidora)

        if entitydistribuidora is None:
            return _respuesta(
                HTTPStatus.NOT_FOUND, False,
                "La distribuidora no existe"
            )

        return _respuesta(
            HTTPStatus.OK, True,
            "Consulta realizada correctamente",
            entitydistribuidora.model_dump()
        )

    def ingresar(self, distribuidora: EntityDistribuidoraIn):

        resultado = self.repository.create(distribuidora)

        return _respuesta(
            HTTPStatus.CREATED, True,
            "Distribuidora creada correctamente",
            resultado.model_dump()
        )

    def modificar(
        self,
        id_distribuidora: int,
        distribuidora: EntityDistribuidoraIn
    ):

        if id_distribuidora <= 0:
            return _respuesta(
                HTTPStatus.BAD_REQUEST, False,
                "El identificador debe ser mayor que cero"
            )

        resultado = self.repository.update(
            id_distribuidora,
            distribuidora
        )

        if resultado is None:
            return _respuesta(
                HTTPStatus.NOT_FOUND, False,
                "La distribuidora no existe"
            )

        return _respuesta(
            HTTPStatus.OK, True,
            "Distribuidora modificada correctamente",
            resultado.model_dump()
        )

    def eliminar(self, id_distribuidora: int):

        if id_distribuidora <= 0:
            return _respuesta(
                HTTPStatus.BAD_REQUEST, False,
                "El identificador debe ser mayor que cero"
            )

        resultado = self.repository.delete(id_distribuidora)

        if resultado is None:
            return _respuesta(
                HTTPStatus.NOT_FOUND, False,
                "La distribuidora no existe"
            )

        return _respuesta(
            HTTPStatus.OK, True,
            "Distribuidora eliminada correctamente",
            resultado.model_dump()
        )
