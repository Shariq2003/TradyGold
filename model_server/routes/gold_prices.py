from fastapi import APIRouter, Query, HTTPException
from typing import Dict
import pandas as pd
from datetime import datetime

router = APIRouter()

CSV_FILE_PATH = "model/gold_data.csv"

def get_gold_prices(start_date: str, end_date: str) -> Dict[str, float]:
    try:
        df = pd.read_csv(CSV_FILE_PATH)
        df["Date"] = pd.to_datetime(df["Date"], format="%d-%m-%Y")
        start_dt = datetime.strptime(start_date, "%Y-%m-%d")
        end_dt = datetime.strptime(end_date, "%Y-%m-%d")
        
        filtered_df = df[(df["Date"] >= start_dt) & (df["Date"] <= end_dt)]
        
        if filtered_df.empty:
            return {}

        gold_prices_dict = dict(zip(filtered_df["Date"].dt.strftime("%Y-%m-%d"), filtered_df["Price"]))

        return gold_prices_dict

    except Exception as e:
        return HTTPException(status_code=500, detail=f"Error processing data: {str(e)}")

@router.get("/gold-prices/")
async def gold_prices(
    start_date: str = Query(..., description="Start date in YYYY-MM-DD format"),
    end_date: str = Query(..., description="End date in YYYY-MM-DD format")
) -> Dict[str, float]:
    try:
        prices = get_gold_prices(start_date, end_date)
        if not prices:
            raise HTTPException(status_code=404, detail="No data found for the given date range")
        return prices
    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))
