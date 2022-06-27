# **Vizsgaremek**
SV2HGK Fullstack API képzés - vizsgaremek


## **Tartalom**
- distributable: a buildelt alkalmazás futtató könyvtára
- documents
    - notes
        - logins. md: felhasználónevek / jelszavak a teszteléshez
        - MongoDB Atlas connection. md: db connection string
    - requirements: Feladat kiírás (docx)
    - user stories: Felhasználói történetek
- source
    - backend: Node.js backend
    - frontend: Angular frontend

## **Build**
Legegyszerűbb módja a deploy script futtatása VSC terminalban a gyökérben.

> . "deploy.ps1" [opciók]

Opciók:
> -docker: nem hoz létre docker konténert<br>
docker: a létrehozott docker konténert futtatja<br>
-node: nem installálja a függőségeket a distributable folderben<br>
node: a distributable folderből közvetlenül indítja az alkalmazást<br>

pl:
> . "deploy.ps1" -docker node<br>

nem hoz létre docker konténert és natívan indítja a node szervert a distributable folderből<br>

> . "deploy.ps1" docker -node<br>

Docker konténert hoz létre, azon belül futtatja az npm i-t és indítja a konténert. <br>
Nem futtat npm i-t a distributable mappában és nem indít host gépen node szervert.<br>


Külön is indítható az alkalmazás, mind a backend, mind a frontend mappában:
> npm start<br>

(backend-en a swagger mappát kézzel be kell másolni a dist mappába!)

## **Egyéb**
### **API dokumentáció**
> http://localhost:8080/api/docs

Nincs minden API funkció dokumentálva.
### **Teszt**
Backend mappában:
> npm test

3 unit teszt készült el mindöüsszesen, egyetlen mockolt szervízzel. Lsd source/backend/src/controllers/_\_tests__ mappa.

### **Ami teljesen működik**
- http://localhost:8080/admin/users: felhasználók kezelése
- http://localhost:8080/admin/parts: hambi alkatrészek kezelése

### **Design**
Ez van. Nem jutott rá idő. Egyébként sem vagyok nagy designer, legfeljebb sitebuildelni tudok.
