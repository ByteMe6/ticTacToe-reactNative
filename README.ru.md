# Tic Tac Toe

Игра «Крестики-нолики» на React Native. Работает на Android, iOS и в браузере.

[English](./README.md)

## Возможности

- Классические крестики-нолики 3×3
- Состояние игры сохраняется между сессиями (AsyncStorage)
- Запускается на Android, iOS и в браузере (react-native-web)

## Запуск

### Веб

```bash
npm install
npm run web
```

### Android

```bash
npm run android
```

### iOS

```bash
npm run ios
```

> Требуется настройка среды React Native: https://reactnative.dev/docs/environment-setup

## Сборка и деплой веб-версии

```bash
npm run deploy
```

Деплоит на GitHub Pages.

## Технологии

- React Native 0.74
- TypeScript
- react-native-web
- AsyncStorage
- Vite (веб-сборка)
