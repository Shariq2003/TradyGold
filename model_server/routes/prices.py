import requests
from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.get("/live-prices/")
def fetch_live_gold_prices():
    api_key = "goldapi-5lksm4io7stv-io"
    url = "https://www.goldapi.io/api/XAU/INR"
    headers = {"x-access-token": api_key, "Content-Type": "application/json"}

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        gold_data = response.json()
        return gold_data
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error fetching gold prices: {str(e)}")
