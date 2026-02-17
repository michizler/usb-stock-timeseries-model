# --------------------- Time Series Analysis on USB Stock ---------------------

# Installing and loading necessary packages
install.packages("TTR")
install.packages("forecast")
install.packages('xts')
install.packages("quantmod")
install.packages('highcharter')
install.packages('tsibble')

# Loading the packages
library(TTR)
library(forecast)
library(xts)
library(dplyr)
library(tsibble)
library(highcharter)
library(quantmod)


usb <- read.csv('USB.csv')

# preview

head(usb)
tail(usb)


# cast date column to datetime object
usb$Date <- as.Date(usb$Date)


# convert to xts object & remove not needed columns
usb_ts <- xts(usb_ts[, c("Open", "High", "Low", "Close")],
               order.by = usb$Date)

# visualize static chart
chartSeries(usb_ts$Close, name = "USB Price 2014-2019")

# visualization of candlesticks with SMA
highchart(type="stock") %>% 
  hc_add_series(usb_ts) %>% 
  hc_add_series(SMA(na.omit(Cl(usb_ts)),n=50),name="SMA(50)") %>% 
  hc_add_series(SMA(na.omit(Cl(usb_ts)),n=200),name="SMA(200)") %>% 
  hc_title(text="<b>USB Price Candle Stick Chart 1973-2020</b>")

# Decomposing components
close_ts <- ts(usb_ts$Close, frequency = 365)

decomp <- decompose(close_ts)

plot(decomp) # no seasonality