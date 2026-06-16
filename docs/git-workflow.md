# Git Workflow

เอกสารนี้ใช้สำหรับแบ่งงานเว็บ Travel to Loei เป็นหลาย branch แล้วรวมงานผ่าน Pull Request เข้า `main`

## ตั้งค่า repository ครั้งแรกจากเครื่อง main

```powershell
git init
git branch -M main
git add .
git commit -m "Initial Travel to Loei website"
git remote add origin <GITHUB_REPOSITORY_URL>
git push -u origin main
```

## เปิดดูเว็บในเครื่อง

```powershell
node server.mjs
```

เปิด browser ที่ `http://localhost:5500`

ถ้า port `5500` ถูกใช้งานอยู่ ให้เปลี่ยน port ได้ เช่น

```powershell
$env:PORT=5600
node server.mjs
```

## สร้าง branch งาน

เครื่อง main หรือหัวหน้าทีมสร้าง branch แล้ว push ขึ้น GitHub ได้ด้วยคำสั่งนี้

```powershell
git checkout main
git pull origin main

git checkout -b feature/attraction
git push -u origin feature/attraction

git checkout main
git checkout -b feature/food
git push -u origin feature/food

git checkout main
git checkout -b feature/goods
git push -u origin feature/goods

git checkout main
git checkout -b feature/contact
git push -u origin feature/contact

git checkout main
```

## งานของแต่ละ branch

- `feature/attraction` แก้ `data/attractions.json`
- `feature/food` แก้ `data/food.json`
- `feature/goods` แก้ `data/goods.json`
- `feature/contact` แก้ `data/team.json`

การแยกไฟล์แบบนี้ช่วยลด conflict เพราะแต่ละทีมแก้คนละไฟล์

## คำสั่งสำหรับเครื่อง feature

```powershell
git clone <GITHUB_REPOSITORY_URL>
cd TravelToLoie
git checkout feature/food
```

เปลี่ยนชื่อ branch ให้ตรงกับงาน เช่น `feature/goods` หรือ `feature/contact`

หลังแก้งานเสร็จ

```powershell
git status
git add data/food.json
git commit -m "Add Loei food recommendations"
git push
```

จากนั้นเปิด Pull Request บน GitHub โดยเลือก

- base: `main`
- compare: branch feature ของตัวเอง

## วิธี merge ที่เครื่อง main

หลัง Pull Request ผ่านการตรวจแล้ว ให้ merge บน GitHub หรือใช้คำสั่ง

```powershell
git checkout main
git pull origin main
```

ถ้า merge ผ่าน GitHub แล้ว เครื่อง main ใช้ `git pull origin main` เพื่อดึงงานล่าสุด

## กติกาเพื่อลดปัญหา merge conflict

- แต่ละ branch แก้เฉพาะไฟล์ที่รับผิดชอบ
- ห้ามแก้ `index.html`, `assets/css/styles.css`, หรือ `assets/js/app.js` จากเครื่อง feature ถ้าไม่ได้ตกลงกับ main
- ก่อนเริ่มงานทุกครั้งให้ `git pull`
- commit message ควรบอกสิ่งที่เพิ่ม เช่น `Add souvenir data`
- ถ้า JSON error เว็บอาจโหลดข้อมูลไม่ได้ ให้ตรวจ comma และ quote ให้ถูกต้อง
