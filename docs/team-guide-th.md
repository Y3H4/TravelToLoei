# คู่มือส่งงานสำหรับลูกทีม

คู่มือนี้ใช้สำหรับสมาชิกที่รับผิดชอบ `attraction`, `food`, `goods` หรือ `contact` และต้องส่งงานผ่าน Pull Request ให้หัวหน้า merge เข้า `main`

## สิ่งที่ต้องเข้าใจก่อนเริ่ม

- branch เช่น `feature/food` คือพื้นที่แยกงานใน Git
- โฟลเดอร์ `feature/food/` คือไฟล์ข้อมูลและรูปของทีม food
- ลูกทีมทำงานบน branch ของตัวเองเท่านั้น
- ลูกทีมห้าม commit ลง `main` และห้ามกด Merge Pull Request เอง
- หัวหน้าเป็นผู้ review และ merge เข้า `main`

## งานของแต่ละทีม

| ทีม | Branch | โฟลเดอร์ที่แก้ได้ |
| --- | --- | --- |
| สถานที่ท่องเที่ยว | `feature/attraction` | `feature/attraction/` |
| อาหาร | `feature/food` | `feature/food/` |
| ของฝาก | `feature/goods` | `feature/goods/` |
| ติดต่อ/ทีมพัฒนา | `feature/contact` | `feature/contact/` |

ห้ามแก้ `index.html`, `assets/css/styles.css` หรือ `assets/js/app.js` ถ้ายังไม่ได้รับมอบหมายจากหัวหน้า

## 1. ดาวน์โหลดโปรเจกต์ครั้งแรก

เปิด PowerShell หรือ Terminal แล้วใช้คำสั่ง

```powershell
git clone https://github.com/Y3H4/TravelToLoei.git
cd TravelToLoei
```

ตรวจสอบว่าเชื่อมต่อ GitHub แล้ว

```powershell
git remote -v
git status
```

## 2. สร้าง branch ของตัวเอง

เลือกใช้เพียงชุดเดียวตามงานที่ได้รับ

### ทีมสถานที่ท่องเที่ยว

```powershell
git switch -c feature/attraction origin/main
```

### ทีมอาหาร

```powershell
git switch -c feature/food origin/main
```

### ทีมของฝาก

```powershell
git switch -c feature/goods origin/main
```

### ทีมติดต่อ

```powershell
git switch -c feature/contact origin/main
```

ตรวจว่าอยู่ branch ถูกต้อง

```powershell
git branch --show-current
git status
```

ชื่อที่แสดงต้องเป็น branch ของตัวเอง ห้ามเป็น `main`

## 3. เพิ่มข้อมูลและรูปภาพ

ตัวอย่างทีม food:

- แก้ข้อมูลใน `feature/food/data.json`
- วางรูปใน `feature/food/images/<id-รายการ>/`
- หนึ่ง object ใน JSON คือหนึ่งรายการ
- เพิ่มได้หลายรายการโดยคั่นแต่ละ object ด้วย comma
- รูปแรกใน `images` จะเป็นภาพปกบนการ์ด

ตัวอย่าง path รูป:

```json
"images": [
  {
    "src": "feature/food/images/khao-piak-sen/cover.jpg",
    "alt": "ข้าวเปียกเส้นพร้อมเครื่อง"
  },
  {
    "src": "feature/food/images/khao-piak-sen/shop.jpg",
    "alt": "บรรยากาศหน้าร้าน"
  }
]
```

ข้อมูลรายละเอียดใช้รูปแบบนี้

```json
"description": "คำอธิบายสั้นบนการ์ด",
"details": [
  "รายละเอียดฉบับเต็มย่อหน้าที่หนึ่ง",
  "รายละเอียดฉบับเต็มย่อหน้าที่สอง"
],
"location": "สถานที่",
"hours": "เวลาเปิด-ปิด",
"price": "ราคา",
"mapUrl": "ลิงก์ Google Maps"
```

## 4. เปิดเว็บตรวจงานในเครื่อง

```powershell
node server.mjs
```

เปิด browser ที่ `http://localhost:5500`

สิ่งที่ต้องตรวจ:

- การ์ดแสดงชื่อ รูป และ description ถูกต้อง
- ปุ่มดูรายละเอียดเปิด modal ได้
- ปุ่มก่อนหน้า/ถัดไปและ thumbnail เปลี่ยนรูปได้ครบ
- ปุ่ม Google Maps เปิดสถานที่ถูกต้อง
- ไม่มีรูปแตกหรือข้อความหาย
- หน้าเว็บบนมือถือไม่ล้นจอ

กด `Ctrl + C` ใน Terminal เมื่อต้องการหยุด server

## 5. ตรวจ JSON ก่อนส่งงาน

เปลี่ยน path ให้ตรงกับทีมของตัวเอง

```powershell
Get-Content -Raw -Encoding UTF8 feature\food\data.json | ConvertFrom-Json | Out-Null
```

ถ้าไม่มี error แสดงว่าโครงสร้าง JSON อ่านได้

## 6. ตรวจไฟล์ที่จะส่ง

```powershell
git status
git diff
```

ต้องเห็นเฉพาะไฟล์ในโฟลเดอร์งานของตัวเอง หากเห็นไฟล์ส่วนกลางที่ไม่ได้รับมอบหมาย ให้หยุดและแจ้งหัวหน้า

## 7. Commit และอัปโหลด branch ขึ้น GitHub

ตัวอย่างทีม food:

```powershell
git add feature/food/
git status
git commit -m "Add Loei food details and images"
git push -u origin feature/food
```

ทีมอื่นเปลี่ยนทั้ง path และชื่อ branch:

```powershell
# Attraction
git add feature/attraction/
git commit -m "Add Loei attraction details and images"
git push -u origin feature/attraction

# Goods
git add feature/goods/
git commit -m "Add Loei goods details and images"
git push -u origin feature/goods

# Contact
git add feature/contact/
git commit -m "Add development team information"
git push -u origin feature/contact
```

หลัง `git push` สำเร็จ branch จะปรากฏบนหน้า GitHub

## 8. เปิด Pull Request ส่งให้หัวหน้า

1. เปิด `https://github.com/Y3H4/TravelToLoei`
2. เข้าเมนู **Pull requests**
3. กด **New pull request**
4. ตั้ง `base` เป็น `main`
5. ตั้ง `compare` เป็น branch ของตัวเอง เช่น `feature/food`
6. ตรวจรายการไฟล์ในแท็บ **Files changed**
7. ตั้งชื่อ Pull Request ให้บอกงานที่ทำ เช่น `Add Loei food details and images`
8. เขียนรายละเอียดว่ามีรายการใด รูปกี่รูป และทดสอบอะไรแล้ว
9. กด **Create pull request**
10. ส่งลิงก์ Pull Request ให้หัวหน้า

ลูกทีมไม่ต้องกด Merge หัวหน้าจะตรวจและ merge เอง

## 9. แก้งานหลังหัวหน้า review

แก้ไฟล์บน branch เดิม แล้วใช้คำสั่ง

```powershell
git status
git add feature/food/
git commit -m "Update food details from review"
git push
```

Pull Request เดิมจะอัปเดตอัตโนมัติ ไม่ต้องสร้าง Pull Request ใหม่

## 10. ถ้า branch มีอยู่บน GitHub แล้ว

ถ้าใช้เครื่องใหม่และ branch ถูก push ไว้แล้ว ให้ใช้

```powershell
git clone https://github.com/Y3H4/TravelToLoei.git
cd TravelToLoei
git fetch origin
git switch --track origin/feature/food
```

เปลี่ยน `feature/food` เป็นชื่อ branch ของตัวเอง

## คำสั่งที่ห้ามใช้โดยไม่ได้รับอนุญาต

```text
git push --force
git reset --hard
git clean -fd
```

คำสั่งเหล่านี้อาจทำให้งานหายหรือเขียนทับประวัติบน GitHub
