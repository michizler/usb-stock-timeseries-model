# --------------------- Time Series Analysis on USB Stock ---------------------

# Loading the packages
library(TTR)
library(forecast)
library(xts)
library(dplyr)
library(tsibble)
library(highcharter)
library(quantmod)
library(rugarch)


usb <- read.csv('USB.csv')

# cast date column to datetime object
usb$Date <- as.Date(usb$Date)

# convert to xts object & remove not needed columns
usb_ts <- xts(usb[, c("Open", "High", "Low", "Close")],
               order.by = usb$Date)

# convert close prices to time series object
close_ts <- ts(usb_ts$Close, frequency = 365)

# forecast
usbseriesforecasts <- HoltWinters(close_ts, gamma=FALSE)
usbseriesforecasts

usbseriesforecasts$SSE

plot(usbseriesforecasts)

usbseriesforecasts2 <- forecast(usbseriesforecasts, h=365)
plot(usbseriesforecasts2)

checkresiduals(usbseriesforecasts2)
acf(na.omit(usbseriesforecasts2$residuals), lag.max=20)