# webapigotystore.py:

from fastapi import FastAPI, Request
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

from domain.entitydistribuidora import EntityDistribuidoraIn
from application.distribuidoraservice import DistribuidoraService

app = FastAPI(
    title="API GOTYStore",
    description="API básica para gestión de distribuidoras de videojuegos GOTY",
    version="1.0.0"
)

# --------------------------------
# CORS: permite que el Frontend React (Vite) consuma esta API
# --------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

service = DistribuidoraService()


def enviar(resultado):
    """Convierte (codigo, cuerpo) del servicio en una respuesta HTTP JSON."""
    codigo, cuerpo = resultado
    return JSONResponse(status_code=codigo, content=jsonable_encoder(cuerpo))


ERRORES = {
    400: {"description": "Solicitud incorrecta"},
    404: {"description": "Registro no encontrado"},
    422: {"description": "Datos recibidos no válidos"},
    500: {"description": "Error interno del servidor"},
}


# --------------------------------
# Manejo de errores (estructura JSON estándar)
# --------------------------------

@app.exception_handler(RequestValidationError)
async def error_validacion(request: Request, exc: RequestValidationError):
    detalle = [
        {
            "campo": ".".join(str(parte) for parte in error["loc"]),
            "detalle": error["msg"]
        }
        for error in exc.errors()
    ]
    return JSONResponse(
        status_code=422,
        content={
            "success": False,
            "message": "Datos recibidos no válidos",
            "data": detalle
        }
    )


@app.exception_handler(StarletteHTTPException)
async def error_http(request: Request, exc: StarletteHTTPException):
    mensaje = "Recurso no encontrado" if exc.status_code == 404 else str(exc.detail)
    return JSONResponse(
        status_code=exc.status_code,
        content={"success": False, "message": mensaje, "data": None}
    )


@app.exception_handler(Exception)
async def error_interno(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "message": "Error interno del servidor",
            "data": None
        }
    )


@app.get(
    "/",
    summary="Estado de la API",
    description="Verificar que la API GOTYStore está funcionando",
    tags=["Distribuidora"]
)
async def inicio():
    return {
        "success": True,
        "message": "API GOTYStore funcionando",
        "data": None
    }


# --------------------------------
# GET - Consulta
# --------------------------------

@app.get(
    "/api/distribuidoras",
    summary="Consultar Distribuidoras Todas",
    description="Consultar todas las distribuidoras registradas",
    tags=["Distribuidora"],
    responses=ERRORES
)
async def consultar():
    return enviar(service.consultar())


# --------------------------------
# GET ONE - Consulta por ID
# --------------------------------

@app.get(
    "/api/distribuidoras/{id_distribuidora}",
    summary="Consultar Distribuidoras Una",
    description="Consultar una distribuidora por su identificador",
    tags=["Distribuidora"],
    responses=ERRORES
)
async def consultar_por_id(id_distribuidora: int):
    return enviar(service.consultar_por_id(id_distribuidora))


# --------------------------------
# POST - Ingreso
# --------------------------------

@app.post(
    "/api/distribuidoras",
    summary="Ingresar Distribuidoras",
    description="Registrar una nueva distribuidora (el Id lo asigna el Backend)",
    tags=["Distribuidora"],
    status_code=201,
    responses=ERRORES
)
async def ingresar(distribuidora: EntityDistribuidoraIn):
    return enviar(service.ingresar(distribuidora))


# --------------------------------
# PUT - Modificación
# --------------------------------

@app.put(
    "/api/distribuidoras/{id_distribuidora}",
    summary="Modificar Distribuidora",
    description="Modificar una distribuidora existente",
    tags=["Distribuidora"],
    responses=ERRORES
)
async def modificar(
    id_distribuidora: int,
    distribuidora: EntityDistribuidoraIn
):
    return enviar(
        service.modificar(
            id_distribuidora,
            distribuidora
        )
    )


# --------------------------------
# DELETE - Eliminación
# --------------------------------

@app.delete(
    "/api/distribuidoras/{id_distribuidora}",
    summary="Eliminar Distribuidora",
    description="Eliminar una distribuidora por su identificador",
    tags=["Distribuidora"],
    responses=ERRORES
)
async def eliminar(id_distribuidora: int):
    return enviar(service.eliminar(id_distribuidora))
