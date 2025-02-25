from fastapi import APIRouter, HTTPException
from model.gold_model import predict_gold_prices

router = APIRouter()

@router.get("/predict/")
def get_gold_prediction(num_days: int):
    if num_days < 1 or num_days > 365:
        raise HTTPException(status_code=400, detail="Number of days must be between 1 and 365")
    
    predictions = predict_gold_prices(num_days)
    formatted_response = {date: price for date, price in predictions.items()}
    return formatted_response
