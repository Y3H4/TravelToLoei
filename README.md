# Travel to Loei

เว็บแนะนำการท่องเที่ยวจังหวัดเลยสำหรับทำงานร่วมกันด้วย Git branch และ Pull Request

## Branch และโฟลเดอร์ที่รับผิดชอบ

- `main` ดูแลหน้าเว็บหลัก CSS และ JavaScript
- `feature/attraction` ดูแล `feature/attraction/`
- `feature/food` ดูแล `feature/food/`
- `feature/goods` ดูแล `feature/goods/`
- `feature/contact` ดูแล `feature/contact/`

แต่ละทีมแก้เฉพาะ `data.json` และรูปใน `images/` ของตัวเอง เพื่อลด merge conflict

## เปิดดูเว็บในเครื่อง

```powershell
node server.mjs
```

เปิด `http://localhost:5500`

ถ้าใช้ VS Code สามารถเปิดด้วย Live Server ได้เช่นกัน

## โครงสร้างโปรเจกต์

```text
TravelToLoie/
├─ index.html
├─ server.mjs
├─ assets/
│  ├─ css/styles.css
│  └─ js/app.js
├─ feature/
│  ├─ attraction/
│  │  ├─ data.json
│  │  └─ images/
│  │     └─ phu-kradueng/
│  │        ├─ cover.jpg
│  │        └─ viewpoint.jpg
│  ├─ food/
│  │  ├─ data.json
│  │  └─ images/
│  ├─ goods/
│  │  ├─ data.json
│  │  └─ images/
│  └─ contact/
│     ├─ data.json
│     └─ images/
└─ docs/git-workflow.md
```

## รูปแบบข้อมูล

หนึ่ง object ใน `data.json` คือหนึ่งสถานที่ อาหาร ของฝาก หรือสมาชิกทีม สามารถเพิ่มได้หลาย object ใน array เดียวกัน

```json
{
  "id": "phu-kradueng",
  "name": "ภูกระดึง",
  "description": "ข้อความสั้นสำหรับแสดงบนการ์ด",
  "details": [
    "รายละเอียดฉบับเต็มย่อหน้าที่หนึ่ง",
    "รายละเอียดฉบับเต็มย่อหน้าที่สอง"
  ],
  "location": "อำเภอภูกระดึง จังหวัดเลย",
  "hours": "เวลาเปิด-ปิด",
  "price": "ราคาหรือค่าเข้าชม",
  "contact": "ช่องทางติดต่อ",
  "mapUrl": "https://www.google.com/maps/search/?api=1&query=ภูกระดึง+จังหวัดเลย",
  "images": [
    {
      "src": "feature/attraction/images/phu-kradueng/cover.jpg",
      "alt": "วิวภูกระดึงยามเช้า"
    },
    {
      "src": "feature/attraction/images/phu-kradueng/viewpoint.jpg",
      "alt": "จุดชมวิวบนภูกระดึง"
    }
  ],
  "tags": ["ธรรมชาติ", "เดินป่า", "ชมวิว"]
}
```

## กติกาการเพิ่มรูป

1. สร้างโฟลเดอร์ย่อยตาม `id` ของรายการ เช่น `images/phu-kradueng/`
2. เก็บรูปของรายการนั้นทั้งหมดในโฟลเดอร์เดียวกัน
3. ใช้ชื่อไฟล์ภาษาอังกฤษตัวเล็ก คั่นคำด้วย `-` และไม่เว้นวรรค
4. แนะนำไฟล์ `.webp` หรือ `.jpg` และบีบอัดให้มีขนาดเหมาะกับเว็บ
5. เพิ่มทุกภาพลงใน `images` ตามลำดับที่ต้องการแสดง ภาพแรกจะเป็นภาพหน้าปกบนการ์ด
6. ใส่ `alt` ให้สื่อความหมายของภาพทุกภาพ

ระบบยังรองรับ `image` แบบเดิมชั่วคราว แต่ข้อมูลใหม่ควรใช้ `images` เสมอ

## Modal รายละเอียด

- `description` แสดงข้อความสั้นบนการ์ด
- `details` แสดงรายละเอียดหลายย่อหน้าใน modal
- `images` แสดงเป็น gallery พร้อมปุ่มก่อนหน้า ถัดไป thumbnail และตัวนับ
- `mapUrl` แสดงปุ่มเปิดสถานที่ใน Google Maps
- ถ้าไม่มี `mapUrl` แต่มี `location` ระบบจะสร้าง Google Maps search link ให้อัตโนมัติ
- `hours`, `price`, `contact` และ `facts` เป็นข้อมูลเสริมที่เลือกใส่ได้

## คู่มือทีม

- คู่มือลูกทีมแบบละเอียด: `docs/team-guide-th.md`
- Workflow สำหรับหัวหน้าและการจัดการ branch: `docs/git-workflow.md`
