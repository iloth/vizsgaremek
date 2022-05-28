# **Admin felület**

## **Általános**
Az admin felületre csak az "admin" role tagjai jogosultak belépni. Itt lehet a felhasználókat, az ajánlatokat és a burger összetevőket (illetve azok árát) módosítani. Listázni lehet a megrendeléseket. Felső menüsorból lehet kiválasztani a szerkesztendő adatokat.
**Elfogadási kritérium:**
Csak az admin role tagjai érik el a felületet, minden alfunkció működik.

## **Felhasználók**

### **Lista**
Az összes falhasználót felsorolja egy lapozható, szűrhető listában. Megjelenítendő adatok:
- email (login név egyben)
- név
- szállítási cím
- státusz (aktív | inaktív)
- role tagság(ok)

Utolsó oszlopban gombok:
- aktiválás/inaktiválás
- szerkesztés (szerkesztő felületre navigál)
- korábbi megrendelések (felugró ablakban vagy a sor alatt újabb lista nyílik)
- kedvenc burgerek (felugró ablakban vagy a sor alatt újabb lista nyílik)

**Elfogadási kritérium:**
A lista megjelenik. A szűrés működik minden megjelenítendő mezőre. Gombok megjelennek és működnek.

### **Szerkesztés**
A felhasználó adatait lehet szerkeszteni. Lehet törölni vagy szerkeszteni a kedvenc hamburegeket. 
Lehet új jelszót generálni az elfelejtett helyett.
Egy külön listábasn megjelennek a korábbi rendelések (nem szerkeszthető).
A form alatt (vagy külön fülön) listázható a korábbi megrendelések és a kedvenc burgerek (ez utóbbi szintén szerkeszthető lista).

**Elfogadási kritérium:**
A felhasználó minden adata megjelenik és szerkeszthető. A mentés működik, elmenti az adatokat az adatbázisba.
A listák megjelennek és a kedvencek szerkeszthetőek.

### **Kedvenc burgerek lista**
Rendezhető, szerkeszthető lista a felhasználó kedvenc hamburgereiről.
Oszlopok:
 - név
 - összetevők
 - létrehozás/módosítás dátuma
 - utolsó rendelés dátuma

 Utolsó oszlopban gombok:
- törlés
- szerkesztés (szerkesztő felületre navigál)
- korábbi megrendelések (felugró ablakban vagy a sor alatt újabb lista nyílik, csak ezzel a burgerrel)

**Elfogadási kritérium:**
A lista teljes, rendezhető (név és dátumok alapján) és szerkeszthető.

### **Megrendelések listája**
Rendezhető, NEM szerkeszthető lista a felhasználó korábbi megrendeléseiről.

Oszlopok:
 - megrendelés dátuma
 - kedvenc burger neve (ha volt)
 - összetevők
 - összeg
 - státusz (Megrendelve | Folyamatban | Kész | Kiadva)

**Elfogadási kritérium:**
A lista teljes, rendezhető (név és dátumok alapján).

### **Kedvenc burger szerkesztő**
Átírható a burger neve és szerkeszthetők az összetevők (hozzáadás, törlés, sorrend).
A szerkesztés közben folyamatosan látszik az aktuális ár.

**Elfogadási kritérium:**
A burger minden adata helyesen jelenik meg, működik a szerkesztés és a mentés gomb hatására frissül az adatbázis.

## **Összetevők**
### **Összetevők listája**
Szűrhető/rendezhető és bővíthető lista az alapanyagokról

Oszlopok:
- Kategória (Buci | Hús | Sajt | Zöldség | Szósz | Extra | Egyéb)
- Név
- Mentes (Cukor, Glutén, Laktóz)
- Vega/Vegán/Rendes
- Csípősség (0-5)
- Státusz (Elérhető | Ideiglenesen nem elérhető | Nem elérhető)
- Ár

Utolső oszlopban gombok:
- Szerkesztés

Szűrés:
- Kategória
- Név
- Mentes
- Csípősség: min/max (0-5)
- Vega/Vegán/Rendes

**Elfogadási kritérium:**
A lista megjelenik és a szűrés/rendezés működik. A szerkesztés és a hozzáadás gomb a szerkesztő felületre visz.

### **Összetevő szerkesztése**
Összetevőt lehet hozzáadni vagy szerkeszteni.

Adatok: 
- Név
- Kategória (Buci | Hús | Sajt | Zöldség | Szósz | Extra | Egyéb)
- Mentes (Cukor, Glutén, Laktóz)
- Vega/Vegán/Rendes
- Csípősség (0-5)
- Státusz (Elérhető | Ideiglenesen nem elérhető | Nem elérhető)
- Alapértelmezett helyzet
- Ár

**Elfogadási kritérium:**
Az adatok megjelennek és szerkeszthetőek. A mentés működik.

## **Megrendelések**
### **Megrendelések listája**
Szűrhető és rendezhető, de NEM szerkeszthető lista a megrendelésekről. A táblázat alatt egy összesítő sor van, az aktuális szűrési feltételeknek megfelelő összegzésekkel: darab, össz ár, átlag ár

Oszlopok:
 - felhasználó
 - megrendelés dátuma
 - kedvenc burger neve (ha volt)
 - összetevők
 - összeg
 - státusz (Megrendelve | Folyamatban | Kész | Kiadva)

Szűrés:
- felhasználó
- státusz
- dátum

**Elfogadási kritérium:**
A lista megjelenik és rendezhető, minden szűrési kritérium működik. 
