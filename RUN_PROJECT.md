# Run DeadMan Protocol

## Start Everything

```bash
./start.sh start
```

## Access

- **Web:** http://localhost:7000
- **Mobile:** Scan QR code with Expo Go
- **Backend:** http://localhost:7001
- **Blockchain:** http://localhost:8545

## Stop

Press `Ctrl+C` or run:
```bash
./start.sh stop
```

## First Time Setup

```bash
# Install all dependencies
./start.sh install

# Then start
./start.sh start
```

## Mobile App

1. Install **Expo Go** on phone:
   - iOS: https://apps.apple.com/app/expo-go/id982107779
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

2. Run `./start.sh start`

3. Scan QR code from terminal

4. App loads on phone!

## Commands

```bash
./start.sh start    # Start all services
./start.sh stop     # Stop all services
./start.sh status   # Check what's running
./start.sh install  # Install dependencies
```

## Troubleshooting

**Port in use:**
```bash
./start.sh stop
./start.sh start
```

**Check status:**
```bash
./start.sh status
```

**View logs:**
```bash
tail -f backend.log
tail -f web.log
tail -f mobile.log
tail -f hardhat-node.log
```

## What Runs

| Service | Port | Description |
|---------|------|-------------|
| Blockchain | 8545 | Hardhat Ethereum node |
| Backend | 7001 | NestJS REST API |
| Web | 7000 | Next.js web app |
| Mobile | 8081 | Expo mobile app |

All services start automatically with `./start.sh start`

