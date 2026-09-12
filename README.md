## Acesso ao vídeo demonstrativo: https://youtu.be/2i_eVSzrfr4


# Guia de Execução do Projeto Mobile (React Native / Expo)

Bem-vindo ao repositório do nosso aplicativo mobile desenvolvido com **React Native** e **Expo**. Este guia detalha o passo a passo necessário para configurar o seu ambiente de desenvolvimento, instalar as dependências e executar o projeto com sucesso no seu dispositivo físico ou em emuladores.

---

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

1. **Node.js** (versão 18 LTS ou superior recomendada): [Baixar Node.js](https://nodejs.org/)
2. **Gerenciador de Pacotes** (`npm`, que já vem com o Node.js, ou `yarn`).
3. **Expo Go** instalado no seu smartphone (disponível na App Store para iOS ou Google Play Store para Android) caso queira testar diretamente no aparelho físico via túnel.

---

## ⚙️ Instalação

1. Clone o repositório para o seu ambiente local:
   ```bash
   git https://github.com/Fabricio-Krull/AgroVisitApp
   cd AgroVisitApp
   ```

2. Instale todas as dependências do projeto utilizando o `npm`:
   ```bash
   npm install
   ```
   *(Nota: Se preferir, você também pode utilizar `npm i` para o mesmo propósito).*

---

## 🚀 Como Executar o Projeto

O Expo oferece diferentes maneiras de iniciar o servidor de desenvolvimento. O modo túnel (`--tunnel`) é especialmente útil quando você está enfrentando problemas de rede local (firewalls, roteadores corporativos ou redes diferentes entre o PC e o celular).

### Opção 1: Usando o comando do projeto
Se o script estiver configurado no arquivo `package.json`, execute:
```bash
npm run start --tunnel
```

### Opção 2: Usando o comando direto do Expo
Se preferir acionar a ferramenta CLI do Expo diretamente:
```bash
npx expo start --tunnel
```

Assim que o servidor iniciar, um **QR Code** será exibido no seu terminal. 
* **No Android:** Abra o aplicativo **Expo Go**, selecione "Scan QR Code" e aponte a câmera para o código da tela.
* **No iOS:** Abra a câmera nativa do iPhone e aponte para o QR Code (o sistema abrirá automaticamente no aplicativo Expo Go).

---

## 📱 Configuração de Ambiente para Emuladores (Opcional)

Caso prefira rodar o aplicativo em um emulador em vez de um dispositivo físico, siga as configurações abaixo:

### Para Android (Android Studio)
1. Instale o [Android Studio](https://developer.android.com/studio).
2. Configure um **Virtual Device (AVD)** através do *Device Manager*.
3. Defina as variáveis de ambiente necessárias (como `ANDROID_HOME`) no seu sistema operacional.
4. Com o emulador rodando, pressione **`a`** no terminal onde o Expo está rodando para abrir o projeto no Android.

### Para iOS (macOS e Xcode necessários)
1. Instale o [Xcode](https://developer.apple.com/xcode/) através da Mac App Store.
2. Instale as ferramentas de linha de comando do Xcode.
3. Com o simulador do iOS aberto, pressione **`i`** no terminal onde o Expo está rodando para abrir o projeto no iOS.

---

## 🛠️ Solução de Problemas (Troubleshooting)

* **Erro de dependências ou módulos faltando:**
  Caso encontre erros inesperados após atualizar pacotes, limpe o cache e reinstale as dependências:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

* **Problemas com o túnel (`--tunnel`):**
  O modo túnel utiliza o serviço *Ngrok*. Caso ele falhe ao iniciar ou apresente lentidão, verifique se há VPNs ativas ou firewalls bloqueando a conexão de rede externa.

* **Limpando o cache do Metro Bundler:**
  Se o aplicativo apresentar comportamentos estranhos ou cache corrompido, inicie o servidor limpando o cache:
  ```bash
  npx expo start -c
  ```