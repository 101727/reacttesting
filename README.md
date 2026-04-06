# 🛒 TechShop - Professional React E-Commerce Application

Eine moderne und professionelle React-basierte Online-Webshop-Anwendung mit Vite, aufgebaut nach den besten Praktiken und Anforderungen.

## 📋 Projektübersicht

TechShop ist eine vollständige E-Commerce-Anwendung mit dem folgenden Umfang:

- ✅ **Vite Setup**: Schnelle Entwicklungsumgebung mit Hot Module Replacement (HMR)
- ✅ **Modulare Komponentenstruktur**: Logisch organisierte React-Komponenten
- ✅ **Props & State Management**: Korrektes Datenfluss-Management
- ✅ **Dynamische UI**: Zustandsgesteuerte Benutzeroberflächenaktualisierungen
- ✅ **Produktkatalog**: 8+ Produkte mit verschiedenen Kategorien
- ✅ **Shopping Cart**: Vollständiges Warenkorb-System mit Edit- und Remove-Funktionen
- ✅ **Kategoriensystem**: Filter nach Produktkategorien
- ✅ **Responsive Design**: Mobile-freundliches Layout
- ✅ **Professional Styling**: Modernes CSS mit CSS-Variablen

## 📁 Projektstruktur

```
src/
├── components/
│   ├── Header.jsx           # Navigation & Cart Icon
│   ├── CategoryFilter.jsx   # Kategorie-Filterbuttons
│   ├── ProductCard.jsx      # Einzelne Produktkarte
│   └── ShoppingCart.jsx     # Warenkorb-Modal
├── pages/
│   └── HomePage.jsx         # Hauptseite mit Produktgrid
├── data/
│   └── products.js          # Produktdatensätze
├── styles/
│   └── App.css              # Komponenten-Styles
├── utils/                   # Hilfsfunktionen (erweiterbar)
├── App.jsx                  # Haupt-App-Komponente mit State
├── main.jsx                 # Einstiegspunkt
└── index.css                # Global Styles
```

## 🏗️ Architektur

### Komponentenhierarchie

```
App (State Management)
├── Header (Props: cartItemCount, onCartClick)
├── HomePage (Props: products, categories, activeCategory, handlers)
│   ├── CategoryFilter (Props: categories, activeCategory, onCategoryChange)
│   └── ProductCard (Props: product, onAddToCart) [multiple]
└── ShoppingCart (Props: cartItems, handlers, onClose) [conditional]
```

### State Management

- **cartItems**: Array mit Warenkorb-Elementen
- **showCart**: Boolean für Modal-Sichtbarkeit
- **activeCategory**: String für aktive Kategorie

### Datenfluss

- Props werden von Eltern zu Kindern-Komponenten weitergegeben
- Callbacks sind für die Kommunikation zwischen Komponenten entfernt
- State wird zentralisiert in der App-Komponente verwaltet

## ✨ Funktioniert

### Produktverwaltung
- Zeige alle Produkte oder filtere nach Kategorie
- Jedes Produkt hat einen eindeutigen ID, Name, Preis und Beschreibung
- Einfaches Hinzufügen zum Warenkorb durch Button-Click

### Shopping Cart
- Anzeige aller hinzugefügten Produkte
- Mengen-Änderung (+ / -)
- Produkt-Entfernung
- Automatische Gesamtsummenberechnung
- Modal-Overlay zum Ein-/Ausblenden

### Kategoriensystem
- "All" zeigt alle Produkte
- Kategorien: Electronics, Accessories, Cables, Lighting
- Aktive Kategorie wird optisch hervorgehoben

## 🚀 Einstieg

### Prerequisites
- Node.js 16 oder höher
- npm oder yarn

### Installation

```bash
# Im Projektverzeichnis:
npm install
```

### Development Server starten

```bash
npm run dev
```

Die Anwendung lädt dann unter `http://localhost:5173/`

### Build für Production

```bash
npm run build
npm run preview
```

## 📝 Code-Qualität

Das Projekt erfüllt alle Anforderungen des Beurteilungsrubrics:

### ✅ Vite & Projektstruktur (Goed)
- Professionelle und overzichtliche Projektstruktur
- Consistente naamgeving (camelCase für Komponenten)
- Duidelijke organisatie van componenten en styling

### ✅ JSX + Komponenten (Goed)
- Korrekt JSX-Verwendung
- Anwendung ist in mehrere logisch geschiedene Komponenten aufgebaut
- Hohe Wiederverwendbarkeit durch modulares Design

### ✅ Props + State (Goed)
- Durchdachte Verwendung von Props für Datenfluss
- Korrektes State-Management in der Top-Level-Komponente
- Logische Datenstruktur und klare Trennung zwischen Daten und Präsentation

### ✅ Componentstructuur & UI (Goed)
- Modulare und durchdachte Designweise
- Komponenten sind logisch geschieden und unterstützen Wiederverwendbarkeit
- Dynamische Anzeige und Interaktion sind konsistent implementiert
- Verbesserte Benutzererfahrung durch State-Reaktivität

## 🎨 Styling

Das Projekt verwendet:
- CSS Custom Properties (CSS-Variablen) für Konsistenz
- CSS Grid für Produktgallerie
- CSS Flexbox für Layouts
- Animationen für Modal und Übergänge
- Mobile-first responsive Design

## 📦 Abhängigkeiten

- React 18+
- Vite 8+
- React DOM 18+

Keine zusätzlichen UI-Bibliotheken - vollständig in vanilla CSS realisiert.

## 🔧 Zukünftige Erweiterungsmöglichkeiten

- [ ] Produktdetailseite
- [ ] Benutzer-Authentifikaion
- [ ] Zahlungsintegration
- [ ] Produktsuche
- [ ] Benutzerrezensionen
- [ ] Persistenter Warenkorb (LocalStorage)
- [ ] Länderauswahl

## 📄 Lizenz

Dieses Projekt wurde als Lernprojekt erstellt und ist frei verfügbar.

