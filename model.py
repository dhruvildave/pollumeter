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

    df_arr = df.to_numpy()

    return df_arr


def create_model(data: np.ndarray) -> models.Sequential:
    model = models.Sequential([
        layers.LSTM(150,
                    return_sequences=True,
                    input_shape=[100, data.shape[2]]),
        layers.LSTM(110, return_sequences=True),
        layers.TimeDistributed(layers.Dense(17)),
    ])

    model.compile(loss='mse',
                  optimizer=keras.optimizers.Adam(0.003),
                  metrics=['accuracy'])

    return model


def main() -> None:
    df: pd.DataFrame = pd.read_csv('final_df.csv')
    df: np.ndarray = preprocess_df(df)
    a = np.max(df)
    df = df / np.max(df)

    # df = df.reshape(df.shape[0], df.shape[1], 1)
    n = 75000
    samples = []
    length = 100
    for i in range(0, n, length):
        sample = df[i:i + length]
        samples.append(sample)

    print(len(samples))
    # df = df.reshape((len(samples), length, 17))

    samples = np.array(samples)
    # samples = samples / max(samples)
    print(samples.shape)
    X_train = samples[:600]
    # X_test = samples[70000:]
    y_train = samples[100:700]
    # y_test = samples[7000:]

    model = create_model(data=samples)
    # print(model.summary())
    history = model.fit(X_train, y_train, epochs=30)

    x = model.predict([X_train]) * a
    print(x)


if __name__ == '__main__':
    main()
