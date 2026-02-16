# flappy-bird-game

A lightweight browser implementation of Flappy Bird built with plain HTML, CSS, and JavaScript.

## What this project is

This is a **static web game**. It does **not** need a database, backend API, Docker, or npm packages.
You only need to serve the files and open them in a browser.

---

## Fastest way to start (recommended)

From this project folder, run:

```bash
./start-game.sh
```

Then open exactly:

- <http://localhost:8000/index.html>

If port 8000 is busy:

```bash
./start-game.sh 8080
```

Then open:

- <http://localhost:8080/index.html>

---

## Manual start (step-by-step)

### 1) Go to the project folder

```bash
cd /workspace/flappy-bird-game
```

### 2) Confirm files exist

```bash
ls
```

You should see: `index.html`, `game.js`, `styles.css`.

### 3) Start a local web server

```bash
python3 -m http.server 8000
```

### 4) Open the game URL

- <http://localhost:8000/index.html>

Keep the terminal running while you play.
Stop the server with `Ctrl+C`.

---

## If localhost still does not work

Use this exact checklist:

1. **Verify Python is available**

   ```bash
   python3 --version
   ```

2. **Verify server is actually running**

   You should see output like:

   ```
   Serving HTTP on 0.0.0.0 port 8000
   ```

3. **Verify the page is reachable from the same machine**

   ```bash
   curl -I http://127.0.0.1:8000/index.html
   ```

   You want `HTTP/1.0 200 OK`.

4. **If port 8000 is in use, switch ports**

   ```bash
   python3 -m http.server 8080
   ```

   Then open:
   - <http://localhost:8080/index.html>

5. **If you are in a remote VM/container/cloud IDE**

   `localhost` may point to the remote machine, not your laptop.
   In that case, use your IDE’s **Port Forwarding / Open Port** feature for the chosen port (8000 or 8080), then open the forwarded URL.

---

## "Not Found" / 404 troubleshooting

This usually means one of these:

- You started the server from the wrong directory.
- You opened `/` from another service instead of this project.
- You used the wrong port.

Fix:

```bash
cd /workspace/flappy-bird-game
python3 -m http.server 8000
```

Open:

- <http://localhost:8000/index.html>

---

## Controls

- **Space** to flap
- **Click / tap** to flap
- **Restart** button to reset after a game over

