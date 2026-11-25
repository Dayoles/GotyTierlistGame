# GOTYStore – Laboratorio 3 (React + FastAPI)

Proyecto con dos partes que se ejecutan al mismo tiempo, cada una en su propia terminal.

## 1. Backend (Python / FastAPI) – puerto 7000
```
cd backend_gotystore
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python main.py
```
Swagger: http://127.0.0.1:7000/docs

## 2. Frontend (React / Vite) – puerto 5173
```
cd frontend_gotystore
npm install
npm run dev
```
Aplicación: http://localhost:5173

Requisitos: Python 3.12+ y Node.js 22 LTS (mínimo 20.19).
