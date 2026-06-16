# Travel to Loei

เว็บแนะนำการท่องเที่ยวจังหวัดเลยสำหรับทำงานร่วมกันด้วย Git branch และ Pull Request

## Branch หลัก

- `main` เก็บหน้าเว็บหลักและโครงสร้างรวม
- `feature/attraction` แก้ข้อมูลใน `data/attractions.json`
- `feature/food` แก้ข้อมูลใน `data/food.json`
- `feature/goods` แก้ข้อมูลใน `data/goods.json`
- `feature/contact` แก้ข้อมูลใน `data/team.json`

## วิธีเปิดดูเว็บในเครื่อง

เว็บนี้โหลดข้อมูลจากไฟล์ JSON ด้วย JavaScript จึงควรเปิดผ่าน local server

```powershell
node server.mjs
```

แล้วเปิด `http://localhost:5500`

ถ้าใช้ VS Code สามารถเปิดด้วย Live Server ได้เช่นกัน หรือถ้าเครื่องมี Python จะใช้ `python -m http.server 5500` ก็ได้

## โครงสร้างไฟล์

```text
TravelToLoie/
├─ index.html
├─ server.mjs
├─ assets/
│  ├─ css/styles.css
│  └─ js/app.js
└─ data/
   ├─ attractions.json
   ├─ food.json
   ├─ goods.json
   └─ team.json
```

## Workflow สำหรับทีม

1. เครื่อง main สร้าง repository และ push branch `main` ขึ้น GitHub
2. แต่ละเครื่อง checkout branch ของตัวเอง
3. แก้เฉพาะไฟล์ข้อมูลที่รับผิดชอบ
4. commit และ push branch ขึ้น GitHub
5. เปิด Pull Request เข้า `main`
6. เครื่อง main review แล้ว merge

ดูคำสั่ง Git เพิ่มเติมใน `docs/git-workflow.md`
