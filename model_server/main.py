from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import prediction, prices, gold_prices

app = FastAPI(title="Gold Prediction API", description="API for gold price prediction", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prediction.router, prefix="/api")
app.include_router(prices.router, prefix="/api")
app.include_router(gold_prices.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Gold Prediction API is running!"}
