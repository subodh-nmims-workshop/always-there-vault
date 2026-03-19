# 🛠️ DEADMAN PROTOCOL: DEVOPS WORKBOOK

Bhai, ye tumhara **Master DevOps Guide** hai. Yaha hum "Learn by Doing" follow karenge. 
**Rule**: Kaam tum karoge aur main tumhare cursor aur files ko monitor karunga. Agar tumse koi galti hogi, toh main tumhe rokunga aur samjhaunga ki kya mistake hai aur use "DevOps way" me kaise fix karna hai.

---

## 🟢 PHASE 1: Docker Optimization (Target: Efficiency & Security)
*Objective: Build light-weight, secure images using Multi-Stage strategies.*

### 📝 Action Items for You:
- [ ] **Task 1.1**: Open `backend-full-decentralised/Dockerfile`. 
- [ ] **Task 1.2**: Ise "Multi-Stage" me convert karo.
  - *Hint*: Ek `builder` stage rakho compilation ke liye aur ek `runner` stage runtime ke liye.
- [ ] **Task 1.3**: Ek non-root user add karo (e.g., `hardhat_user`).
- [ ] **Task 1.4**: `.dockerignore` check karo ki Hardhat ke extra files exclude ho rahi hain ya nahi.

---

## 🔵 PHASE 2: Automation (CI/CD with GitHub Actions)
*Objective: Automatic testing and registry pushing.*

### 📝 Action Items for You:
- [ ] **Task 2.1**: `.github/workflows/ci-cd.yml` ko check karo.
- [ ] **Task 2.2**: Ek naya "Job" add karne ki koshish karo jo sirf "Linting" check kare.
- [ ] **Task 2.3**: Manual deployment script likho jo production images ko pull kare.

---

## 🟡 PHASE 3: Observability (Monitoring Stack)
*Objective: Know your system health in real-time.*

### 📝 Action Items for You:
- [ ] **Task 3.1**: `docker-compose.monitoring.yml` ko study karo.
- [ ] **Task 3.2**: Prometheus configuration (`monitoring/prometheus.yml`) me naya target add karne me help karo.
- [ ] **Task 3.3**: Grafana Dashboard import karo (main monitor karunga).

---

## 🟠 PHASE 4: Infrastructure as Code (Cloud Provisioning)
*Objective: Write code to create servers.*

### 📝 Action Items for You:
- [ ] **Task 4.1**: Create a `terraform/` directory.
- [ ] **Task 4.2**: DigitalOcean ya AWS ke liye `provider.tf` likho.

---

## 🔴 PHASE 5: Security & Hardening
*Objective: Production ready status.*

### 📝 Action Items for You:
- [ ] **Task 5.1**: SSL/TLS auto-renewal via Certbot setup karo.
- [ ] **Task 5.2**: API rate limiting configure karo Nginx me.

---

## 🤝 How to interact with me:
1.  **Do the work**: Tum file me code likhna shuru karo.
2.  **Ask for review**: Jab tum ek task khatam kar lo, bolo: *"Bhai review kar Task 1.2"*.
3.  **My response**: Main pure file ko scan karunga. Agar `RUN npm install` ki jagah `RUN npm ci` use karna chahiye (DevOps best practice), toh main tumhe interrupt karke reason samjhaunga.

---

### 🚀 CURRENT MISSION:
Go to **`backend-full-decentralised/Dockerfile`** and start the Multi-Stage optimization. 

*I am watching your cursor. Chalo shuru karte hain!*
