# Bathroom Full Of Ashes

A Twine story built with Tweego, SugarCube, and Tailwind CSS 4.x.

Play the game at [twine.bombayv.com](https://twine.bombayv.com).

## Prerequisites

- [Bun](https://bun.sh/) - JavaScript runtime and package manager
- [Tweego](https://www.motoslave.net/tweego/) - Command-line Twine compiler (already installed)
- SugarCube story format (already installed in Tweego)

## Development

### Build the story once:
```bash
bun run build
```

This will:
1. Compile Tailwind CSS from `src/styles/main.css` to `dist/style.css`
2. Compile Twine story from `src/` to `dist/index.html`

### Watch mode (recommended for development):
```bash
bun run dev
```

This watches for changes and automatically rebuilds.

### View the story:
Open `dist/index.html` in your browser after building.

## Project Structure

```
.
├── build.js              # Build script
├── src/
│   ├── index.tw         # Main story file with metadata
│   ├── passages/        # Additional passage files
│   │   └── bathroom.tw
│   └── styles/
│       └── main.css     # Tailwind CSS styles
└── dist/                # Build output (generated)
    ├── index.html       # Compiled story
    └── style.css        # Compiled CSS
```

## Writing Your Story

### Twee3 Format
Stories are written in Twee3 format. Each passage starts with `::` followed by the passage name.

### SugarCube Syntax
This project uses SugarCube 2. See the [SugarCube documentation](https://www.motoslave.net/sugarcube/2/docs/) for details.

### Styling with Tailwind CSS
You can use Tailwind CSS classes directly in your passages. Base styles are in `src/styles/main.css`.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details