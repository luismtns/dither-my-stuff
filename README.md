<img src="./public/logo.gif" width="128" style="margin:0 auto;display:block;" />

<h1 style="font-family: serif; font-size: 3.5rem; letter-spacing: 0.4rem; line-height:0.5;"><s>Dither</s><span style="font-family: serif; font-size: 80%; letter-spacing:0; font-weight: normal;">&nbsp;my stuff</span></h1>

An interactive image dithering playground using Floyd–Steinberg and Bayer algorithms with customizable color palettes and pixelation scale. Built with React, Vite, and Mantine.

![Screenshot 1](./screenshots/1.png)

#### 🟢 App available at [dither-my-stuff.vercel.app](https://dither-my-stuff.vercel.app/)

---

## 🚀 Tech Stack

- [React 18](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Mantine UI](https://mantine.dev/)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

---

## 🧪 Features

- Image upload support
- Choose between most common dithering algorithms
- Preset color palettes (Black & White, Sepia, GameBoy, Cyberpunk)
- Add custom color palette using HEX values
- Adjustable gray levels and pixel scale
- Real-time canvas rendering + image download

---

## 📦 Local Setup

1. **Clone the repository:**

```bash
git clone https://github.com/luismtns/dither-my-stuff.git
cd dither-my-stuff
```

2. **Install dependencies:**

```bash
yarn
```

3. **Run the project:**

```bash
yarn dev
```

4. Visit: [http://localhost:5173](http://localhost:5173)

---

## 🛠️ Scripts

```bash
yarn dev        # start development server
yarn build      # build for production
yarn preview    # locally preview the production build
yarn lint       # run ESLint + Prettier
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork this repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: your feature"`
4. Push to your fork: `git push origin feature/your-feature`
5. Open a Pull Request 🎉

---

## 📁 Folder Structure

```bash
src/
├── assets/            # images and presets
├── components/        # UI and reusable components
├── hooks/             # custom React hooks
├── utils/             # helpers and algorithms
├── App.tsx            # main app component
├── main.tsx           # app entry point
```

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## 💡 Inspiration

Inspired by retro filters, TikTok/Instagram effects, and tools like [Photomosh](https://photomosh.com/).

---

## 🌐 Deployment

- [Vercel](https://dither-my-stuff.vercel.app/)

---

## ✨ Future Improvements

### 🚧 WIP

- Parametrized dithering algorithms
- Improve custom color palettes UX

---

Made with 💛 by [Luis Bovo](https://luisbovo.com)

![footer-dither.gif](./public/footer-dither.gif)
