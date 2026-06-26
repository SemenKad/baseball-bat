# Vladimir Nagorianskii — The Baseball Bat

Многоязычный (10 языков) лендинг + админ-панель с серверным хранением контента,
медиа и аналитики. Статистика собирается со всех посетителей.

## Стек
- **Фронт:** React 19 + Vite + Tailwind (core) + lucide-react
- **Бэк:** Node + Express, файловое хранилище в `server/data/` (без внешней БД)
- Медиа — только локальные файлы из `public/media/` (фото/видео Владимира)

## Запуск (разработка)
```bash
npm install
npm run dev
```
- `npm run dev` поднимает оба процесса (concurrently): Vite на **:5174** и API на **:8787**.
- Vite проксирует `/api` и `/uploads` на API, поэтому фронт ходит по относительным путям.
- Сайт: http://localhost:5174 · Админка: http://localhost:5174/admin/login

Можно запускать по отдельности: `npm run web` (Vite) и `npm run server` (API).

## Доступ в админку
- Логин и пароль задаются в файле `.env` (переменные `ADMIN_EMAIL` и `ADMIN_PASS`).
  Скопируйте шаблон: `cp .env.example .env` и подставьте свои значения.
- `.env` в `.gitignore` и в репозиторий не попадает.
- `/admin/login` — вход, `/admin` — панель (Обзор / Контент / Медиа / Настройки).

## Продакшен (один сервер раздаёт всё)
```bash
npm run build            # собирает фронт в dist/
API_PORT=8080 npm start  # Express отдаёт dist/ + /api + /uploads на одном порту
```
- В проде сервер сам отдаёт собранный фронт и SPA-fallback, отдельный Vite не нужен.
- Порт задаётся переменной **`API_PORT`** (например, прокинуть `API_PORT=$PORT`).
  `process.env.PORT` сервером намеренно игнорируется — в dev его занимает Vite.

## Деплой на Render (в один клик)
В репозитории есть `render.yaml` (Blueprint).
1. На **render.com** → войти через GitHub → **New +** → **Blueprint**.
2. Выбрать репозиторий `SemenKad/baseball-bat` → **Connect**.
3. Render попросит ввести секреты (в репозиторий не попадают):
   - `ADMIN_EMAIL` — email для входа в админку
   - `ADMIN_PASS` — пароль админки
4. **Apply** → через ~3–5 мин будет ссылка `https://<name>.onrender.com`.
- `autoDeploy: true` — каждый `git push` в `main` автоматически выкатывается на прод.
- ⚠️ Free-план: ФС временная — правки контента и аналитика сбрасываются при
  перезапуске/сне сервиса. Для постоянного хранения — платный Disk на
  `server/data/` или вынос данных в БД.

## Данные (всё на сервере, общее для всех)
Хранятся в `server/data/` (в `.gitignore`):
- `content.json` — правки текстов по языкам (поверх встроенных переводов)
- `media.json` — назначения фото/видео на слоты сайта, галерею, пруфы, плеер
- `settings.json` — ссылки соцсетей, дата/вкл каунтдауна
- `uploads.json` + `uploads/` — загруженные через админку изображения
- `events.json` — события аналитики (визиты, клики, секции, языки, видео, подписки)
- `sessions.json` — токены админ-сессий (7 дней)

При первом старте, если событий нет, генерируются помеченные демо-данные
(`demo:true`) — чтобы графики были живыми. Удаляются кнопкой в админке.

## Эндпоинты API (кратко)
`POST /api/auth/login·logout` · `GET /api/auth/me` ·
`GET/PUT /api/content·media·settings` · `GET/POST/DELETE /api/uploads` ·
`POST /api/track` (публичный) · `GET /api/analytics` (auth) ·
`POST /api/analytics/clear-demo·clear-all` · `POST /api/reset`
