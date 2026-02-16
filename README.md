# flappy-bird-game

A lightweight browser implementation of Flappy Bird built with plain HTML, CSS, and JavaScript.

## Quick start (play in under 1 minute)

1. Open a terminal.
2. Go to this project folder:

   ```bash
   cd /workspace/flappy-bird-game
   ```

3. Start a local web server:

   ```bash
   python3 -m http.server 8000
   ```

4. Open this exact URL in your browser:

   <http://localhost:8000/index.html>

## Controls

- **Space** to flap
- **Click / tap** to flap
- **Restart** button to reset after a game over

## Troubleshooting

### "Not Found" or 404 page

Usually this means the server was started from the wrong folder. Stop it (`Ctrl+C`) and run:

```bash
cd /workspace/flappy-bird-game
python3 -m http.server 8000
```

Then open:

- <http://localhost:8000/index.html>

### Port 8000 already in use

Use another port, for example:

```bash
python3 -m http.server 8080
```

Then open:

- <http://localhost:8080/index.html>
