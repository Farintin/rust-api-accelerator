# Rust API Accelerator

Replacing a Node.js API with Rust to achieve major performance improvements.

This project benchmarks two identical APIs:

1. Node.js + Express
2. Rust + Axum

The goal is to demonstrate:

• lower latency
• higher throughput
• better memory efficiency

Both APIs expose the same endpoint:

GET /products

Load testing is done using k6.

Observability will be added with Prometheus and Grafana.
