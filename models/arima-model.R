# --------------------- Time Series Analysis on USB Stock ---------------------

# Loading the packages
library(TTR)
library(forecast)
library(xts)
library(dplyr)
library(tsibble)
library(quantmod)


usb <- read.csv('USB.csv')

# cast date column to datetime object
usb$Date <- as.Date(usb$Date)

# convert to xts object & remove not needed columns
usb_ts <- xts(usb[, c("Open", "High", "Low", "Close")],
               order.by = usb$Date)

# convert close prices to time series object
close_ts <- ts(usb_ts$Close, frequency = 365)

# Arima modelling
usb_arima <- auto.arima(close_ts, seasonal=FALSE)

# Forecast 365 days
usb_arimafc <- forecast(usb_arima, h=365)

autoplot(usb_arimafc)

checkresiduals(usb_arimafc)
acf(na.omit(usb_arimafc$residuals), lag.max=20)