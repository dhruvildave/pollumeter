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
    df.drop(
        columns=[
            'datetime',
            'measurement_id',
            'lat',
            'long',
            'area',
            'city',
        ],
        inplace=True,
    )
    # df = df[['weather_temp']]
    df = df[:75000]
    df = df / np.max(df)

    # print(df.head(20))
    df_arr = df.to_numpy()

    # for i, _ in enumerate(df_arr):
    #     df_arr[i, 0] = np.datetime64(df_arr[i, 0])

    return df_arr


def create_model(data: np.ndarray) -> models.Sequential:
    model = models.Sequential([
        layers.Dense(256, activation='relu', input_shape=[16]),
        layers.Dense(128, activation='relu'),
        layers.Dense(64, activation='relu'),
        layers.Dense(32, activation='relu'),
        layers.Dense(4, activation='relu'),
        layers.Dense(1),
    ])

    model.compile(loss='mean_squared_error',
                  optimizer=keras.optimizers.Adam(0.0003),
                  metrics=['accuracy'])

    return model


def main() -> None:
    df: pd.DataFrame = pd.read_csv('final_df.csv')
    # df = df.reshape(df.shape[0], df.shape[1], 1)
    # n = 75000
    # samples = []
    # length = 100
    # for i in range(0, n, length):
    #     sample = df[i:i + length]
    #     samples.append(sample)

    # print(len(samples))
    # df = df.reshape((len(samples), length, 17))

    # samples = np.array(samples)
    # print(samples.shape)
    y_train = df[['aqi']][1:65001] / np.max(df[['aqi']])
    # y_train = y_train.iloc[1:65001]
    df.drop(columns='aqi', inplace=True)
    X_train = df[:65000]
    X_train: np.ndarray = preprocess_df(X_train)
    # X_test = samples[70000:]
    # y_train = df[:65000]
    # y_test = samples[7000:]

    model = create_model(data=df)
    # print(model.summary())
    history = model.fit(X_train, y_train, epochs=100)


if __name__ == '__main__':
    main()
