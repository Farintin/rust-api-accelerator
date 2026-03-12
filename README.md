# Rust API Accelerator

This project demonstrates how replacing a Node.js backend with Rust can dramatically improve API performance.

The repository benchmarks two identical APIs:

1. Node.js + Express
2. Rust + Axum

Both implementations expose the same endpoints and use the same infrastructure.

---

# Architecture

Node Baseline

Express API  
PostgreSQL database  
Redis caching  
k6 load testing

Rust Version (coming next)

Axum API  
Tokio async runtime  
SQLx database access  
Redis caching  
Prometheus metrics

---

# API Endpoints

The APIs expose identical endpoints to simulate real backend workloads.

GET /products  
Typical API request using cache and database.

GET /products-cache  
Reads product data directly from Redis.

GET /products-db  
Reads product data from PostgreSQL with additional CPU processing.

GET /products-heavy  
Simulates a heavier backend workload including multiple database queries and CPU-intensive operations.

---

# Load Testing

Performance testing is done using **k6**.

Example command:

k6 run load-testing/k6-script.js

Test configuration:

- 100 virtual users
- 30 second duration

---

# Node.js Baseline Results

| Endpoint        | Requests/sec | Avg Latency |
| --------------- | ------------ | ----------- |
| /products       | 1594         | 62 ms       |
| /products-cache | 1248         | 79 ms       |
| /products-db    | 736          | 135 ms      |
| /products-heavy | 557          | 178 ms      |

Stress test (500 users):

Latency increases significantly and request failures begin to appear.

Detailed results are available in:

benchmarks/node_results.md

---

# Goal of This Project

The purpose of this project is to demonstrate:

• higher throughput  
• lower latency  
• improved stability under high concurrency

when moving a backend API from **Node.js to Rust**.

---

# Next Stage

The next step is implementing the same API in Rust using **Axum** and running identical load tests to compare performance.
