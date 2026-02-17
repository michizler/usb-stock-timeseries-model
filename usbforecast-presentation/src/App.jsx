import { useState, useEffect, useCallback } from "react";

const C = {
  bg: "#080E1A",
  bg2: "#0C1425",
  bg3: "#111D33",
  emerald: "#10B981",
  emeraldDk: "#059669",
  gold: "#F5A623",
  goldLt: "#FBD38D",
  red: "#EF4444",
  redSoft: "#F87171",
  cyan: "#06B6D4",
  purple: "#A78BFA",
  wh: "#F1F5F9",
  ts: "#8B9DC3",
  tm: "#5A6F94",
  cb: "rgba(16,30,60,0.7)",
  cbr: "rgba(16,185,129,0.18)",
  cbrGold: "rgba(245,166,35,0.18)",
};

const fl = document.createElement("link");
fl.href =
  "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap";
fl.rel = "stylesheet";
document.head.appendChild(fl);

const Glow = ({ s, t, l, c, d = 0 }) => (
  <div
    style={{
      position: "absolute",
      top: t,
      left: l,
      width: s,
      height: s,
      borderRadius: "50%",
      background: `radial-gradient(circle,${c}22 0%,transparent 70%)`,
      filter: "blur(50px)",
      animation: `gp 7s ease-in-out ${d}s infinite alternate`,
      pointerEvents: "none",
    }}
  />
);

const Card = ({ children, style = {}, accent }) => (
  <div
    style={{
      background: C.cb,
      border: `1px solid ${accent ? C.cbrGold : C.cbr}`,
      borderRadius: 14,
      padding: "22px",
      backdropFilter: "blur(12px)",
      boxShadow: accent
        ? `0 0 24px ${C.gold}10`
        : "0 4px 20px rgba(0,0,0,0.25)",
      ...style,
    }}
  >
    {children}
  </div>
);

const Tag = ({ text }) => (
  <div
    style={{
      display: "inline-block",
      fontSize: 10,
      fontWeight: 600,
      color: C.emerald,
      textTransform: "uppercase",
      letterSpacing: 2.5,
      fontFamily: "DM Sans",
      background: `${C.emerald}12`,
      border: `1px solid ${C.emerald}25`,
      padding: "5px 14px",
      borderRadius: 20,
      marginBottom: 14,
    }}
  >
    {text}
  </div>
);

const Title = ({ children }) => (
  <h2
    style={{
      fontSize: 30,
      fontWeight: 400,
      color: C.wh,
      fontFamily: "'Instrument Serif', serif",
      lineHeight: 1.25,
      marginBottom: 8,
    }}
  >
    {children}
  </h2>
);

const Sub = ({ children }) => (
  <p
    style={{
      fontSize: 13.5,
      color: C.ts,
      fontFamily: "DM Sans",
      lineHeight: 1.65,
      maxWidth: 700,
      marginBottom: 20,
    }}
  >
    {children}
  </p>
);

const Code = ({ children, style = {} }) => (
  <div
    style={{
      fontFamily: "JetBrains Mono, monospace",
      fontSize: 10.5,
      lineHeight: 1.8,
      padding: 14,
      background: "rgba(8,14,26,0.8)",
      borderRadius: 8,
      border: `1px solid ${C.cbr}`,
      color: C.ts,
      overflowX: "auto",
      ...style,
    }}
  >
    {children}
  </div>
);

const Stat = ({ value, label, color = C.emerald, sub }) => (
  <Card style={{ textAlign: "center", padding: "18px 14px" }}>
    <div
      style={{
        fontSize: 28,
        fontWeight: 700,
        fontFamily: "DM Sans",
        color,
        lineHeight: 1.1,
      }}
    >
      {value}
    </div>
    <div
      style={{
        fontSize: 11.5,
        color: C.wh,
        marginTop: 5,
        fontFamily: "DM Sans",
        fontWeight: 500,
      }}
    >
      {label}
    </div>
    {sub && (
      <div
        style={{
          fontSize: 10,
          color: C.tm,
          marginTop: 3,
          fontFamily: "DM Sans",
        }}
      >
        {sub}
      </div>
    )}
  </Card>
);

const Row = ({ icon, title, desc, color = C.emerald }) => (
  <div
    style={{
      display: "flex",
      gap: 12,
      alignItems: "flex-start",
      marginBottom: 14,
    }}
  >
    <div
      style={{
        minWidth: 32,
        height: 32,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `${color}12`,
        border: `1px solid ${color}25`,
        fontSize: 14,
        flexShrink: 0,
      }}
    >
      {icon}
    </div>
    <div>
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: C.wh,
          fontFamily: "DM Sans",
          marginBottom: 2,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 12,
          color: C.ts,
          lineHeight: 1.55,
          fontFamily: "DM Sans",
        }}
      >
        {desc}
      </div>
    </div>
  </div>
);

const Badge = ({ label, color = C.emerald }) => (
  <span
    style={{
      display: "inline-block",
      padding: "4px 11px",
      borderRadius: 7,
      fontSize: 10.5,
      fontWeight: 600,
      fontFamily: "DM Sans",
      background: `${color}12`,
      border: `1px solid ${color}25`,
      color,
      marginRight: 5,
      marginBottom: 5,
    }}
  >
    {label}
  </span>
);

const Divider =
  ({ number, title, subtitle, color = C.emerald }) =>
  () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        textAlign: "center",
        position: "relative",
      }}
    >
      <Glow s="350px" t="15%" l="55%" c={color} />
      <Glow s="200px" t="65%" l="10%" c={C.gold} d={2} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            fontSize: 90,
            fontWeight: 700,
            fontFamily: "DM Sans",
            color: `${color}10`,
            lineHeight: 1,
            marginBottom: -16,
          }}
        >
          {number}
        </div>
        <h1
          style={{
            fontSize: 40,
            fontWeight: 400,
            fontFamily: "'Instrument Serif', serif",
            color: C.wh,
            marginBottom: 10,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: 15,
            color: C.ts,
            fontFamily: "DM Sans",
            maxWidth: 480,
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );

const slides = [
  // 0 — TITLE
  () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        textAlign: "center",
        position: "relative",
      }}
    >
      <Glow s="450px" t="-80px" l="55%" c={C.emerald} />
      <Glow s="300px" t="55%" l="-5%" c={C.gold} d={2} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginBottom: 28,
          }}
        >
          <div style={{ fontSize: 26, lineHeight: 1 }}>📈</div>
          <span
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: C.ts,
              fontFamily: "DM Sans",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            EEA Financial Analytics
          </span>
        </div>
        <h1
          style={{
            fontSize: 46,
            fontWeight: 400,
            fontFamily: "'Instrument Serif', serif",
            lineHeight: 1.15,
            color: C.wh,
            marginBottom: 16,
            maxWidth: 700,
          }}
        >
          Time Series Modelling for{" "}
          <span style={{ color: C.emerald }}>Share Price Prediction</span>
        </h1>
        <p
          style={{
            fontSize: 15,
            color: C.ts,
            fontFamily: "DM Sans",
            maxWidth: 520,
            margin: "0 auto 28px",
            lineHeight: 1.6,
          }}
        >
          Forecasting US Bancorp (USB) stock prices using Holt-Winters, ARIMA,
          and ARIMA-GARCH models in R
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            { l: "11,835 Observations", e: "📊" },
            { l: "47 Years of Data", e: "📅" },
            { l: "R Language", e: "💻" },
          ].map((it, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "8px 16px",
                borderRadius: 10,
                background: C.cb,
                border: `1px solid ${C.cbr}`,
              }}
            >
              <span style={{ fontSize: 13 }}>{it.e}</span>
              <span
                style={{
                  fontSize: 11.5,
                  color: C.ts,
                  fontFamily: "DM Sans",
                  fontWeight: 500,
                }}
              >
                {it.l}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  // 1 — AGENDA
  () => (
    <div style={{ padding: "16px 0", position: "relative" }}>
      <Glow s="250px" t="-40px" l="72%" c={C.emerald} />
      <Tag text="Overview" />
      <Title>Presentation Roadmap</Title>
      <Sub>
        From raw financial data to a validated forecasting model — a structured
        journey through three modelling approaches.
      </Sub>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {[
          {
            n: "01",
            t: "The Scenario",
            d: "Investment firm context & forecasting objective",
          },
          {
            n: "02",
            t: "Data Exploration",
            d: "11,835 daily observations of USB stock (1973–2020)",
          },
          {
            n: "03",
            t: "Decomposition",
            d: "Trend, seasonality, and random component analysis",
          },
          {
            n: "04",
            t: "Holt-Winters",
            d: "Exponential smoothing — and why it failed",
          },
          {
            n: "05",
            t: "ARIMA",
            d: "Auto-fitted ARIMA(1,1,0) — still autocorrelated",
          },
          {
            n: "06",
            t: "ARIMA + GARCH",
            d: "The breakthrough: modelling volatility clustering",
          },
          {
            n: "07",
            t: "Forecast Results",
            d: "365-day price prediction with converted returns",
          },
          {
            n: "08",
            t: "Conclusion",
            d: "Key findings and model recommendation",
          },
        ].map((it, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 12,
              padding: "13px 15px",
              borderRadius: 11,
              background: C.cb,
              border: `1px solid ${C.cbr}`,
            }}
          >
            <span
              style={{
                fontSize: 20,
                fontWeight: 700,
                fontFamily: "DM Sans",
                color: `${C.emerald}30`,
                minWidth: 30,
              }}
            >
              {it.n}
            </span>
            <div>
              <div
                style={{
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: C.wh,
                  fontFamily: "DM Sans",
                }}
              >
                {it.t}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: C.tm,
                  fontFamily: "DM Sans",
                  marginTop: 2,
                }}
              >
                {it.d}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),

  // 2 — SCENARIO
  Divider({
    number: "01",
    title: "The Scenario",
    subtitle:
      "Supporting a financial investment firm to forecast share price movements using time series analysis.",
    color: C.emerald,
  }),

  // 3 — DATA EXPLORATION
  () => (
    <div style={{ padding: "16px 0", position: "relative" }}>
      <Glow s="280px" t="30%" l="78%" c={C.gold} d={1} />
      <Tag text="Source Data" />
      <Title>US Bancorp (USB) Stock Dataset</Title>
      <Sub>
        Daily OHLCV data spanning 47 years, from May 1973 to April 2020. The
        Close price was selected as the target variable for forecasting.
      </Sub>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: 12,
          marginBottom: 18,
        }}
      >
        <Stat
          value="11,835"
          label="Daily Records"
          sub="1973–2020"
          color={C.emerald}
        />
        <Stat
          value="7"
          label="Variables"
          sub="OHLCV + Adj Close"
          color={C.cyan}
        />
        <Stat
          value="$0.46"
          label="Starting Price"
          sub="May 1973"
          color={C.gold}
        />
        <Stat
          value="$31.93"
          label="Final Close"
          sub="Apr 2020"
          color={C.purple}
        />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: C.emerald,
              fontFamily: "DM Sans",
              marginBottom: 10,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Data Loading & Conversion
          </div>
          <Code>
            <span style={{ color: C.emerald }}>usb</span>{" "}
            {"<- read.csv('USB.csv')"}
            {"\n\n"}
            <span style={{ color: C.tm }}>{"# Cast to DateTime"}</span>
            {"\n"}
            {"usb$Date <- as.Date(usb$Date)"}
            {"\n\n"}
            <span style={{ color: C.tm }}>
              {"# Convert to xts time series"}
            </span>
            {"\n"}
            {"usb_ts <- xts("}
            {"\n"}
            {'  usb[, c("Open","High","Low","Close")],'}
            {"\n"}
            {"  order.by = usb$Date"}
            {"\n"}
            {")"}
          </Code>
        </Card>
        <Card accent>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: C.gold,
              fontFamily: "DM Sans",
              marginBottom: 10,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Key Observations
          </div>
          <Row
            icon="✓"
            title="No Missing Values"
            desc="All 11,835 rows complete across every column."
            color={C.emerald}
          />
          <Row
            icon="↗"
            title="Strong Upward Trend"
            desc="Price rose from ~$0.46 to ~$60 peak before COVID drop."
            color={C.gold}
          />
          <Row
            icon="📉"
            title="Volatility Clustering"
            desc="Variance increases dramatically in later decades — key insight for GARCH."
            color={C.cyan}
          />
          <Row
            icon="📆"
            title="No Seasonality"
            desc="Decomposition confirms no recurring seasonal pattern."
            color={C.purple}
          />
          <div
            style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 6 }}
          >
            <Badge label="quantmod" color={C.emerald} />
            <Badge label="xts" color={C.cyan} />
            <Badge label="highcharter" color={C.gold} />
            <Badge label="forecast" color={C.purple} />
          </div>
        </Card>
      </div>
    </div>
  ),

  // 4 — DECOMPOSITION
  Divider({
    number: "02",
    title: "Decomposition",
    subtitle:
      "Breaking the time series into trend, seasonal, and random components to understand its structure.",
    color: C.cyan,
  }),

  // 5 — DECOMPOSITION DETAIL
  () => (
    <div style={{ padding: "16px 0", position: "relative" }}>
      <Glow s="250px" t="40%" l="75%" c={C.cyan} />
      <Tag text="Decomposition" />
      <Title>Additive Time Series Components</Title>
      <Sub>
        The series was converted to a ts object with frequency=365 and
        decomposed into observed, trend, seasonal, and random components.
      </Sub>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: C.cyan,
              fontFamily: "DM Sans",
              marginBottom: 10,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Decomposition Code
          </div>
          <Code>
            <span style={{ color: C.tm }}>
              {"# Convert to ts with daily frequency"}
            </span>
            {"\n"}
            {"close_ts <- ts(usb_ts$Close, frequency = 365)"}
            {"\n\n"}
            <span style={{ color: C.tm }}>{"# Decompose into components"}</span>
            {"\n"}
            {"decomp <- decompose(close_ts)"}
            {"\n"}
            {"plot(decomp)  "}
            <span style={{ color: C.tm }}>{"# no seasonality"}</span>
          </Code>
          <div style={{ marginTop: 14 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: C.emerald,
                fontFamily: "DM Sans",
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Component Findings
            </div>
            {[
              {
                l: "Observed",
                d: "Raw close prices — $0.46 to $60+ range",
                c: C.wh,
              },
              {
                l: "Trend",
                d: "Clear long-term upward trajectory, accelerating post-1995",
                c: C.emerald,
              },
              {
                l: "Seasonal",
                d: "Near-zero amplitude — no meaningful seasonal pattern",
                c: C.gold,
              },
              {
                l: "Random",
                d: "Residuals grow in magnitude over time — heteroscedasticity",
                c: C.red,
              },
            ].map((it, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 8,
                  marginBottom: 8,
                  padding: "8px 10px",
                  borderRadius: 7,
                  background: `${it.c}06`,
                }}
              >
                <div
                  style={{
                    minWidth: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: it.c,
                    marginTop: 7,
                  }}
                />
                <div>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: it.c,
                      fontFamily: "DM Sans",
                    }}
                  >
                    {it.l}:{" "}
                  </span>
                  <span
                    style={{
                      fontSize: 11.5,
                      color: C.ts,
                      fontFamily: "DM Sans",
                    }}
                  >
                    {it.d}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card accent>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: C.gold,
              fontFamily: "DM Sans",
              marginBottom: 10,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Implications for Modelling
          </div>
          <Row
            icon="1"
            title="No Seasonality → Disable Gamma"
            desc="Holt-Winters should use gamma=FALSE since seasonal component is negligible."
            color={C.emerald}
          />
          <Row
            icon="2"
            title="Strong Trend → Differencing Needed"
            desc="Non-stationarity confirmed — ARIMA will require at least d=1."
            color={C.cyan}
          />
          <Row
            icon="3"
            title="Growing Residuals → Volatility Issue"
            desc="Residual variance increases over time, violating homoscedasticity. This foreshadows the need for GARCH."
            color={C.gold}
          />
          <Row
            icon="4"
            title="No Structural Breaks"
            desc="Despite the 2008 crash and COVID drop, the overall trend recovers — a single model can cover the full period."
            color={C.purple}
          />
          <div
            style={{
              marginTop: 10,
              padding: "10px 14px",
              borderRadius: 8,
              background: `${C.red}08`,
              border: `1px solid ${C.red}18`,
            }}
          >
            <span
              style={{ fontSize: 11.5, color: C.ts, fontFamily: "DM Sans" }}
            >
              <span style={{ color: C.red, fontWeight: 600 }}>
                Key insight:
              </span>{" "}
              The growing residual variance is the single most important
              finding. It means simple models (Holt, ARIMA) will underestimate
              uncertainty in volatile periods.
            </span>
          </div>
        </Card>
      </div>
    </div>
  ),

  // 6 — HOLT-WINTERS
  Divider({
    number: "03",
    title: "Holt-Winters",
    subtitle:
      "Exponential smoothing with trend — the first attempt at forecasting.",
    color: C.gold,
  }),

  // 7 — HOLT-WINTERS DETAIL
  () => (
    <div style={{ padding: "16px 0", position: "relative" }}>
      <Glow s="260px" t="20%" l="78%" c={C.gold} />
      <Tag text="Model 1" />
      <Title>Holt-Winters Exponential Smoothing</Title>
      <Sub>
        Applied double exponential smoothing (trend only, no seasonal component)
        to the close price time series.
      </Sub>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <Card style={{ marginBottom: 14 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: C.gold,
                fontFamily: "DM Sans",
                marginBottom: 10,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Model Configuration
            </div>
            <Code>
              {"usbseriesforecasts <- HoltWinters("}
              {"\n"}
              {"  close_ts, gamma = FALSE"}
              {"\n"}
              {")"}
              {"\n\n"}
              <span style={{ color: C.tm }}>{"# 365-day forecast"}</span>
              {"\n"}
              {"usbseriesforecasts2 <- forecast("}
              {"\n"}
              {"  usbseriesforecasts, h = 365"}
              {"\n"}
              {")"}
            </Code>
          </Card>
          <Card>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: C.emerald,
                fontFamily: "DM Sans",
                marginBottom: 10,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Smoothing Parameters
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 8,
              }}
            >
              {[
                { l: "Alpha (α)", v: "0.942", d: "Level" },
                { l: "Beta (β)", v: "0.000", d: "Trend" },
                { l: "Gamma (γ)", v: "FALSE", d: "Seasonal" },
              ].map((m, i) => (
                <div
                  key={i}
                  style={{
                    textAlign: "center",
                    padding: "10px 6px",
                    borderRadius: 8,
                    background: `${C.emerald}06`,
                    border: `1px solid ${C.emerald}12`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      fontFamily: "DM Sans",
                      color: C.emerald,
                    }}
                  >
                    {m.v}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: C.wh,
                      fontFamily: "DM Sans",
                      marginTop: 2,
                    }}
                  >
                    {m.l}
                  </div>
                  <div
                    style={{ fontSize: 9, color: C.tm, fontFamily: "DM Sans" }}
                  >
                    {m.d}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 10,
                fontSize: 11,
                color: C.ts,
                fontFamily: "DM Sans",
                lineHeight: 1.6,
              }}
            >
              SSE ={" "}
              <span style={{ color: C.gold, fontWeight: 600 }}>1,837.88</span> —
              high alpha means the model relies heavily on the most recent
              observation.
            </div>
          </Card>
        </div>
        <Card accent>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: C.red,
              fontFamily: "DM Sans",
              marginBottom: 10,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Residual Diagnostics — Failed ✗
          </div>
          <Row
            icon="📊"
            title="Residual Histogram"
            desc="Distribution appeared roughly normal — visually acceptable."
            color={C.emerald}
          />
          <Row
            icon="📉"
            title="ACF Plot"
            desc="Strong autocorrelation at multiple lags — residuals are not white noise."
            color={C.red}
          />
          <Row
            icon="🧪"
            title="Ljung-Box Test"
            desc="Q* = 1582.1, df = 730, p < 2.2e-16. Decisively rejects white noise."
            color={C.red}
          />
          <div
            style={{
              marginTop: 12,
              padding: "12px 14px",
              borderRadius: 8,
              background: `${C.red}08`,
              border: `1px solid ${C.red}18`,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: C.red,
                fontFamily: "DM Sans",
                marginBottom: 4,
              }}
            >
              Verdict: Unreliable
            </div>
            <div
              style={{
                fontSize: 11.5,
                color: C.ts,
                fontFamily: "DM Sans",
                lineHeight: 1.55,
              }}
            >
              The p-value is far below 0.05 — significant autocorrelation
              remains in the residuals. The model captures the general direction
              but cannot be trusted for accurate predictions.
            </div>
          </div>
        </Card>
      </div>
    </div>
  ),

  // 8 — ARIMA
  Divider({
    number: "04",
    title: "ARIMA Modelling",
    subtitle:
      "Auto-fitted ARIMA(1,1,0) — an improvement in methodology, but the same residual problem.",
    color: C.purple,
  }),

  // 9 — ARIMA DETAIL
  () => (
    <div style={{ padding: "16px 0", position: "relative" }}>
      <Glow s="260px" t="35%" l="76%" c={C.purple} />
      <Tag text="Model 2" />
      <Title>Auto-ARIMA Forecasting</Title>
      <Sub>
        The auto.arima function selected ARIMA(1,1,0) — one autoregressive term
        with first-order differencing and no moving average.
      </Sub>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <Card style={{ marginBottom: 14 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: C.purple,
                fontFamily: "DM Sans",
                marginBottom: 10,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              ARIMA Pipeline
            </div>
            <Code>
              <span style={{ color: C.tm }}>
                {"# Auto-fit ARIMA (no seasonal)"}
              </span>
              {"\n"}
              {"usb_arima <- auto.arima("}
              {"\n"}
              {"  close_ts, seasonal = FALSE"}
              {"\n"}
              {")"}
              {"\n\n"}
              <span style={{ color: C.tm }}>{"# Forecast 365 days"}</span>
              {"\n"}
              {"usb_arimafc <- forecast("}
              {"\n"}
              {"  usb_arima, h = 365"}
              {"\n"}
              {")"}
              {"\n\n"}
              {"autoplot(usb_arimafc)"}
              {"\n"}
              {"checkresiduals(usb_arimafc)"}
            </Code>
          </Card>
          <Card>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: C.emerald,
                fontFamily: "DM Sans",
                marginBottom: 10,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Model Selected
            </div>
            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  fontFamily: "'Instrument Serif', serif",
                  color: C.purple,
                }}
              >
                ARIMA(1,1,0)
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 8,
              }}
            >
              {[
                { l: "p = 1", d: "AR term" },
                { l: "d = 1", d: "Differencing" },
                { l: "q = 0", d: "MA term" },
              ].map((m, i) => (
                <div
                  key={i}
                  style={{
                    textAlign: "center",
                    padding: "8px",
                    borderRadius: 7,
                    background: `${C.purple}08`,
                    border: `1px solid ${C.purple}15`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      fontFamily: "JetBrains Mono",
                      color: C.purple,
                    }}
                  >
                    {m.l}
                  </div>
                  <div style={{ fontSize: 9.5, color: C.tm }}>{m.d}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <Card accent>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: C.red,
              fontFamily: "DM Sans",
              marginBottom: 10,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Residual Diagnostics — Failed ✗
          </div>
          <Row
            icon="📊"
            title="Residual Distribution"
            desc="Histogram showed roughly normal shape — similar to Holt-Winters."
            color={C.emerald}
          />
          <Row
            icon="📉"
            title="ACF Plot"
            desc="Still shows significant autocorrelation — same fundamental issue."
            color={C.red}
          />
          <Row
            icon="🧪"
            title="Ljung-Box Test"
            desc="Q* = 1581.5, df = 729, p < 2.2e-16. Again decisively rejects white noise."
            color={C.red}
          />
          <div
            style={{
              marginTop: 12,
              padding: "12px 14px",
              borderRadius: 8,
              background: `${C.red}08`,
              border: `1px solid ${C.red}18`,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: C.red,
                fontFamily: "DM Sans",
                marginBottom: 4,
              }}
            >
              Verdict: Still Unreliable
            </div>
            <div
              style={{
                fontSize: 11.5,
                color: C.ts,
                fontFamily: "DM Sans",
                lineHeight: 1.55,
              }}
            >
              ARIMA models assume constant variance. Financial data exhibits
              volatility clustering — periods of high variance followed by
              periods of low variance. The model needs a way to capture this.
            </div>
          </div>
          <div
            style={{
              marginTop: 12,
              padding: "12px 14px",
              borderRadius: 8,
              background: `${C.emerald}08`,
              border: `1px solid ${C.emerald}18`,
            }}
          >
            <span
              style={{ fontSize: 11.5, color: C.ts, fontFamily: "DM Sans" }}
            >
              <span style={{ color: C.emerald, fontWeight: 600 }}>
                Next step:
              </span>{" "}
              Combine ARIMA (for the mean equation) with GARCH (for the variance
              equation) to model both the trend and the changing volatility.
            </span>
          </div>
        </Card>
      </div>
    </div>
  ),

  // 10 — GARCH DIVIDER
  Divider({
    number: "05",
    title: "ARIMA + GARCH",
    subtitle:
      "The breakthrough — combining mean modelling with conditional variance estimation to handle financial volatility.",
    color: C.emerald,
  }),

  // 11 — GARCH DETAIL
  () => (
    <div style={{ padding: "16px 0", position: "relative" }}>
      <Glow s="280px" t="25%" l="76%" c={C.emerald} />
      <Tag text="Model 3 — Final" />
      <Title>ARIMA(1,0,1) + sGARCH(1,1)</Title>
      <Sub>
        Log returns were computed, auto.arima fitted on returns for the mean
        equation, then sGARCH(1,1) modelled the conditional variance via
        rugarch.
      </Sub>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <Card style={{ marginBottom: 14 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: C.emerald,
                fontFamily: "DM Sans",
                marginBottom: 10,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Pipeline
            </div>
            <Code>
              <span style={{ color: C.tm }}>{"# 1. Compute log returns"}</span>
              {"\n"}
              {"logret <- diff(log(close_ts))"}
              {"\n"}
              {"logret <- na.omit(logret)"}
              {"\n\n"}
              <span style={{ color: C.tm }}>{"# 2. Fit ARIMA on returns"}</span>
              {"\n"}
              {"arima_mean <- auto.arima(logret)"}
              {"\n\n"}
              <span style={{ color: C.tm }}>{"# 3. Extract ARMA orders"}</span>
              {"\n"}
              {"ord <- arimaorder(arima_mean)"}
              {"\n"}
              {"ar_order <- ord[1]  "}
              <span style={{ color: C.tm }}>{"# p"}</span>
              {"\n"}
              {"ma_order <- ord[3]  "}
              <span style={{ color: C.tm }}>{"# q"}</span>
              {"\n\n"}
              <span style={{ color: C.tm }}>{"# 4. Specify GARCH"}</span>
              {"\n"}
              {"spec <- ugarchspec("}
              {"\n"}
              {"  variance.model = list("}
              {"\n"}
              {'    model = "sGARCH",'}
              {"\n"}
              {"    garchOrder = c(1,1)),"}
              {"\n"}
              {"  mean.model = list("}
              {"\n"}
              {"    armaOrder = c(ar_order, ma_order),"}
              {"\n"}
              {"    include.mean = TRUE),"}
              {"\n"}
              {'  distribution.model = "norm"'}
              {"\n"}
              {")"}
              {"\n\n"}
              <span style={{ color: C.tm }}>{"# 5. Fit"}</span>
              {"\n"}
              {"garch_fit <- ugarchfit(spec, logret)"}
            </Code>
          </Card>
        </div>
        <div>
          <Card accent style={{ marginBottom: 14 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: C.gold,
                fontFamily: "DM Sans",
                marginBottom: 10,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Optimal Parameters
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 6,
              }}
            >
              {[
                { p: "μ", v: "0.000603", d: "Mean return" },
                { p: "ar1", v: "−0.7185", d: "AR coefficient" },
                { p: "ma1", v: "0.7068", d: "MA coefficient" },
                { p: "ω", v: "0.000004", d: "Baseline var" },
                { p: "α₁", v: "0.0938", d: "ARCH effect" },
                { p: "β₁", v: "0.8924", d: "GARCH persist." },
              ].map((m, i) => (
                <div
                  key={i}
                  style={{
                    textAlign: "center",
                    padding: "8px 4px",
                    borderRadius: 7,
                    background: `${C.emerald}06`,
                    border: `1px solid ${C.emerald}12`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: C.gold,
                      fontFamily: "JetBrains Mono",
                      fontWeight: 600,
                    }}
                  >
                    {m.p}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      fontFamily: "JetBrains Mono",
                      color: C.wh,
                      marginTop: 2,
                    }}
                  >
                    {m.v}
                  </div>
                  <div style={{ fontSize: 8.5, color: C.tm }}>{m.d}</div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 10,
                fontSize: 11,
                color: C.ts,
                fontFamily: "DM Sans",
                lineHeight: 1.6,
              }}
            >
              <span style={{ color: C.gold, fontWeight: 600 }}>
                α₁ + β₁ = 0.986
              </span>{" "}
              — very close to 1, indicating highly persistent volatility. All
              parameters significant at p {"<"} 0.01.
            </div>
          </Card>
          <Card>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: C.emerald,
                fontFamily: "DM Sans",
                marginBottom: 10,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Information Criteria
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
              }}
            >
              {[
                { l: "Akaike", v: "−5.7692" },
                { l: "Bayes", v: "−5.7655" },
                { l: "Shibata", v: "−5.7692" },
                { l: "Hannan-Quinn", v: "−5.7680" },
              ].map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "6px 10px",
                    borderRadius: 6,
                    background: `${C.emerald}06`,
                  }}
                >
                  <span
                    style={{ fontSize: 11, color: C.ts, fontFamily: "DM Sans" }}
                  >
                    {m.l}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: C.emerald,
                      fontWeight: 600,
                      fontFamily: "JetBrains Mono",
                    }}
                  >
                    {m.v}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 10.5,
                color: C.tm,
                fontFamily: "DM Sans",
              }}
            >
              Log-Likelihood: 34,139.66
            </div>
          </Card>
        </div>
      </div>
    </div>
  ),

  // 12 — DIAGNOSTICS
  () => (
    <div style={{ padding: "16px 0", position: "relative" }}>
      <Glow s="250px" t="20%" l="78%" c={C.emerald} />
      <Tag text="Validation" />
      <Title>GARCH Residual Diagnostics — Passed ✓</Title>
      <Sub>
        Unlike Holt-Winters and ARIMA, the ARIMA+GARCH model's standardized
        residuals pass the critical white noise test.
      </Sub>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 14,
          marginBottom: 16,
        }}
      >
        {[
          {
            t: "Ljung-Box (Standardized)",
            stat: "p = 0.2369",
            verdict: "✓ Pass",
            desc: "No serial correlation in standardized residuals.",
            c: C.emerald,
          },
          {
            t: "Ljung-Box (Squared)",
            stat: "p > 0.31",
            verdict: "✓ Pass",
            desc: "No remaining ARCH effects in squared residuals.",
            c: C.emerald,
          },
          {
            t: "ARCH LM Test",
            stat: "p > 0.80",
            verdict: "✓ Pass",
            desc: "No conditional heteroscedasticity remains at lags 3, 5, 7.",
            c: C.emerald,
          },
        ].map((it, i) => (
          <Card key={i} style={{ borderColor: `${it.c}30` }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: C.ts,
                fontFamily: "DM Sans",
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 8,
              }}
            >
              {it.t}
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                fontFamily: "DM Sans",
                color: it.c,
                marginBottom: 4,
              }}
            >
              {it.stat}
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: it.c,
                marginBottom: 6,
              }}
            >
              {it.verdict}
            </div>
            <div
              style={{
                fontSize: 11,
                color: C.ts,
                lineHeight: 1.5,
                fontFamily: "DM Sans",
              }}
            >
              {it.desc}
            </div>
          </Card>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Card>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: C.emerald,
              fontFamily: "DM Sans",
              marginBottom: 10,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Ljung-Box Confirmation
          </div>
          <Code>
            {"resid_std <- residuals("}
            {"\n"}
            {"  garch_fit, standardize = TRUE"}
            {"\n"}
            {")"}
            {"\n\n"}
            {"Box.test(resid_std,"}
            {"\n"}
            {'  lag = 20, type = "Ljung-Box")'}
            {"\n\n"}
            <span style={{ color: C.emerald }}>
              {"# X-squared = 24.126, df = 20"}
            </span>
            {"\n"}
            <span style={{ color: C.emerald }}>{"# p-value = 0.2369  ✓"}</span>
          </Code>
        </Card>
        <Card accent>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: C.gold,
              fontFamily: "DM Sans",
              marginBottom: 10,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Model Comparison
          </div>
          {[
            { m: "Holt-Winters", p: "< 2.2e-16", s: "✗ Fail", c: C.red },
            { m: "ARIMA(1,1,0)", p: "< 2.2e-16", s: "✗ Fail", c: C.red },
            { m: "ARIMA+GARCH", p: "0.2369", s: "✓ Pass", c: C.emerald },
          ].map((it, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 12px",
                borderRadius: 8,
                background: `${it.c}06`,
                marginBottom: 8,
                border: `1px solid ${it.c}15`,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: C.wh,
                  fontFamily: "DM Sans",
                }}
              >
                {it.m}
              </span>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: 11,
                    fontFamily: "JetBrains Mono",
                    color: it.c,
                    fontWeight: 600,
                  }}
                >
                  p = {it.p}
                </div>
                <div style={{ fontSize: 10, color: it.c }}>{it.s}</div>
              </div>
            </div>
          ))}
          <div
            style={{
              marginTop: 8,
              fontSize: 11,
              color: C.ts,
              fontFamily: "DM Sans",
              lineHeight: 1.6,
            }}
          >
            Only the ARIMA+GARCH model produces residuals that are statistically
            indistinguishable from white noise (p {">"} 0.05).
          </div>
        </Card>
      </div>
    </div>
  ),

  // 13 — FORECAST
  Divider({
    number: "06",
    title: "Forecast Results",
    subtitle:
      "365-day ahead price prediction using the validated ARIMA+GARCH model.",
    color: C.gold,
  }),

  // 14 — FORECAST DETAIL
  () => (
    <div style={{ padding: "16px 0", position: "relative" }}>
      <Glow s="300px" t="20%" l="75%" c={C.gold} />
      <Tag text="Forecast" />
      <Title>365-Day Price Prediction</Title>
      <Sub>
        Log-return forecasts were generated via ugarchforecast, then converted
        back to prices using cumulative exponentiation from the last observed
        close.
      </Sub>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: C.gold,
              fontFamily: "DM Sans",
              marginBottom: 10,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Return-to-Price Conversion
          </div>
          <Code>
            <span style={{ color: C.tm }}>
              {"# Generate 365-day return forecast"}
            </span>
            {"\n"}
            {"fc <- ugarchforecast("}
            {"\n"}
            {"  garch_fit, n.ahead = 365"}
            {"\n"}
            {")"}
            {"\n\n"}
            <span style={{ color: C.tm }}>
              {"# Convert log returns back to prices"}
            </span>
            {"\n"}
            {"last_price <- as.numeric("}
            {"\n"}
            {"  tail(close_ts, 1)"}
            {"\n"}
            {")"}
            {"\n\n"}
            {"ret_forecast <- as.numeric(fitted(fc))"}
            {"\n"}
            {"price_forecast <- last_price *"}
            {"\n"}
            {"  exp(cumsum(ret_forecast))"}
            {"\n\n"}
            <span style={{ color: C.tm }}>
              {"# Combine historical + forecast"}
            </span>
            {"\n"}
            {"hist_ts <- ts(usb$Close)"}
            {"\n"}
            {"fc_ts <- ts(price_forecast,"}
            {"\n"}
            {"  start = length(hist_ts) + 1"}
            {"\n"}
            {")"}
            {"\n"}
            {"merged_ts <- ts.union("}
            {"\n"}
            {"  Historical = hist_ts,"}
            {"\n"}
            {"  Forecast = fc_ts"}
            {"\n"}
            {")"}
          </Code>
        </Card>
        <div>
          <Card accent style={{ marginBottom: 14 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: C.gold,
                fontFamily: "DM Sans",
                marginBottom: 10,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Forecast Price Points
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 8,
              }}
            >
              {[
                { d: "Day 1 (T+1)", v: "$31.95", c: C.emerald },
                { d: "Day 30", v: "$32.53", c: C.emerald },
                { d: "Day 90", v: "$33.73", c: C.cyan },
                { d: "Day 180", v: "$35.39", c: C.cyan },
                { d: "Day 270", v: "$37.60", c: C.gold },
                { d: "Day 365", v: "$39.79", c: C.gold },
              ].map((it, i) => (
                <div
                  key={i}
                  style={{
                    textAlign: "center",
                    padding: "10px 6px",
                    borderRadius: 8,
                    background: `${it.c}06`,
                    border: `1px solid ${it.c}12`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 9,
                      color: C.tm,
                      fontFamily: "DM Sans",
                      marginBottom: 3,
                    }}
                  >
                    {it.d}
                  </div>
                  <div
                    style={{
                      fontSize: 17,
                      fontWeight: 700,
                      fontFamily: "DM Sans",
                      color: it.c,
                    }}
                  >
                    {it.v}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 10,
                fontSize: 11,
                color: C.ts,
                fontFamily: "DM Sans",
                lineHeight: 1.55,
              }}
            >
              The model projects a steady upward trajectory from{" "}
              <span style={{ color: C.emerald, fontWeight: 600 }}>$31.93</span>{" "}
              to approximately{" "}
              <span style={{ color: C.gold, fontWeight: 600 }}>$39.79</span>{" "}
              over 365 days — a projected gain of{" "}
              <span style={{ color: C.gold, fontWeight: 600 }}>+24.6%</span>.
            </div>
          </Card>
          <Card>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: C.emerald,
                fontFamily: "DM Sans",
                marginBottom: 10,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              GARCH Sigma (Volatility)
            </div>
            <Row
              icon="📈"
              title="Near-term σ ≈ 6.7%"
              desc="Daily volatility highest in first few days, reflecting COVID-era conditions."
              color={C.red}
            />
            <Row
              icon="📉"
              title="Long-term σ → 1.8%"
              desc="Sigma decays toward unconditional variance as forecast extends."
              color={C.emerald}
            />
            <Row
              icon="💡"
              title="Why This Matters"
              desc="Unlike Holt/ARIMA, the model quantifies uncertainty — essential for risk management and position sizing."
              color={C.gold}
            />
          </Card>
        </div>
      </div>
    </div>
  ),

  // 15 — CONCLUSION
  () => (
    <div style={{ padding: "16px 0", position: "relative" }}>
      <Glow s="300px" t="20%" l="75%" c={C.emerald} />
      <Tag text="Conclusion" />
      <Title>Key Findings & Recommendation</Title>
      <Sub>
        The iterative modelling process revealed why standard approaches fail on
        financial data — and how to fix it.
      </Sub>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 14,
          marginBottom: 16,
        }}
      >
        {[
          {
            n: "1",
            t: "No Seasonality",
            d: "USB stock has a clear long-term upward trend but zero meaningful seasonal pattern.",
            c: C.cyan,
          },
          {
            n: "2",
            t: "Volatility Is the Key",
            d: "Both Holt-Winters and ARIMA failed because they can't model time-varying variance.",
            c: C.gold,
          },
          {
            n: "3",
            t: "GARCH Solved It",
            d: "ARIMA+GARCH captured both the mean return and changing volatility — passing all diagnostics.",
            c: C.emerald,
          },
        ].map((it, i) => (
          <Card key={i}>
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                fontFamily: "DM Sans",
                color: `${it.c}15`,
                marginBottom: 4,
              }}
            >
              {it.n}
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: C.wh,
                fontFamily: "DM Sans",
                marginBottom: 5,
              }}
            >
              {it.t}
            </div>
            <div
              style={{
                fontSize: 11.5,
                color: C.ts,
                lineHeight: 1.6,
                fontFamily: "DM Sans",
              }}
            >
              {it.d}
            </div>
          </Card>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Card accent>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: C.gold,
              fontFamily: "DM Sans",
              marginBottom: 10,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Recommendation
          </div>
          <div
            style={{
              fontSize: 13,
              color: C.wh,
              fontFamily: "DM Sans",
              lineHeight: 1.65,
              marginBottom: 12,
            }}
          >
            The{" "}
            <span style={{ color: C.emerald, fontWeight: 600 }}>
              ARIMA(1,0,1)+sGARCH(1,1)
            </span>{" "}
            model is the recommended approach for USB share price forecasting.
            It provides both point forecasts and volatility estimates —
            essential for constructing confidence intervals and managing
            portfolio risk.
          </div>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            <Badge label="R" color={C.emerald} />
            <Badge label="rugarch" color={C.gold} />
            <Badge label="forecast" color={C.cyan} />
            <Badge label="quantmod" color={C.purple} />
            <Badge label="xts" color={C.emerald} />
            <Badge label="ggplot2" color={C.gold} />
          </div>
        </Card>
        <Card>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: C.emerald,
              fontFamily: "DM Sans",
              marginBottom: 10,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Modelling Journey
          </div>
          {[
            {
              m: "Holt-Winters",
              r: "Failed — residual autocorrelation",
              c: C.red,
            },
            {
              m: "ARIMA(1,1,0)",
              r: "Failed — same volatility issue",
              c: C.red,
            },
            {
              m: "ARIMA+GARCH",
              r: "Passed — white noise residuals (p = 0.24)",
              c: C.emerald,
            },
          ].map((it, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                marginBottom: 10,
                padding: "10px 12px",
                borderRadius: 8,
                background: `${it.c}06`,
              }}
            >
              <div
                style={{
                  minWidth: 24,
                  height: 24,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: `${it.c}15`,
                  fontSize: 12,
                  color: it.c,
                  fontWeight: 700,
                }}
              >
                {i + 1}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: C.wh,
                    fontFamily: "DM Sans",
                  }}
                >
                  {it.m}
                </div>
                <div
                  style={{ fontSize: 11, color: it.c, fontFamily: "DM Sans" }}
                >
                  {it.r}
                </div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  ),

  // 16 — THANK YOU
  () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        textAlign: "center",
        position: "relative",
      }}
    >
      <Glow s="400px" t="-60px" l="50%" c={C.emerald} />
      <Glow s="250px" t="60%" l="15%" c={C.gold} d={2} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 50, marginBottom: 20 }}>📈</div>
        <h1
          style={{
            fontSize: 44,
            fontWeight: 400,
            fontFamily: "'Instrument Serif', serif",
            marginBottom: 14,
            color: C.wh,
          }}
        >
          Thank You
        </h1>
        <p
          style={{
            fontSize: 15,
            color: C.ts,
            fontFamily: "DM Sans",
            maxWidth: 460,
            margin: "0 auto 28px",
            lineHeight: 1.6,
          }}
        >
          From raw prices to validated forecasts — data-driven investment
          intelligence.
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            { l: "US Bancorp (USB)", e: "🏦" },
            { l: "47 Years Analysed", e: "📅" },
            { l: "ARIMA + GARCH", e: "📊" },
          ].map((it, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "8px 16px",
                borderRadius: 10,
                background: C.cb,
                border: `1px solid ${C.cbr}`,
              }}
            >
              <span style={{ fontSize: 13 }}>{it.e}</span>
              <span
                style={{ fontSize: 11.5, color: C.ts, fontFamily: "DM Sans" }}
              >
                {it.l}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
];

export default function Presentation() {
  const [cur, setCur] = useState(0);
  const total = slides.length;
  const goN = useCallback(
    () => setCur((s) => Math.min(s + 1, total - 1)),
    [total],
  );
  const goP = useCallback(() => setCur((s) => Math.max(s - 1, 0)), []);
  useEffect(() => {
    const h = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goN();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goP();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [goN, goP]);
  const S = slides[cur];
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: `linear-gradient(170deg,${C.bg} 0%,${C.bg2} 50%,${C.bg3} 100%)`,
        fontFamily: "DM Sans, sans-serif",
        color: C.wh,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      }}
    >
      <style>{`html,body,#root{margin:0;padding:0;width:100%;min-height:100vh;overflow-x:hidden}@keyframes gp{0%{opacity:.3;transform:scale(1)}100%{opacity:.55;transform:scale(1.12)}}@keyframes fi{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}::selection{background:${C.emerald}35}`}</style>
      <div
        style={{
          width: "100%",
          maxWidth: 1400,
          margin: "0 auto",
          padding: "28px 60px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          animation: "fi 0.35s ease",
          boxSizing: "border-box",
        }}
        key={cur}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.025,
            pointerEvents: "none",
            backgroundImage: `linear-gradient(${C.emerald} 1px,transparent 1px),linear-gradient(90deg,${C.emerald} 1px,transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, height: "100%" }}>
          <S />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          padding: "12px 24px",
          background: "rgba(8,14,26,0.85)",
          backdropFilter: "blur(12px)",
          borderRadius: 12,
          border: `1px solid ${C.cbr}`,
          marginBottom: 14,
          alignSelf: "center",
        }}
      >
        <button
          onClick={goP}
          disabled={cur === 0}
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            border: "none",
            cursor: cur === 0 ? "default" : "pointer",
            background: cur === 0 ? `${C.tm}30` : `${C.emerald}18`,
            color: cur === 0 ? C.tm : C.emerald,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
          }}
        >
          ‹
        </button>
        <div style={{ display: "flex", gap: 4 }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCur(i)}
              style={{
                width: i === cur ? 20 : 6,
                height: 6,
                borderRadius: 3,
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                background: i === cur ? C.emerald : `${C.tm}40`,
              }}
            />
          ))}
        </div>
        <button
          onClick={goN}
          disabled={cur === total - 1}
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            border: "none",
            cursor: cur === total - 1 ? "default" : "pointer",
            background: cur === total - 1 ? `${C.tm}30` : `${C.emerald}18`,
            color: cur === total - 1 ? C.tm : C.emerald,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
          }}
        >
          ›
        </button>
        <span
          style={{
            fontSize: 10.5,
            color: C.tm,
            fontFamily: "DM Sans",
            fontWeight: 500,
            marginLeft: 4,
          }}
        >
          {cur + 1} / {total}
        </span>
      </div>
    </div>
  );
}
