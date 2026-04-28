# UrbanRental Frontend
## A projektről

>Az **UrbanRental** egy modern webes alkalmazás, amely autók bérlését teszi lehetővé online. A felhasználóknak lehetőséget adunk arra, hogy böngésszenek különböző autókat, foglaljanak időpontot, kezeljék saját profiljukat és foglalásaikat, valamint adminisztrátorok számára teljes körű felügyeleti funkciókkal rendelkezünk. A projekt React 19 alapú SPA (Single Page Application) megoldás, amely gyors, dinamikus felhasználói élményt biztosít.

---
## Készítette:
- Kovács Péter
- Drágán Dániel
# Frontend Felépítése:

1. **Technológia Stacking**
   - React 19.2.0 – Felhasználói felület készítéséhez használt könyvtár
   - Vite 7.3.1 – Gyors fejlesztői szerver és build eszköz
   - React Router DOM 7.13.1 – Oldal navigáció és routing megoldás
   - Bootstrap 5.3.8 – CSS keretrendszer a dizájnhoz
   - React Toastify 11.1.0 – Értesítési üzenetek (toast) kezelése

2. **Csomagok/Middleware-ek:**
   - react: Alap React komponensek és hook-ok
   - react-router-dom: SPA navigáció, route-ok kezelése
   - bootstrap: CSS keretrendszer az UI komponensekhez
   - react-toastify: Rendszerüzenetek (toasts) megjelenítése

---

# Statikus Fájlok:
- /public/pics mappa – Alkalmazás ikonok és képek tárolása
  - urbanRentalLogo.png – Az UrbanRental logója

---

# Útvonalak (Routes):

| URL           |       Komponens            | Funkciók |
| :---          |     :---:                  |                               ---:  |
| /             | MainPage.jsx               | Főoldal – Autók listázása, szűrés |
| /register     | Register.jsx               | Felhasználói regisztráció         |
| /login        | Login.jsx                  | Bejelentkezés                     |
| /logout       | Login.jsx                  | Kijelentkezés (újrairányítás)     |
| /profile      | UserProfile.jsx            | Felhasználói profil szerkesztése  |
| /admin        | AdminPage.jsx              | Adminisztrátori panel             |
| /myreservations | MyReservation.jsx        | Saját foglalások megtekintése     |
| /car/:vehicle_id | ReservationDetail.jsx   | Autó részletek, foglalás          |
| /faq          | FAQ.jsx                    | Gyakran ismételt kérdések         |
| /legal        | Legal.jsx                  | Jogszabályi információk           |

---

# Fő Komponensek:

## Context Komponensek:
- **AuthContext.jsx** – Felhasználói hitelesítés kontextusa
  - user: Aktuális felhasználó objektum
  - loading: Betöltési állapot
  - onLogout: Kijelentkezés funkció
  - updateUserData: Felhasználói adatok frissítése

- **ToastContext.jsx** – Értesítési rendszer kontextusa
  - showToast: Üzenet megjelenítése felhasználónak

## API Komponensek (users.js):
A `users.js` fájl tartalmazza az összes backend API-hoz való kapcsolódást:

### Felhasználói műveletek:
- **register(email, username, psw)** – Új felhasználó regisztrációja
- **login(email, psw)** – Bejelentkezés
- **whoAmI()** – Aktuális felhasználó adatainak lekérdezése
- **logout()** – Kijelentkezés

### Adminisztrátori műveletek:
- **getAllUsers()** – Összes felhasználó lekérdezése
- **deleteUser(user_id)** – Felhasználó törlése
- **userEdit(user_id, username, email, role)** – Felhasználó adatainak módosítása

### Autók kezelése:
- **getAllCars()** – Összes autó lekérdezése (admin)
- **deleteCar(vehicle_id)** – Autó törlése
- **updateCar(...)** – Autó adatainak frissítése
- **NewCarwithimg(...)** – Új autó feltöltése képekkel együtt

### Foglalások:
- **getAllCarswithimg()** – Összes autó lekérdezése képekkel
- **filterCars(filters)** – Autók szűrése
- **getUserProfile()** – Felhasználói profil lekérdezése
- **updateUserProfile(user_id, username, email)** – Profil frissítése
- **uploadUserProfilePic(user_id, file)** – Profilkép feltöltése

---

# Pages Leírása:

## 🔓 Nyilvános Oldalak:
- **MainPage.jsx** (Főoldal)
  - Autók listázása kártyák formájában
  - Szűrési lehetőségek: váltótipus, árrendezés
  - Kattintásra az autó részletes oldalára navigál

- **Login.jsx**
  - Email és jelszó alapú bejelentkezés
  - Siker esetén főoldalra irányít

- **Register.jsx**
  - Új felhasználói fiók regisztrációja
  - Email, username, password mezőkkel

## 🔐 Védett Oldalak (bejelentkezés szükséges):
- **UserProfile.jsx**
  - Felhasználói adatok megjelenítése
  - Név és email módosítása
  - Profilkép kezelése

- **MyReservation.jsx**
  - Saját foglalások listázása táblázatban
  - Foglalás módosítása és törlése
  - Dátum formázás magyar nyelven (hu-HU locale)

## 🛠️ Admin Oldalak:
- **AdminPage.jsx**
  - Felhasználók kezelése (listázás, szerkesztés, törlés)
  - Autók kezelése (feltöltés, szerkesztés, törlés)
  - Kategóriák kezelése
  - Foglalások áttekintése és módosítása
  - Szűrési lehetőségek: márka, modell, ártartomány

## ℹ️ Információs Oldalak:
- **FAQ.jsx** – Gyakran ismételt kérdések
- **Legal.jsx** – Jogszabályi információk

---

# Komponensek Leírása:

| Komponens             | Funkció |
| :---                  | :---    |
| **NavBarcomponent.jsx** | Navigációs sáv – Bejelentkezés, profil, admin panel hivatkozások |
| **Card.jsx**          | Egy autó megjelenítése kártya formájában (carousel + infó) |
| **CarTable.jsx**      | Autók táblázatos megjelenítése (admin oldal) |
| **UserTable.jsx**     | Felhasználók táblázatos megjelenítése (admin oldal) |
| **ReservationsTable.jsx** | Foglalások táblázatos megjelenítése |
| **CategoriesTable.jsx** | Kategóriák táblázatos megjelenítése |
| **ModalInput.jsx**    | Modális input mezők komponense |
| **CategoriesModal.jsx** | Kategória kezelés modális ablak |
| **ReservationsModal.jsx** | Foglalás módosítás modális ablak |
| **PaymentModal.jsx**  | Fizetési adatok beviteli mezők (foglaláskor) |
| **Footer.jsx**        - Aluljel sáv az oldalon |

---

# Környezeti Beállítások:

## Netlify Konfiguráció (netlify.toml):
A frontend Proxy-olja a backend API hívásokat:
```
/users/* -> https://nodejs208.dszcbaross.edu.hu/users/*
/admin/* -> https://nodejs208.dszcbaross.edu.hu/admin/*
/api/payments/* -> https://nodejs208.dszcbaross.edu.hu/api/payments/*
/public/* -> https://nodejs208.dszcbaross.edu.hu/public/*
```

## Vite Konfiguráció (vite.config.js):
- React plugin aktiválva
- JSX gyors fordítás

---

# Fő funkciók:

1. **Felhasználói regisztráció és bejelentkezés**
   - Email és jelszó alapú hitelesítés
   - Munkamenet (session) kezelése cookie-kkal
   - Automatikus felhasználói adatfrissítés

2. **Autók böngészése**
   - Kártyás nézet, responsive design
   -carousel képcímlapként megjelenítése
   - Ár szerinti rendezés (növekvő/csökkenő)
   - Váltótipus szűrés

3. **Foglalási folyamat**
   - Autó részletes oldala
   - Dátum kiválasztása (felveszés/visszaadás)
   - Árkalkuláció (napok * ár)
   - Fizetési modal (szimulált hitelkártya ellenőrzés)

4. **Profil kezelés**
   - Felhasználói adatok módosítása
   - Profilkép feltöltése
   - Saját foglalások kezelése

5. **Adminisztrációs funkciók**
   - Teljes felhasználókezelés
   - Autófeltöltés képekkel
   - Kategóriák kezelése
   - Foglalások áttekintése és módosítása

---

# Stílus (CSS):
- Custom CSS változók a színválasztékhoz
- Gradient témák (primary: kék, secondary: zöld)
- Card hover effektusok
- Carousel navigációs gombok
- Form focus állapotok

---

# Telepítés és használat:

## Lokális fejlesztés:
```bash
# Függőségek telepítése
npm install

# Fejlesztői szerver indítása
npm run dev

# Build készítés
npm run build

# Preview (build után)
npm run preview
```

## Deploy (Netlify):
```bash
# Netlify deploy
netlify deploy --prod
```
---

# Dizájn
- Megvalósításához a figmát használtuk
-[Figma Dizájn](https://www.figma.com/design/EphvNI0Vf3FrApCmTH5Qs6/Main-Project?node-id=0-1&p=f&t=p1m9o3ba9EHNCClp-0)


---

### Használt eszközök

- [VS code](https://code.visualstudio.com)
- [MDN Web Docs](https://developer.mozilla.org/en-US/)
- [W3Schools](https://www.w3schools.com)
- [StackOverflow](https://stackoverflow.com/questions)
- [ChatGPT](https://chatgpt.com)
- [GitHub](https://github.com/)
- [Netlify](https://www.netlify.com)
- [Figma](https://www.figma.com)
- [FontAwesome](https://fontawesome.com)