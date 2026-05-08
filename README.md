# Digital Incentive Framework Prototype

Mehrseitiger Website-Prototyp für eine Uni-Abgabe zum Thema **„Anreizsystem für die digitale Transformation eines Unternehmens“**.

## Starten

```bash
npm install
npm run dev
```

Für einen Produktions-Build:

```bash
npm run build
```

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

## Seiten

- Overview / Startseite
- Target Groups / Zielgruppen
- Benefits & Incentives
- Resistance & Solutions / Widerstände & Lösungen
- Economic Impact / Wirtschaftliche Auswirkungen
- Incentive System / Konzept
- Conclusion / Fazit
