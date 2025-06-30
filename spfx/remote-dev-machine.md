[[_TOC_]]

# SSH-Key pair erstellen

- ein Verzeichnis auf c:\ erstellen wir nennen dies "C:\SSH"
- CMD öffnen
- Befehl ausführen `ssh-keygen -t rsa -b 4096`
  - Pfad: `C:\ssh\ubuntu` (der empfohlene pfad ist schreibgeschützt. wir müssen dort aber Sachen hin kopieren daher merken!)
  - Passphrase => Passwort eingeben und merken!
- es werden eine "ubuntu.pub" (public key) und eine "ubuntu" (private key, ohne Datei Endung) erstellt
- den private key nach "C:\Users\\{Benutzer-name}\\.ssh\\" kopieren
- den public key benötigen wir im nächsten schritt

# Visual Studio Code einrichten

- unter "C:\Users\\{Benutzer-name}\\.ssh" die "config" Datei öffnen
- folgenden Eintrag einfügen:
```
Host {freiername} {hostname}
  HostName {ip}
  User {Benutzer-name}
  IdentityFile ~/.ssh/ubuntu
```

# VM für Visual Studio Code vorbereiten

VSCode kann nicht auf die Maschine zugreiffen so lange AllowTcpForwarding deaktiviert ist.

- sshd config editieren:
  - `sudo vim /etc/ssh/sshd_config` 
  - __i__ drücken um im File schreiben zu können und "AllowTcpForwarding" auf "yes" stellen (unten im Fenster sollte -INSERT- entstehen, damit wird angezeigt, das man im Bearbeitungsmodus ist)
  - anschließend "Esc" drücken damit vim wieder auf Befehle wartet. __:wq__ eintippen um zu speichern und zu beenden
- reboot um die änderungen wirksam zu machen: `sudo reboot`

# Visual Studio Code mit VM verbinden

- VSCode öffnen
- unten links blauen button drücken
- Verbindung mit {hostname} wählen
- Fingerprint mit "yes" akzeptieren
- ssh password eingeben
- "Linux" wählen (scheint automatisch zu gehen in letzter zeit)

## node installieren

Hinweis: Ab hier kann VSCode verwendet werden!

Im home Verzeichnis des aktuelle Benutzers:
```bash
curl -O https://nodejs.org/dist/v18.20.8/node-v18.20.8.tar.gz
sudo mkdir /usr/local/lib/nodejs
sudo tar -xvf node-v18.20.8-linux-x64.tar.gz -C /usr/local/lib/nodejs
rm -f node-v18.20.8-linux-x64.tar.gz
```
## Path aktualisieren

- Mit VSCode einfach das home Verzeichnis öffnen
- Datei `.bashrc` öffnen
- folgendes ganz am ende der datei einfügen

```bash
# add nodejs to PATH
VERSION=v18.20.8
DISTRO=linux-x64
export PATH=/usr/local/lib/nodejs/node-v18.20.8-linux-x64/bin:$PATH
```

Test durch temporär PATH hinzufügen (kann übersprungen werden):
```bash
export PATH="/usr/local/lib/nodejs/node-v18.20.2-linux-x64/bin:$PATH"
```

## npm einrichten

folgendes basiert auf <https://stackoverflow.com/questions/10081293/install-npm-into-home-directory-with-distribution-nodejs-package-ubuntu> und <https://medium.com/@ExplosionPills/dont-use-sudo-with-npm-5711d2726aa3>

Erstelle in deinem home verzeichnis den ordner `.npm-packages` nutze folgende commands weil punkt am anfang kann vscode nicht:

``` bash
NPM_PACKAGES="$HOME/.npm-packages"
mkdir -p "$NPM_PACKAGES"
```

Datei `.npmrc`, im home verzeichnis, erstellund und folgendes einfügen:
``` bash
registry=https://artifacts.xxx.de/artifactory/api/npm/npm-virtual-npmrc-default
regist=
prefix = /home/{BENUTZER-NAME}/.npm-packages
```

edit `.bashrc` und füge ganz OBEN hinzu:
```bash
# NPM packages in homedir
NPM_PACKAGES="$HOME/.npm-packages"

# Tell our environment about user-installed node tools
PATH="$NPM_PACKAGES/bin:$PATH"
# Unset manpath so we can inherit from /etc/manpath via the `manpath` command
unset MANPATH  # delete if you already modified MANPATH elsewhere in your configuration
MANPATH="$NPM_PACKAGES/share/man:$(manpath)"

# Tell Node about these packages
NODE_PATH="$NPM_PACKAGES/lib/node_modules:$NODE_PATH"
```

wir müssen neu starten
```bash
sudo reboot
```

# Globale npm Packete installieren

## tl;dr

``` 
npm install gulp-cli yo @microsoft/generator-sharepoint --global
```

## ganze doku

https://learn.microsoft.com/de-de/sharepoint/dev/spfx/set-up-your-development-environment

# SPFX mit YoMan generieren

in einen Ordner wechseln in dem man arbeiten möchte

## tl:dr

```
yo @microsoft/sharepoint
```

## ganze doku

https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part


# Gitlab Setup

## PAC erzeugen

Mit einem Browser euer Gitlab aufrufen und in den einstellungen einen PAC (Personal access token) generieren direkt link: 

`https://gitlab.xxx.de/-/user_settings/personal_access_tokens`

optionen:
- API

## user und email einrichten

Beispiel BENUTZER NAME:
```
git config --global user.name "BENUTZER NAME"
git config --global user.email "mail@provider.com"
```

## clone code

Beispiel:
```
git clone https://{BENUTZER}:{pac-token}@gitlab.xxx.de/sharepoint/xxx.git
cd xxx
npm install
npm i -g gulp
gulp trust-dev-cert

```



