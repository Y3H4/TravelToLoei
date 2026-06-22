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

- `feature/attraction` แก้เฉพาะ `feature/attraction/`
- `feature/food` แก้เฉพาะ `feature/food/`
- `feature/goods` แก้เฉพาะ `feature/goods/`
- `feature/contact` แก้เฉพาะ `feature/contact/`

แต่ละโฟลเดอร์มี `data.json` และ `images/` สำหรับงานของทีมนั้น การแยกแบบนี้ช่วยลด conflict เพราะแต่ละทีมแก้คนละพื้นที่

## คำสั่งสำหรับเครื่อง feature

```powershell
git clone https://github.com/Y3H4/TravelToLoei.git
cd TravelToLoie
git checkout -b feature/food origin/main
```

เปลี่ยนชื่อ branch ให้ตรงกับงาน เช่น `feature/goods`, `feature/contact` หรือ `feature/attraction`

ถ้า branch ถูก push ขึ้น GitHub ไว้แล้ว ให้ใช้คำสั่งนี้แทน

```powershell
git fetch origin
git checkout feature/food
```

หลังแก้งานเสร็จ

```powershell
git status
git add feature/food/
git commit -m "Add Loei food recommendations"
git push -u origin feature/food
```

เปลี่ยน path และชื่อ branch ให้ตรงกับงานของเครื่องนั้น

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

- แต่ละ branch แก้เฉพาะโฟลเดอร์ `feature/<งานของตัวเอง>/`
- ห้ามแก้ `index.html`, `assets/css/styles.css`, หรือ `assets/js/app.js` จากเครื่อง feature ถ้าไม่ได้ตกลงกับ main
- ก่อนเริ่มงานครั้งแรกให้สร้าง branch จาก `origin/main` ล่าสุด
- commit message ควรบอกสิ่งที่เพิ่ม เช่น `Add souvenir data`
- ถ้า JSON error เว็บอาจโหลดข้อมูลไม่ได้ ให้ตรวจ comma และ quote ให้ถูกต้อง
- รูปทั้งหมดต้องถูก `git add` และ commit พร้อมกับ `data.json` มิฉะนั้นเครื่อง main จะมองไม่เห็นรูป
- ห้ามวางรูปไว้ในโฟลเดอร์ของ feature อื่น
