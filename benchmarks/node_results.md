# Node.js Baseline Benchmark

This document records the baseline performance of the Node.js API before implementing the Rust version.

The goal of this project is to demonstrate performance improvements when replacing a Node.js backend with Rust.

Load testing was performed using **k6**.

---

## Test Environment

- Runtime: Node.js
- Framework: Express
- Database: PostgreSQL
- Cache: Redis
- Load testing tool: k6
- Test machine: local development environment

---

## Test Configuration

Each endpoint was tested with:

- 100 virtual users
- 30 second duration

Example command:

k6 run k6-script.js

---

# Benchmark Results

## /products

Simulates a typical API endpoint using cache + database.

Requests/sec: **1594 req/s**

Average latency: **62 ms**  
Median latency: **57 ms**  
p95 latency: **98 ms**

---

## /products-cache

Reads product list directly from Redis.

Requests/sec: **1248 req/s**

Average latency: **79 ms**  
Median latency: **67 ms**  
p95 latency: **154 ms**

---

## /products-db

Reads directly from PostgreSQL and performs additional CPU processing.

Requests/sec: **736 req/s**

Average latency: **135 ms**  
Median latency: **120 ms**  
p95 latency: **227 ms**

---

## /products-heavy

Simulates a heavier backend workload.

Operations performed:

- Two database queries
- CPU intensive calculation

Requests/sec: **557 req/s**

Average latency: **178 ms**  
Median latency: **162 ms**  
p95 latency: **262 ms**

---

# Stress Test

Endpoint: **/products-heavy**

Configuration:

- 500 virtual users
- 30 seconds

Results:

Requests/sec: **499 req/s**

Average latency: **947 ms**  
Median latency: **932 ms**  
p95 latency: **1.39 s**

Failed requests: **6.3%**

---

# Observations

Under moderate load the Node.js API performs well, particularly for simple database queries.

However, when CPU-heavy workloads are introduced or concurrency increases significantly, latency grows rapidly and request failures begin to appear.

This behavior is consistent with the single-threaded event loop model used by Node.js.

---

# Next Step

The next stage of this project implements the **same API in Rust using Axum**.

The same load tests will then be executed to measure improvements in:

- throughput
- latency
- system stability under high concurrency
