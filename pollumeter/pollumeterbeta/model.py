#!/usr/bin/env python3

import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers, models


def preprocess_df(df: pd.DataFrame) -> np.ndarray:
    df['datetime'] = pd.to_datetime(df['datetime'])
    df['measurement_id'] = df['measurement_id'].astype('string')
    df['area'] = pd.Categorical(df['area'])
    df['city'] = pd.Categorical(df['city'])
    df.drop(columns=['measurement_id', 'lat', 'long', 'area', 'city'],
            inplace=True)

    df_arr = df.to_numpy()

    for i, _ in enumerate(df_arr):
        df_arr[i, 0] = np.datetime64(df_arr[i, 0])

    return df_arr


def create_model(data: np.ndarray) -> models.Sequential:
    model = models.Sequential([
        layers.LSTM(220,
                    return_sequences=True,
                    input_shape=[100, data.shape[1]]),
        layers.LSTM(120),
        layers.TimeDistributed(layers.Dense(20)),
    ])

    model.compile(loss='mean_squared_error',
                  optimizer=keras.optimizers.Adam(0.001))

    return model


def main() -> None:
    df: pd.DataFrame = pd.read_csv('../../final_df.csv')
    df: np.ndarray = preprocess_df(df)

    X_train = df[:70000]
    X_test = df[70000:]
    y_train = df[100:70100]
    y_test = df[70100:]

    model = create_model(
        data=X_train.reshape(X_train.shape[0], X_train.shape[1], 1))
    # history = model.fit()


if __name__ == '__main__':
    main()
