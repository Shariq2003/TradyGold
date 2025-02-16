import numpy as np
import pandas as pd
from datetime import timedelta
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model

df = pd.read_csv("model/gold_data.csv")
df["Date"] = pd.to_datetime(df["Date"], format="%d-%m-%Y")
df.sort_values(by="Date", ascending=True, inplace=True)
df.reset_index(drop=True, inplace=True)

model = load_model("model/model.h5")

scaler = MinMaxScaler()
scaler.fit(df[["Price"]])

def predict_gold_prices(num_days, window_size=60):
    """
    Predict gold prices for the next `num_days` based on previous data.
    """
    recent_data = df[["Price"]].iloc[-window_size:]
    scaled_data = scaler.transform(recent_data)

    input_sequence = scaled_data.reshape(1, window_size, 1)
    future_predictions = []

    for _ in range(num_days):
        next_prediction = model.predict(input_sequence)[0, 0]
        future_predictions.append(scaler.inverse_transform([[next_prediction]])[0, 0])

        next_row = input_sequence[0, 1:, :]
        next_prediction_row = np.array([[next_prediction]])
        input_sequence = np.vstack([next_row, next_prediction_row]).reshape(1, window_size, 1)

    last_date = df["Date"].iloc[-1]
    future_dates = [last_date + timedelta(days=i) for i in range(1, num_days + 1)]
    
    return {date.strftime("%Y-%m-%d"): round(price, 2) for date, price in zip(future_dates, future_predictions)}
