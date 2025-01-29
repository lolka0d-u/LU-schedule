from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from classes import Account
from methods import login_and_gen_cookies
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all domains
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
async def root():
    return {"ok": True}

@app.get("/policy")
async def policy():
    return FileResponse(Path("legal/policy.html"), media_type="text/html")

@app.get("/terms")
async def terms():
    return FileResponse(Path("legal/terms.html"), media_type="text/html")

@app.post("/genCookies")
async def get_cookies(account: Account):
    return login_and_gen_cookies(account.username, account.password)
