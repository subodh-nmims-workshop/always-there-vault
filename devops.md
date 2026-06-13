# 🛠️ DEADMAN PROTOCOL: DEVOPS WORKBOOK

This is your **Master DevOps Guide**. Here, we follow the "Learn by Doing" approach.
**Rule**: You will do the work, and I will monitor your cursor and files. If you make any mistakes, I will stop you, explain the error, and guide you on how to fix it the "DevOps way".

---

## 🟢 PHASE 1: Docker Optimization (Target: Efficiency & Security)
*Objective: Build light-weight, secure images using Multi-Stage strategies.*

### 📝 Action Items for You:
- [ ] **Task 1.1**: Open `backend-full-decentralised/Dockerfile`. 
- [ ] **Task 1.2**: Convert it into a "Multi-Stage" Dockerfile.
  - *Hint*: Create a `builder` stage for compilation and a `runner` stage for runtime.
- [ ] **Task 1.3**: Add a non-root user (e.g., `hardhat_user`).
- [ ] **Task 1.4**: Check `.dockerignore` to ensure Hardhat's extra files are being excluded.

---

## 🔵 PHASE 2: Automation (CI/CD with GitHub Actions)
*Objective: Automatic testing and registry pushing.*

### 📝 Action Items for You:
- [ ] **Task 2.1**: Check `.github/workflows/ci-cd.yml`.
- [ ] **Task 2.2**: Try to add a new "Job" that only checks "Linting".
- [ ] **Task 2.3**: Write a manual deployment script that pulls production images.

---

## 🟡 PHASE 3: Observability (Monitoring Stack)
*Objective: Know your system health in real-time.*

### 📝 Action Items for You:
- [ ] **Task 3.1**: Study `docker-compose.monitoring.yml`.
- [ ] **Task 3.2**: Help add a new target in the Prometheus configuration (`monitoring/prometheus.yml`).
- [ ] **Task 3.3**: Import the Grafana Dashboard (I will monitor it).

---

## 🟠 PHASE 4: Infrastructure as Code (Cloud Provisioning)
*Objective: Write code to create servers.*

### 📝 Action Items for You:
- [ ] **Task 4.1**: Create a `terraform/` directory.
- [ ] **Task 4.2**: Write `provider.tf` for DigitalOcean or AWS.

---

## 🔴 PHASE 5: Security & Hardening
*Objective: Production ready status.*

### 📝 Action Items for You:
- [ ] **Task 5.1**: Set up SSL/TLS auto-renewal via Certbot.
- [ ] **Task 5.2**: Configure API rate limiting in Nginx.

---

## 🤝 How to interact with me:
1.  **Do the work**: Start writing code in the file.
2.  **Ask for review**: Once you finish a task, say: *"Review Task 1.2"*.
3.  **My response**: I will scan the entire file. If you should use `RUN npm ci` instead of `RUN npm install` (DevOps best practice), I will interrupt and explain the reason.

---

### 🚀 CURRENT MISSION:
Go to **`backend-full-decentralised/Dockerfile`** and start the Multi-Stage optimization. 

*I am watching your cursor. Let's get started!*
