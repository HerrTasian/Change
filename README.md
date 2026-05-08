# Digital Incentive Framework Prototype

Mehrseitiger Website-Prototyp für eine Uni-Abgabe zum Thema **„Anreizsystem für die digitale Transformation eines Unternehmens“**.

## Lokal starten

Für die lokale Vorschau brauchst du nur Node.js:

```bash
npm install
npm run dev
```

Danach im Browser öffnen:

```text
http://localhost:4173
```

## Direkt über GitHub Pages hosten

Der Prototyp ist für GitHub Pages vorbereitet. Die veröffentlichbare Version liegt im Ordner `docs/`.

1. Änderungen zu GitHub pushen.
2. Im GitHub-Repository öffnen: **Settings → Pages**.
3. Unter **Build and deployment** die Quelle **Deploy from a branch** auswählen.
4. Als Branch deinen Arbeitsbranch oder `main` wählen.
5. Als Ordner **/docs** wählen und speichern.
6. Nach kurzer Zeit zeigt GitHub die öffentliche Pages-URL an.

Die Seite nutzt Hash-Routing (`#/benefits`, `#/concept` usw.). Dadurch funktionieren die Unterseiten auch dann zuverlässig, wenn GitHub Pages das Projekt unter einer Repository-Unteradresse wie `https://name.github.io/repo/` ausliefert.

## Build aktualisieren

Wenn du Inhalte oder Code änderst, aktualisiere vor dem Push den GitHub-Pages-Ordner:

```bash
npm run build
```

Der Build kopiert die statischen Dateien nach `dist/` und `docs/`. `dist/` ist nur lokale Build-Ausgabe; `docs/` ist bewusst versioniert, damit GitHub Pages direkt daraus hosten kann.

## Inhalte bearbeiten

Alle austauschbaren Beispielinhalte liegen zentral in:

```text
src/content/siteContent.js
```

Dort sind Deutsch (`de`) und Englisch (`en`) parallel organisiert. Neue Zielgruppen, Benefits, Widerstände oder KPI-Elemente können durch Ergänzen der jeweiligen Arrays hinzugefügt werden.

## Struktur

- `src/main.js` – Routing, Layout, Komponenten und Seitenlogik
- `src/content/siteContent.js` – bilinguale Demo-Inhalte und Navigationsdaten
- `src/styles.css` – responsives Design, Kartenlayouts, Interaktionen und visuelle Hierarchie
- `docs/` – statische Version für GitHub Pages

## Seiten

- Overview / Startseite
- Target Groups / Zielgruppen
- Benefits & Incentives
- Resistance & Solutions / Widerstände & Lösungen
- Economic Impact / Wirtschaftliche Auswirkungen
- Incentive System / Konzept
- Conclusion / Fazit
