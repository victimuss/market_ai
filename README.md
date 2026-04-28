# ⚡️ Market.AI — Crypto HUD Interface

Мобильное приложение на React Native (Expo), представляющее собой концептуальный дашборд для отслеживания криптовалют в стиле "Cyberpunk / Hacker HUD". Проект объединяет живые данные с агрессивным визуальным стилем и тактильным откликом.

## 🚀 Основные фишки

- 🎞 **Video Background:** Бесшовный зацикленный фон с глитч-эффектами через `expo-video`.
- 🔐 **Cipher Decode Effect:** Анимированное появление текста через «расшифровку» случайных символов с настраиваемым интервалом повторения.
- 📳 **Haptic Feedback:** Глубокая интеграция с `expo-haptics`. Каждая «расшифрованная» буква отзывается легким тактильным тиком (Selection Click), а завершение процесса — подтверждающим импульсом.
- 📊 **Real-time Data:** Интеграция с **CoinGecko API** для получения актуальных курсов ТОП-7 криптовалют.
- 🔄 **Pull-to-Refresh:** Механика обновления данных свайпом вниз с визуальным индикатором в стиле интерфейса.

## 🛠 Технологический стек

- **Framework:** React Native (Expo SDK 54+)
- **Navigation:** Expo Router
- **Video:** `expo-video` (новейший нативный API)
- **Haptics:** `expo-haptics`
- **Networking:** Axios
- **Icons/Fonts:** Lucide React / Monospace System Fonts

## 📦 Установка и запуск

1. **Клонируйте репозиторий:**
   ```bash
   git clone [https://github.com/your-username/market-ai.git](https://github.com/your-username/market-ai.git)
   cd market-ai
