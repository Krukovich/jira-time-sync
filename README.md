<div align="center">

# ⏱ Time Sync

**Десктопный компаньон для разработчиков: задачи из Jira, трекинг времени и отправка worklog в один клик.**

[![Electron](https://img.shields.io/badge/Electron-44-47848F?logo=electron&logoColor=white)](https://www.electronjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PGlite-PostgreSQL-4169E1?logo=postgresql&logoColor=white)](https://pglite.dev/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

</div>

---

## 📖 О проекте

**Time Sync** — это local-first десктопное приложение, которое объединяет в одном окне всё, что нужно разработчику для ежедневной работы с задачами и временем:

- 📋 **Список задач** из Jira с дедлайнами и прогрессом
- ⏱ **Встроенный таймер** с привязкой к задаче
- 📊 **Прогресс дня** — сколько уже затрекано и сколько осталось до 8 часов
- ⚡ **Non-dev задачи** — для встреч, созвонов и «overhead», которые обновляются каждый квартал
- 📝 **Лог времени** за день с возможностью редактирования
- 🚀 **Submit All** — отправка всех записей в Jira одним кликом

Никаких облаков, никаких подписок, никакой телеметрии. Все данные хранятся **локально** в PostgreSQL (через PGlite в WebAssembly) прямо внутри приложения.

### 🎯 Для кого это

Для разработчиков, которые:
- Устали от переключения между Jira, трекером времени и терминалом
- Хотят видеть **реальную картину дня**, а не отдельные куски
- Ценят скорость и приватность
- Работают в командах, где Jira — основной инструмент

---

## ✨ Возможности

### 🗂 Управление задачами
- Синхронизация задач из Jira через JQL (`assignee = currentUser() AND duedate IS NOT EMPTY`)
- Кэширование задач локально для работы офлайн
- Подсветка просроченных и срочных задач
- Прогресс-бар «затрекано / оценка» для каждой задачи

### ⏱ Таймер
- Старт / пауза / стоп для конкретной задачи
- Сохранение сессий локально (переживают перезапуск приложения)
- Автоматическая привязка времени к нужной задаче

### 📊 Прогресс дня
- Визуальный прогресс-бар до 8-часовой цели
- Цветовая индикация:
    - 🔴 `< 50%` — критично мало
    - 🟡 `50–85%` — близко к цели
    - 🟢 `85–110%` — он-трек
    - 🔵 `> 110%` — переработка
- Раздельная статистика Dev vs Non-dev

### ⚡ Non-dev задачи
- Отдельная категория для встреч, созвонов и administrative work
- Автоматическое обновление **каждый квартал** (Q4 2026 → Q1 2027)
- Быстрые кнопки `+15м`, `+30м`, `+1ч`, `Свой интервал`

### 📝 Лог за день
- Таймлайн всех сессий с группировкой по задачам
- Inline-редактирование до отправки
- Подсветка неотправленных записей
- Общая сумма затреканного

### 🚀 Submit All
- Отправка **всех** несинхронизированных записей в Jira одной кнопкой
- Прогресс-бар с количеством отправленных/оставшихся
- Обработка частичных сбоев (что ушло, что нет)
- Отдельная обработка ошибок для каждой задачи

### 🔐 Безопасность
- Jira API-токен шифруется через `safeStorage` (Keychain / DPAPI / libsecret)
- `contextIsolation: true`, `nodeIntegration: false`, `sandbox: false`
- Renderer-процесс **никогда** не получает доступ к базе данных напрямую
- Все IPC-сообщения валидируются в Main-процессе
- Строгий CSP в `index.html`

---

## 🛠 Стек технологий

| Слой | Технология                 | Зачем |
|---|----------------------------|---|
| **Runtime** | Electron 44                | Кроссплатформенный десктоп |
| **UI** | React 19 + TypeScript 6    | Типизированный UI |
| **Сборка** | Webpack 5 + ts-loader      | Бандлинг Main / Preload / Renderer |
| **Состояние** | Zustand                    | Лёгкое управление состоянием |
| **БД** | PGlite (PostgreSQL в WASM) | Полноценный PostgreSQL локально |
| **ORM** | Drizzle ORM                | Типобезопасные запросы + миграции |
| **UI-иконки** | lucide-react               | Минималистичные иконки |
| **Jira API** | REST API v3                | Задачи, worklog |
| **Качество кода** | ESLint 10 + Prettier       | Линтинг и форматирование |
| **Git hooks** | Husky + lint-staged        | Pre-commit проверки |

---

## 🚀 Быстрый старт

### Требования
- **Node.js** 20+
- **Yarn** 4+ (`corepack enable`)
- **Git**

### Установка

```bash
# Клонируем репозиторий
git clone https://github.com/your-username/jira-time-sync.git
cd jira-time-sync

# Устанавливаем зависимости
yarn install

# Генерируем миграции для PGlite
yarn db:generate
```

### Настройка Jira

1. Создайте API-токен: [id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens)
2. Запустите приложение и откройте **Настройки**
3. Укажите:
    - **Jira URL**: `https://your-domain.atlassian.net`
    - **Email**: ваш email от Atlassian
    - **API Token**: токен из шага 1
4. Нажмите **Проверить подключение**

Токен будет зашифрован и сохранён в системном хранилище (Keychain / DPAPI / libsecret).

### Запуск в dev-режиме

```bash
# Всё сразу (Main + Preload + Renderer + Electron)
yarn dev
```

Или по отдельности, в четырёх терминалах:

```bash
yarn dev:main       # Webpack watch для Main-процесса
yarn dev:preload    # Webpack watch для Preload
yarn dev:renderer   # Dev-server для React (http://localhost:3000)
yarn start          # Запуск Electron
```

### Сборка

```bash
# Сборка под текущую платформу
yarn build

# Или под конкретную
yarn pack:win
yarn pack:mac
yarn pack:linux
```

Готовые установщики появятся в папке `release/`.

> ⚠️ **Важно**: собрать `.dmg` для macOS можно **только на macOS**. Для остальных платформ можно использовать GitHub Actions.

---

## 🏗 Архитектура

```
┌─────────────────────────────────────────────────────────────┐
│                    Electron Main Process                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  PGlite DB   │  │  Jira API    │  │  safeStorage     │  │
│  │  (WASM)      │  │  Client      │  │  (токены)        │  │
│  └──────┬───────┘  └──────┬───────┘  └────────┬─────────┘  │
│         │                 │                    │            │
│         └─────────────────┼────────────────────┘            │
│                           │ ipcMain.handle                  │
└───────────────────────────┼─────────────────────────────────┘
                            │ contextBridge (preload)
┌───────────────────────────┼─────────────────────────────────┐
│                  Renderer (React + TS)                       │
│              window.api.tasks.list() / addWorklog()          │
└─────────────────────────────────────────────────────────────┘
```

### Структура проекта

```
jira-time-sync/
├── src/
│   ├── main/                  # Electron Main-процесс
│   │   ├── index.ts           # Точка входа
│   │   ├── database.ts        # PGlite + Drizzle
│   │   ├── auth.ts            # safeStorage для токенов
│   │   ├── jira-client.ts     # Jira REST API
│   │   └── ipc-handlers.ts    # IPC-обработчики
│   ├── preload/
│   │   └── index.ts           # contextBridge
│   ├── renderer/              # React UI
│   │   ├── App.tsx
│   │   ├── components/
│   │   ├── views/
│   │   ├── mocks/
│   │   └── styles/
│   └── shared/                # Общий код
│       ├── schema.ts          # Drizzle-схема
│       └── types.ts           # Общие типы
├── drizzle/                   # Миграции БД
├── webpack.*.config.js        # Конфиги сборки
├── drizzle.config.ts
├── tsconfig.json
└── package.json
```

### Ключевые решения

**Почему PGlite, а не SQLite?**
PGlite — это полноценный PostgreSQL, скомпилированный в WASM. Он даёт **100% совместимость с продакшн-PostgreSQL**: одна и та же схема, миграции и запросы через Drizzle. Если однажды понадобится серверная синхронизация — миграция будет тривиальной.

**Почему токены в `safeStorage`, а не в БД?**
База данных лежит на диске в открытом виде. API-токен Jira — это ключ ко всей вашей рабочей среде. Шифрование через системное хранилище (Keychain на macOS, DPAPI на Windows, libsecret на Linux) гарантирует, что даже при краже файлов БД токен останется недоступен.

**Почему Renderer не имеет доступа к БД?**
Это принцип наименьших привилегий. Renderer — это веб-страница, и любой XSS (например, через вредоносный комментарий в задаче Jira) может скомпрометировать всё, что доступно из JS. Ограничивая доступ именованными IPC-операциями, мы минимизируем поверхность атаки.

---

## 📅 Roadmap

### ✅ v1.0 — MVP (текущая разработка)
- [x] Layout и дизайн-система
- [x] Моки данных для UI
- [x] Тёмная/светлая тема (переключатель)
- [x] Локализация RU/EN (переключатель)
- [ ] PGlite + Drizzle (схема, миграции)
- [ ] Jira-клиент (fetch issues, add worklog)
- [ ] Экран настроек Jira с `safeStorage`
- [ ] Таймер с сохранением сессий
- [ ] Submit All с обработкой ошибок
- [ ] Non-dev квартальные задачи
- [ ] Прогресс дня и лог времени

### 🚧 v1.1 — Полировка
- [ ] Статистика с графиками (recharts)
- [ ] Экспорт лога в CSV / JSON
- [ ] Горячие клавиши (`Ctrl+Shift+S` — старт/стоп)
- [ ] Напоминания (уведомления Electron)
- [ ] Резервное копирование БД

### 🔮 v2.0 — Расширение
- [ ] Интеграция с Toggl Track / WakaTime
- [ ] MCP-сервер для AI-агентов (доступ к задачам и логу)
- [ ] Поддержка Jira Server / Data Center (PAT)
- [ ] OAuth 2.0 вместо API-токенов
- [ ] Синхронизация между устройствами (опционально, E2E-шифрование)

---

## 🧪 Разработка

### Полезные команды

```bash
yarn start            # Сборка под текущую платформу
yarn lint             # ESLint
yarn format           # Prettier
```

### Соглашения

- **Коммиты**: [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, `docs:`)
- **Ветки**: `main` — стабильная, `feat/*` и `fix/*` — рабочие
- **Стиль**: Prettier применяется автоматически через pre-commit hook

### Git hooks

Настроены через Husky + lint-staged:
- **pre-commit**: Prettier переформатирует staged-файлы
- **pre-push** (опционально): ESLint проверяет весь проект

---

## 🤝 Вклад

Проект находится на ранней стадии, и я открыт к предложениям. Если хочешь помочь:

1. Форкни репозиторий
2. Создай ветку (`git checkout -b feat/amazing-feature`)
3. Закоммить изменения (`git commit -m 'feat: add amazing feature'`)
4. Запушь (`git push origin feat/amazing-feature`)
5. Открой Pull Request

### Что особенно приветствуется
- 🐛 Сообщения о багах с шагами воспроизведения
- 💡 Идеи для новых фич (особенно вокруг AI-интеграций)
- 📖 Улучшения документации
- 🌍 Переводы интерфейса

---

## 📄 Лицензия

MIT © [Krukovich Alexey]

---

<div align="center">

**Сделано с ❤️ для разработчиков, которые ценят своё время**

[⬆ Наверх](#-time-sync)

</div>