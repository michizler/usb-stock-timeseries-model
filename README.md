# 📈 Time Series Modelling for Share Price Prediction — US Bancorp (USB)

**Forecasting stock prices using Holt-Winters, ARIMA, and ARIMA-GARCH models to support data-driven investment decisions.**

[![R](https://img.shields.io/badge/R-4.x-276DC3?style=for-the-badge&logo=r&logoColor=white)](https://www.r-project.org/)
[![Status](https://img.shields.io/badge/Status-Complete-10B981?style=for-the-badge)]()
[![License](https://img.shields.io/badge/License-Academic-F5A623?style=for-the-badge)]()

---

## 📋 Table of Contents

- [The Problem](#the-problem)
- [Project Overview](#project-overview)
- [Dataset](#dataset)
- [Project Structure](#project-structure)
- [Methodology](#methodology)
- [Model 1: Holt-Winters](#model-1-holt-winters-exponential-smoothing)
- [Model 2: ARIMA](#model-2-arima)
- [Model 3: ARIMA + GARCH](#model-3-arima--garch--the-solution)
- [Forecast Results](#forecast-results)
- [Model Comparison](#model-comparison)
- [Getting Started](#getting-started)
- [Interactive Presentation](#interactive-presentation)
- [Limitations & Future Work](#limitations--future-work)
- [Documentation](#documentation)

---

## The Problem

Financial markets are inherently noisy, non-stationary, and characterised by **volatility clustering** — periods where large price swings follow other large swings, and calm periods follow calm. This behaviour violates the core assumptions of most classical forecasting methods.

Investment firms and portfolio managers need reliable forecasts not just for expected price direction, but for the **range of uncertainty** around those forecasts. A model that predicts the price will rise but can't quantify the risk is only half the answer.

Standard approaches fail on financial data for specific, diagnosable reasons:

**1. Non-stationarity.** Stock prices exhibit strong upward or downward trends. Models that assume a fixed mean (like basic ARMA) produce meaningless forecasts unless the data is differenced first.

**2. Autocorrelation in residuals.** Even after fitting a trend, the errors from simple models (Holt-Winters, ARIMA) are correlated with each other — meaning the model is systematically missing patterns in the data.

**3. Heteroscedasticity.** The variance of stock returns is not constant over time. Periods of market stress (2008 crash, COVID-19) produce much larger daily swings than calm periods. Models that assume constant variance underestimate risk exactly when it matters most.

This project demonstrates that **combining ARIMA (for the mean equation) with GARCH (for the variance equation)** resolves all three issues, producing residuals that are statistically indistinguishable from white noise — the gold standard for time series model validation.

---

## Project Overview

This project was developed for the **EEA Financial Analytics** module, simulating a scenario where a financial investment firm requires a reliable forecasting model for **US Bancorp (USB)** stock prices.

Three progressively sophisticated models were fitted, evaluated, and compared:

| Model                          | Approach                                 | Residual Test         | Outcome  |
| ------------------------------ | ---------------------------------------- | --------------------- | -------- |
| **Holt-Winters**               | Exponential smoothing (trend only)       | Ljung-Box p < 2.2e-16 | ✗ Failed |
| **ARIMA(1,1,0)**               | Auto-fitted on raw prices                | Ljung-Box p < 2.2e-16 | ✗ Failed |
| **ARIMA(1,0,1) + sGARCH(1,1)** | Mean + variance modelling on log returns | Ljung-Box p = 0.2369  | ✓ Passed |

The iterative failure-diagnosis-improvement cycle is intentional — it demonstrates _why_ financial data requires specialised treatment and builds a rigorous justification for the final GARCH solution.

---

## Dataset

Daily OHLCV stock data for **US Bancorp (NYSE: USB)** spanning **47 years**.

| Attribute          | Value                                           |
| ------------------ | ----------------------------------------------- |
| **Ticker**         | USB (US Bancorp)                                |
| **Period**         | May 1973 – April 2020                           |
| **Records**        | 11,835 daily observations                       |
| **Variables**      | Date, Open, High, Low, Close, Adj Close, Volume |
| **Target**         | Close price                                     |
| **Missing values** | None                                            |

| Key Price Points          |                |
| ------------------------- | -------------- |
| Starting price (May 1973) | $0.46          |
| All-time high (~2018)     | ~$60           |
| Final close (Apr 2020)    | $31.93         |
| COVID-19 drawdown         | ~50% from peak |

**Source:** `source-data/USB.csv`

---

## Project Structure

```
usb-stock-timeseries-model/
│
├── eda/
│   └── eda.R                               # Exploratory data analysis & decomposition
│
├── models/
│   ├── holtwinters-model.R                  # Holt-Winters exponential smoothing
│   ├── arima-model.R                        # Auto-ARIMA on raw close prices
│   └── garch-model.R                        # ARIMA + sGARCH on log returns
│
├── public/
│   └── model-performance/
│       ├── holt-winters.png                 # Holt-Winters forecast & residual plots
│       ├── arima.png                        # ARIMA forecast & diagnostic output
│       └── garch.png                        # GARCH model diagnostics & forecast
│
├── report-documentation/
│   └── Time Series Modelling for Share Price ... .pdf   # Full project report
│
├── source-data/
│   └── USB.csv                              # Raw daily OHLCV data (11,835 rows)
│
├── usbforecast-presentation/               # Interactive React/Vite slide deck
│   ├── src/
│   │   └── App.jsx                          # 17-slide presentation
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## Methodology

### 1. Data Loading & Exploration

```r
library(quantmod)
library(xts)
library(forecast)

# Load CSV and convert to time series
usb <- read.csv('USB.csv')
usb$Date <- as.Date(usb$Date)

# Create xts time series object
usb_ts <- xts(
  usb[, c("Open", "High", "Low", "Close")],
  order.by = usb$Date
)
```

Key exploration steps:

- Verified zero missing values across all 11,835 rows
- Plotted candlestick chart via `highcharter` — confirmed strong upward trend with COVID-era crash
- Observed that variance increases dramatically in later decades — a visual indicator of heteroscedasticity
- Converted close prices to a `ts` object with `frequency = 365` for decomposition

### 2. Time Series Decomposition

```r
close_ts <- ts(usb_ts$Close, frequency = 365)
decomp <- decompose(close_ts)
plot(decomp)
```

The additive decomposition revealed four critical insights:

| Component    | Finding                             | Implication                                                    |
| ------------ | ----------------------------------- | -------------------------------------------------------------- |
| **Observed** | Raw prices range from $0.46 to $60+ | Extreme range confirms non-stationarity                        |
| **Trend**    | Clear long-term upward trajectory   | Models must account for trend (differencing or smoothing)      |
| **Seasonal** | Near-zero amplitude                 | No meaningful seasonal pattern — disable gamma in Holt-Winters |
| **Random**   | Residual magnitude grows over time  | **Heteroscedasticity** — constant-variance models will fail    |

The growing residual variance is the single most important finding. It foreshadows why both Holt-Winters and ARIMA will fail their diagnostic tests, and why GARCH is ultimately necessary.

### 3. Stationarity Testing

The Augmented Dickey-Fuller (ADF) test confirmed the raw price series is non-stationary. First-order differencing (or conversion to log returns) is required before ARIMA or GARCH modelling.

---

## Model 1: Holt-Winters Exponential Smoothing

Double exponential smoothing with trend only (no seasonal component).

### Configuration

```r
usbseriesforecasts <- HoltWinters(close_ts, gamma = FALSE)
usbseriesforecasts2 <- forecast(usbseriesforecasts, h = 365)
```

### Parameters

| Parameter | Value    | Interpretation                                                          |
| --------- | -------- | ----------------------------------------------------------------------- |
| Alpha (α) | 0.942    | Very high — model relies almost entirely on the most recent observation |
| Beta (β)  | 0.000    | No trend adjustment — effectively simple exponential smoothing          |
| Gamma (γ) | FALSE    | Seasonal component disabled (no seasonality found)                      |
| SSE       | 1,837.88 | Sum of squared errors                                                   |

### Diagnostic Results

| Test               | Result                                  | Pass/Fail    |
| ------------------ | --------------------------------------- | ------------ |
| Residual histogram | Roughly normal                          | ✓ Acceptable |
| ACF plot           | Strong autocorrelation at multiple lags | ✗ Failed     |
| **Ljung-Box**      | **Q\* = 1582.1, df = 730, p < 2.2e-16** | **✗ Failed** |

**Verdict:** The Ljung-Box p-value is astronomically below 0.05. Significant autocorrelation remains in the residuals — the model is systematically missing patterns. Forecasts from this model cannot be trusted.

---

## Model 2: ARIMA

Auto-fitted ARIMA using the `forecast` package's `auto.arima` function.

### Configuration

```r
usb_arima <- auto.arima(close_ts, seasonal = FALSE)
usb_arimafc <- forecast(usb_arima, h = 365)

# Check diagnostics
checkresiduals(usb_arimafc)
```

### Model Selected: ARIMA(1,1,0)

| Parameter | Value        | Meaning                                   |
| --------- | ------------ | ----------------------------------------- |
| p = 1     | AR(1)        | One autoregressive term                   |
| d = 1     | Differencing | First-order differencing for stationarity |
| q = 0     | No MA        | No moving average component               |

### Diagnostic Results

| Test                  | Result                                  | Pass/Fail    |
| --------------------- | --------------------------------------- | ------------ |
| Residual distribution | Roughly normal                          | ✓ Acceptable |
| ACF plot              | Significant autocorrelation persists    | ✗ Failed     |
| **Ljung-Box**         | **Q\* = 1581.5, df = 729, p < 2.2e-16** | **✗ Failed** |

**Verdict:** The same fundamental problem as Holt-Winters. ARIMA models assume constant variance (homoscedasticity). Financial data exhibits volatility clustering — the variance itself changes over time. The model captures the mean dynamics but ignores the changing spread of returns.

**Diagnosis:** The mean equation alone is insufficient. The model needs a separate variance equation — this is exactly what GARCH provides.

---

## Model 3: ARIMA + GARCH — The Solution

The breakthrough: combining ARIMA for the mean equation with sGARCH(1,1) for the conditional variance equation, fitted on **log returns** rather than raw prices.

### Pipeline

```r
library(rugarch)

# 1. Compute log returns (stationary by construction)
logret <- diff(log(close_ts))
logret <- na.omit(logret)

# 2. Fit ARIMA on returns for the mean equation
arima_mean <- auto.arima(logret)
ord <- arimaorder(arima_mean)

# 3. Specify GARCH model
spec <- ugarchspec(
  variance.model = list(
    model = "sGARCH",
    garchOrder = c(1, 1)
  ),
  mean.model = list(
    armaOrder = c(ord[1], ord[3]),   # ARMA(1,1)
    include.mean = TRUE
  ),
  distribution.model = "norm"
)

# 4. Fit
garch_fit <- ugarchfit(spec, logret)
```

### Why Log Returns?

Log returns `r_t = ln(P_t / P_{t-1})` are used instead of raw prices because they are approximately stationary, additive over time, and symmetric — properties that satisfy the assumptions of both ARIMA and GARCH models. The final price forecast is recovered by exponentiating the cumulative sum of predicted returns.

### Optimal Parameters

| Parameter  | Value    | Interpretation                         |
| ---------- | -------- | -------------------------------------- |
| μ (mu)     | 0.000603 | Mean daily log return                  |
| ar1        | −0.7185  | Autoregressive coefficient             |
| ma1        | 0.7068   | Moving average coefficient             |
| ω (omega)  | 0.000004 | Baseline variance (intercept)          |
| α₁ (alpha) | 0.0938   | ARCH effect — impact of previous shock |
| β₁ (beta)  | 0.8924   | GARCH persistence — volatility memory  |

All parameters significant at p < 0.01.

**α₁ + β₁ = 0.986** — very close to 1, indicating highly persistent volatility. Once a shock hits, elevated variance decays slowly. This is exactly the behaviour observed in the decomposition residuals.

### Information Criteria

| Criterion      | Value     |
| -------------- | --------- |
| Akaike (AIC)   | −5.7692   |
| Bayes (BIC)    | −5.7655   |
| Shibata        | −5.7692   |
| Hannan-Quinn   | −5.7680   |
| Log-Likelihood | 34,139.66 |

### Diagnostic Results — All Passed

| Test                               | Result         | Pass/Fail    |
| ---------------------------------- | -------------- | ------------ |
| Ljung-Box (standardized residuals) | **p = 0.2369** | **✓ Passed** |
| Ljung-Box (squared residuals)      | p > 0.31       | ✓ Passed     |
| ARCH LM Test (lag 3, 5, 7)         | p > 0.80       | ✓ Passed     |

```r
# Confirmation
resid_std <- residuals(garch_fit, standardize = TRUE)
Box.test(resid_std, lag = 20, type = "Ljung-Box")

# X-squared = 24.126, df = 20
# p-value = 0.2369  ✓
```

**Verdict:** The ARIMA+GARCH model is the only model whose residuals are statistically indistinguishable from white noise (p > 0.05). No serial correlation remains in either the standardized residuals or the squared residuals. The model has successfully captured both the mean dynamics and the time-varying volatility.

---

## Forecast Results

### 365-Day Price Prediction

Log-return forecasts were generated via `ugarchforecast`, then converted back to price levels using cumulative exponentiation from the last observed close.

```r
# Generate forecast
fc <- ugarchforecast(garch_fit, n.ahead = 365)

# Convert log returns back to prices
last_price <- as.numeric(tail(close_ts, 1))
ret_forecast <- as.numeric(fitted(fc))
price_forecast <- last_price * exp(cumsum(ret_forecast))
```

### Projected Price Trajectory

| Horizon     | Predicted Price | Change from $31.93 |
| ----------- | --------------- | ------------------ |
| Day 1 (T+1) | ~$31.95         | +0.1%              |
| Day 30      | ~$32.53         | +1.9%              |
| Day 90      | ~$33.73         | +5.6%              |
| Day 180     | ~$35.39         | +10.8%             |
| Day 270     | ~$37.60         | +17.8%             |
| **Day 365** | **~$39.79**     | **+24.6%**         |

The model projects a steady upward trajectory, reflecting the positive mean return (μ = 0.000603 per day ≈ 16% annualised before compounding).

### Volatility Forecast (Sigma)

| Period                  | Daily σ | Interpretation                                              |
| ----------------------- | ------- | ----------------------------------------------------------- |
| Near-term (Day 1–7)     | ~6.7%   | Elevated — reflects COVID-era volatility at forecast origin |
| Medium-term (Day 30–90) | ~3.5%   | Decaying toward long-run level                              |
| Long-term (Day 180+)    | ~1.8%   | Unconditional variance — the baseline                       |

Unlike Holt-Winters and ARIMA, the GARCH model **quantifies uncertainty** at each forecast step. This is essential for constructing confidence intervals, managing portfolio risk, and sizing positions.

---

## Model Comparison

| Criterion                   | Holt-Winters          | ARIMA(1,1,0)       | ARIMA+GARCH                  |
| --------------------------- | --------------------- | ------------------ | ---------------------------- |
| **Target variable**         | Close price           | Close price        | Log returns                  |
| **Trend handling**          | Exponential smoothing | Differencing (d=1) | Differencing via log returns |
| **Volatility modelling**    | ✗ None                | ✗ None             | ✓ sGARCH(1,1)                |
| **Ljung-Box p-value**       | < 2.2e-16             | < 2.2e-16          | **0.2369**                   |
| **Residual diagnosis**      | ✗ Autocorrelated      | ✗ Autocorrelated   | **✓ White noise**            |
| **Usable for forecasting?** | No                    | No                 | **Yes**                      |
| **Volatility quantified?**  | No                    | No                 | **Yes**                      |

---

## Getting Started

### Prerequisites

- [R](https://cran.r-project.org/) (≥ 4.0) and [RStudio](https://posit.co/products/open-source/rstudio/)
- Required R packages:

```r
install.packages(c(
  "quantmod", "xts", "forecast", "rugarch",
  "highcharter", "ggplot2", "tseries"
))
```

### Running the Analysis

```bash
# Clone the repository
git clone https://github.com/your-username/usb-stock-timeseries-model.git
cd usb-stock-timeseries-model

# Open in RStudio, then run scripts in order:
# 1. eda/eda.R                     — load data, explore, decompose
# 2. models/holtwinters-model.R    — fit Holt-Winters & diagnose
# 3. models/arima-model.R          — fit auto.arima & diagnose
# 4. models/garch-model.R          — fit ARIMA+GARCH, forecast, convert to prices
```

### Running the Interactive Presentation

```bash
cd usbforecast-presentation
npm install
npm run dev
```

Opens a 17-slide interactive deck at `http://localhost:5173` covering the full modelling journey from raw data to validated GARCH forecast.

---

## Interactive Presentation

The `usbforecast-presentation/` directory contains a **React + Vite** slide deck summarising the entire project:

1. **Title** — USB share price forecasting with key stats
2. **Agenda** — 8-section roadmap
3. **The Scenario** — investment firm context
4. **Data Exploration** — 11,835 records, OHLCV structure, key observations
5. **Decomposition** — trend, seasonal, random components and implications
6. **Holt-Winters** — parameters, SSE, and failed Ljung-Box test
7. **ARIMA** — auto-fitted ARIMA(1,1,0) and identical diagnostic failure
8. **ARIMA + GARCH** — full pipeline, 6 optimal parameters, information criteria
9. **Diagnostics** — side-by-side model comparison showing only GARCH passes
10. **Forecast Results** — 365-day price trajectory with volatility decay
11. **Conclusion** — three key findings and model recommendation
12. **Thank You**

Model performance screenshots are stored in `public/model-performance/` for reference.

---

## Limitations & Future Work

### Current Limitations

- **Normal distribution assumption** — the GARCH model uses `distribution.model = "norm"`. Financial returns often exhibit fat tails; a Student-t or skewed-t distribution may better capture extreme moves
- **Single-asset model** — the model forecasts USB in isolation; in practice, cross-asset correlations and macroeconomic factors influence price dynamics
- **Point forecast limitations** — while GARCH provides volatility estimates, the point forecast (mean return) projects a smooth upward curve; real prices will fluctuate around this path
- **No out-of-sample validation** — the model was fitted on the full dataset; a train/test split or rolling-window backtest would provide a more rigorous performance assessment
- **Static parameters** — model parameters are estimated once; in production, regular refitting as new data arrives would maintain forecast accuracy

### Future Enhancements

- **Student-t distribution** — replace `"norm"` with `"std"` in the GARCH specification to model heavy-tailed returns
- **Rolling-window backtest** — implement walk-forward validation to measure out-of-sample accuracy over time
- **Multivariate GARCH** — extend to DCC-GARCH for modelling correlations between USB and sector peers or indices
- **Exogenous variables** — incorporate macroeconomic indicators (interest rates, VIX, sector indices) as external regressors
- **Regime-switching** — explore Markov-switching GARCH to explicitly model bull/bear market transitions
- **Real-time deployment** — wrap the model in a Shiny dashboard or API endpoint for live forecast updates

---

## Documentation

The full project report — including all R code, output plots, model summaries, diagnostic results, and critical evaluation — is available in:

📄 [`report-documentation/Time Series Modelling for Share Price Prediction.pdf`](report-documentation/)

Model performance screenshots (forecast plots, residual diagnostics, ACF charts) are stored in:

📁 [`public/model-performance/`](public/model-performance/) — `holt-winters.png`, `arima.png`, `garch.png`

---

## Tech Stack

| Tool             | Purpose                                             |
| ---------------- | --------------------------------------------------- |
| **R**            | Statistical computing and time series modelling     |
| **quantmod**     | Financial data handling and charting                |
| **xts**          | Extensible time series objects                      |
| **forecast**     | Auto-ARIMA, Holt-Winters, and residual diagnostics  |
| **rugarch**      | GARCH model specification, fitting, and forecasting |
| **highcharter**  | Interactive candlestick charts                      |
| **tseries**      | ADF stationarity testing                            |
| **ggplot2**      | Static data visualisation                           |
| **React + Vite** | Interactive presentation slide deck                 |

---

## Author

Developed by **Bright Uzosike** as a financial analytics case study demonstrating the iterative modelling process required for reliable share price forecasting.

_From raw prices to validated forecasts — data-driven investment intelligence._
