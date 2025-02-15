from fastapi import FastAPI, HTTPException
import numpy as np
import pandas as pd
from datetime import timedelta
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model
import requests

app = FastAPI()

model_path = 'model.h5'
df = pd.read_csv('Gold_Data_Updated.csv')
df['Date'] = pd.to_datetime(df['Date'], format='%d-%m-%Y')
df.sort_values(by='Date', ascending=True, inplace=True)
df.reset_index(drop=True, inplace=True)

@app.get("/predict/")
def gold_price_prediction(num_days: int):
    if num_days < 1 or num_days > 365:
        raise HTTPException(status_code=400, detail="Number of days must be between 1 and 365")
    
    future_predictions, future_dates, future_prices = gold_price_prediction_pipeline(df, num_days, model_path)
    formatted_predictions = {key.strftime('%Y-%m-%d'): value for key, value in future_predictions.items()}
    
    return {"predictions": formatted_predictions}

@app.get("/live-prices/")
def fetch_live_gold_prices():
    api_key = "goldapi-5lksm4io7stv-io"  # Replace with your API key
    symbol = "XAU"
    curr = "INR"
    url = f"https://www.goldapi.io/api/{symbol}/{curr}"
    headers = {"x-access-token": api_key, "Content-Type": "application/json"}
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        gold_data = response.json()
        return gold_data
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error fetching gold prices: {str(e)}")

def gold_price_prediction_pipeline(df, num_days, model_path='model.h5', window_size=60, features=['Price']):
    model = load_trained_model(model_path)
    scaler = MinMaxScaler()
    scaler.fit(df[features])
    recent_data = prepare_input_data(df, window_size, features, scaler)
    future_prices = predict_future_prices(model, recent_data, num_steps=num_days, scaler=scaler, window_size=window_size, features=features)
    last_date = df['Date'].iloc[-1]
    future_dates = [last_date + timedelta(days=i) for i in range(1, num_days + 1)]
    future_predictions_dict = {date.date(): round(price, 2) for date, price in zip(future_dates, future_prices)}
    return future_predictions_dict, future_dates, future_prices

def load_trained_model(model_path='model.h5'):
    return load_model(model_path)

def prepare_input_data(df, window_size, features, scaler):
    recent_data = df[features].iloc[-window_size:]
    return scaler.transform(recent_data)

def predict_future_prices(model, recent_data, num_steps, scaler, window_size, features):
    if len(recent_data) != window_size:
        raise ValueError(f"recent_data must have exactly {window_size} rows.")
    
    input_sequence = recent_data[-window_size:].reshape(1, window_size, len(features))
    future_predictions = []
    for _ in range(num_steps):
        next_prediction = model.predict(input_sequence)[0, 0]
        future_predictions.append(scaler.inverse_transform([[next_prediction]])[0, 0])
        next_row = input_sequence[0, 1:, :]
        next_prediction_row = np.zeros((1, len(features)))
        next_prediction_row[0, 0] = next_prediction
        input_sequence = np.vstack([next_row, next_prediction_row]).reshape(1, window_size, len(features))
    
    return future_predictions
