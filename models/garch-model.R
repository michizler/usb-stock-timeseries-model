# --------------------- Time Series Analysis on USB Stock ---------------------

# ARIMA + GARCH

install.packages("rugarch")

# Loading the packages
library(TTR)
library(forecast)
library(xts)
library(dplyr)
library(ggplot2)
library(tsibble)
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

logret <- diff(log(close_ts))
logret <- na.omit(logret)

arima_mean <- auto.arima(logret)
arima_mean

# Extract ARMA orders from ARIMA model
ord <- arimaorder(arima_mean)

ar_order <- ord[1]   # p
ma_order <- ord[3]   # q

# specify GARCH parameters
spec <- ugarchspec(
  variance.model = list(model="sGARCH", garchOrder=c(1,1)),
  mean.model = list(armaOrder=c(ar_order, ma_order), include.mean=TRUE),
  distribution.model = "norm"
)

# Fit GARCH model
garch_fit <- ugarchfit(spec, logret)
garch_fit

plot(garch_fit, which = 1)   # standardized residuals
plot(garch_fit, which = 2)   # ACF of residuals
plot(garch_fit, which = 3)   # squared residuals

resid_std <- residuals(garch_fit, standardize = TRUE)

Box.test(resid_std, lag = 20, type = "Ljung-Box")


# forecast
fc <- ugarchforecast(garch_fit, n.ahead = 365)   # 365-day ahead forecast
fc

# Convert cumulative log-return forecast back to price 
last_price <- as.numeric(tail(close_ts, 1))

ret_forecast <- as.numeric(fitted(fc))
price_forecast <- last_price * exp(cumsum(ret_forecast))

price_forecast

# convert forecasted prices to a continuation ts
hist_ts <- ts(usb$Close)

fc_ts <- ts(price_forecast, start = length(hist_ts) + 1)

# combine
merged_ts <- ts.union(Historical = hist_ts, Forecast = fc_ts)

# plot with autoplot
autoplot(merged_ts) +
  ggtitle("Historical Prices + Forecasted Prices") +
  xlab("Time") + ylab("Price"