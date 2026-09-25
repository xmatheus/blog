<p align="center">
  <img src="https://github.com/xmatheus/blog/blob/master/public/seo/192_192.png?raw=true" alt="Logo do blog, junção do F mais um M, o F está localizado na perna esquerda do M">
</p>

### My blog :)

Posts escritos em **Markdown**, site estático gerado com **Astro** e hospedado na **Cloudflare**.

### Getting Started

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera dist/
npm run preview  # roda dist/ no runtime local da Cloudflare (wrangler)
npm run deploy   # build + wrangler deploy
```

O ID do Google Analytics fica em `.env.production` (só é usado em builds de produção).
