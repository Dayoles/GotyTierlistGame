# memoryrepository.py:

from domain.entitydistribuidora import EntityDistribuidora, EntityDistribuidoraIn


class MemoryRepository:

    def __init__(self):
        self.distribuidoras = []
        self._siguiente_id = 1

    def get_all(self):
        return self.distribuidoras

    def get_one(self, id_distribuidora: int):
        for distribuidora in self.distribuidoras:
            if distribuidora.IdDistribuidora == id_distribuidora:
                return distribuidora

        return None

    def create(self, datos: EntityDistribuidoraIn):
        distribuidora = EntityDistribuidora(
            IdDistribuidora=self._siguiente_id,
            **datos.model_dump()
        )
        self._siguiente_id += 1
        self.distribuidoras.append(distribuidora)
        return distribuidora

    def update(self, id_distribuidora: int, datos: EntityDistribuidoraIn):

        for index, item in enumerate(self.distribuidoras):

            if item.IdDistribuidora == id_distribuidora:
                actualizada = EntityDistribuidora(
                    IdDistribuidora=id_distribuidora,
                    **datos.model_dump()
                )
                self.distribuidoras[index] = actualizada
                return actualizada

        return None

    def delete(self, id_distribuidora: int):

        for index, item in enumerate(self.distribuidoras):

            if item.IdDistribuidora == id_distribuidora:
                return self.distribuidoras.pop(index)

        return None
