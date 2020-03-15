#!/usr/bin/env python3

import os

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

    return df.to_numpy()


def create_model(data: np.ndarray) -> models.Sequential:
    model = models.Sequential([
        layers.Dense(20, activation='relu', input_shape=[2]),
        layers.Dense(10, activation='relu'),
        layers.Dense(5),
    ])

    model.compile(loss='mse',
                  optimizer=keras.optimizers.Adam(0.003),
                  metrics=['accuracy'])

    return model


def main() -> np.ndarray:
    if not os.path.exists('model.h5'):
        df: pd.DataFrame = pd.read_csv('final_df.csv')

        df = df[['weather_temp', 'indpro', 'traf', 'aqi', 'weather_humidity']]
        df['nextaqi'] = 0
        df['next2aqi'] = 0
        df['next3aqi'] = 0
        df['next4aqi'] = 0
        df['next5aqi'] = 0
        df['next6aqi'] = 0
        df['next7aqi'] = 0
        df['next8aqi'] = 0
        df['next9aqi'] = 0
        df['next10aqi'] = 0

        df['SMAaqi'] = df.aqi.rolling(5).mean()
        df['SMAaqi10'] = df.aqi.rolling(10).mean()

        # df = df.reshape(df.shape[0], df.shape[1], 1)
        for i in range(len(df) - 11):
            df['nextaqi'][i] = df['aqi'][i + 1]
            df['next2aqi'][i] = df['aqi'][i + 2]
            df['next3aqi'][i] = df['aqi'][i + 3]
            df['next4aqi'][i] = df['aqi'][i + 4]
            df['next5aqi'][i] = df['aqi'][i + 5]
            df['next6aqi'][i] = df['aqi'][i + 6]
            df['next7aqi'][i] = df['aqi'][i + 7]
            df['next8aqi'][i] = df['aqi'][i + 8]
            df['next9aqi'][i] = df['aqi'][i + 9]
            df['next10aqi'][i] = df['aqi'][i + 10]

        df_train = df[:50000]
        df_trainset = df_train[['indpro', 'traf']]
        df_yset = df_train[[
            'aqi', 'nextaqi', 'next2aqi', 'next3aqi', 'next4aqi'
        ]]
        model = create_model(data=df_train)
        history = model.fit(df_trainset, df_yset, epochs=10)
        model.save('model.h5')
    else:
        model = models.load_model('model.h5')

    return model.predict(df_trainset)


if __name__ == '__main__':
    main()
