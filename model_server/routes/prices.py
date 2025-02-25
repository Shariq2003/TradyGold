import requests
import os
from fastapi import APIRouter, HTTPException
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

@router.get("/live-prices/")
def fetch_live_gold_prices():
    api_key = os.getenv("GOLD_API_KEY")
    
    if not api_key:
        return HTTPException(status_code=500, detail="API Key is missing in the environment variables")

    url = "https://www.goldapi.io/api/XAU/INR"
    headers = {"x-access-token": api_key, "Content-Type": "application/json"}

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        gold_data = response.json()
        return gold_data
    except requests.exceptions.RequestException as e:
        return HTTPException(status_code=500, detail=f"Error fetching gold prices: {str(e)}")
