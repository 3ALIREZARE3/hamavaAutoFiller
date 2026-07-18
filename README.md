Here is the updated README.md file. It includes a language selector at the very
top, removes the long block of code, and replaces it with a clean hyperlink to
the script.js file.

You can copy and paste this directly into your main README.md file:

<div align="center">
  <a href="#english">English</a> | <a href="#persian">فارسی (Persian)</a>
</div>

---

<a id="english"></a>
# Hamava / Sama System Evaluation Auto-Filler 🎓🤖

A simple and effective JavaScript automation script to automatically fill out and submit teacher/professor evaluation forms on the **Hamava (هم آوا) / Sama** university education portals (e.g., Golestan University of Medical Sciences and others).

If you have dozens of professors to evaluate at the end of the semester and want to save time, this script will do it all for you in seconds.

## ✨ Features
* **Fully Automated:** Loops through all pending teacher evaluations automatically.
* **Smart Randomization:** Selects random choices for every Likert-scale question.
* **AJAX Interception:** Safely blocks the website's default page-reload behavior to seamlessly submit all forms in a single run.
* **Dynamic:** Adapts to any number of questions or choices without hardcoded limits.
* **Human-like Delays:** Includes slight delays between submissions to prevent overloading the university servers.

## 🚀 How to Use

You don't need to install any software or extensions. You can run this directly in your web browser.

1. Log into your university portal and navigate to the **Evaluation Forms (فرم های ارزشیابی)** page where the list of teachers is displayed.
2. Press **F12** on your keyboard (or `Ctrl + Shift + I` / `Cmd + Option + I` on Mac) to open the browser's Developer Tools.
3. Click on the **Console** tab.
4. **👉 [Click here to open `script.js`](./script.js)** in this repository, and copy all the code inside it.
5. Paste the copied code into the browser's console and press **Enter**.
6. Sit back and watch the script open, fill, and submit every form automatically. The page will refresh once all evaluations are completed.

## 🛠 Customization (Positive Reviews Only)

By default, the script picks completely random answers (ranging from "Strongly Agree" to "Strongly Disagree"). If you prefer to give mostly positive reviews (e.g., only selecting the first two choices: "کاملا موافقم" or "موافقم"), you can easily change one line of code inside `script.js`.

Find this line in the script:
```javascript
const randomIndex = Math.floor(Math.random() * choices.length); 

Change it to:

const randomIndex = Math.floor(Math.random() * 2); 

(This limits the randomness to only the first 2 options available).

⚠️ Disclaimer

  - This project is strictly for educational purposes and personal use.
  - By using this script, you are responsible for the feedback submitted under
    your account.
  - The author is not responsible for any academic or disciplinary actions taken
    by your university resulting from the use of automated tools. Use at your
    own risk.

📄 License

This project is licensed under the MIT License - see the LICENSE file for
details.

تکمیل‌کننده خودکار فرم‌های ارزشیابی هم‌آوا / سما 🎓🤖

یک اسکریپت ساده، سریع و کاربردی برای تکمیل و ارسال خودکار فرم‌های ارزشیابی
اساتید در سامانه‌های دانشگاهی هم‌آوا و سما (مانند دانشگاه علوم پزشکی گلستان و
سایر دانشگاه‌ها).

اگر در پایان ترم با لیست بلندی از اساتید برای ارزشیابی مواجه هستید و می‌خواهید
در زمان خود صرفه‌جویی کنید، این اسکریپت تمام کارها را در چند ثانیه و به صورت
خودکار برای شما انجام می‌دهد.

✨ ویژگی‌ها

  - کاملاً خودکار: تمام فرم‌های باقی‌مانده لیست را یکی پس از دیگری پر می‌کند.
  - انتخاب تصادفی هوشمند: برای هر سوال، یکی از گزینه‌های طیف لیکرت را به صورت
    تصادفی انتخاب می‌کند.
  - بدون توقف (AJAX Interception): با کنترل درخواست‌های سرور، از رفرش شدن مزاحم
    صفحه بعد از ثبت هر فرم جلوگیری کرده و همه اساتید را در یک دور اجرا تکمیل
    می‌کند.
  - پویا و داینامیک: فارغ از اینکه تعداد سوالات یا گزینه‌ها چقدر باشد، اسکریپت
    به درستی کار می‌کند (کدها Hardcode نشده‌اند).
  - تاخیرهای ایمن: برای جلوگیری از فشار به سرور دانشگاه و جلوگیری از بلاک شدن
    درخواست‌ها، بین ارسال هر فرم یک مکث کوتاه یک ثانیه‌ای در نظر گرفته شده است.

🚀 راهنمای استفاده

برای استفاده از این کد نیازی به نصب هیچ نرم‌افزار یا افزونه‌ای ندارید و مستقیماً
در مرورگر شما اجرا می‌شود:

۱. وارد پورتال آموزشی دانشگاه خود شوید و به صفحه «فرم های ارزشیابی» (جایی که
لیست اساتید نمایش داده می‌شود) بروید. ۲. کلید F12 روی کیبورد (یا Ctrl + Shift +
I / Cmd + Option + I در مک) را فشار دهید تا پنجره ابزار توسعه‌دهندگان (Developer
Tools) باز شود. ۳. به تب Console بروید. ۴. 👉 اینجا کلیک کنید تا فایل script.js
باز شود، سپس تمامی کدهای داخل آن را کپی کنید. ۵. کدها را در محیط کنسول مرورگر
پیست (Paste) کرده و کلید Enter را بزنید. ۶. بدون اینکه روی چیزی کلیک کنید، تماشا
کنید که اسکریپت تمام فرم‌ها را باز، پر و ارسال می‌کند. پس از اتمام کار، صفحه
یک‌بار به طور خودکار رفرش می‌شود تا نتیجه نهایی را ببینید.

🛠 شخصی‌سازی (فقط ثبت نظرات مثبت)

به طور پیش‌فرض، اسکریپت گزینه‌ها را کاملاً به صورت تصادفی انتخاب می‌کند (از
"کاملا موافقم" تا "کاملا مخالفم"). اگر می‌خواهید برای همه اساتید فقط گزینه‌های
مثبت ثبت شود (مثلاً فقط ۲ گزینه اول: "کاملا موافقم" یا "موافقم" انتخاب شوند)،
می‌توانید در فایل script.js تغییر کوچکی ایجاد کنید.

این خط را در کد پیدا کنید:

const randomIndex = Math.floor(Math.random() * choices.length); 

و به این شکل تغییر دهید:

const randomIndex = Math.floor(Math.random() * 2); 

(با این کار، انتخاب تصادفی فقط محدود به گزینه‌های اول و دوم می‌شود).

⚠️ سلب مسئولیت

  - این پروژه صرفاً برای اهداف آموزشی و سهولت استفاده شخصی ساخته شده است.
  - مسئولیت نظرات و بازخوردهای ثبت‌شده در اکانت شما، تماماً بر عهده شخص شماست.
  - توسعه‌دهنده این اسکریپت هیچ‌گونه مسئولیتی در قبال عواقب انضباطی یا مشکلات
    آموزشی ناشی از استفاده از ابزارهای خودکار در سامانه دانشگاه ندارد. لطفاً با
    مسئولیت خودتان از آن استفاده کنید.

📄 لایسنس (مجوز)

این پروژه تحت لایسنس MIT منتشر شده است - برای جزئیات بیشتر می‌توانید فایل
LICENSE را مطالعه کنید.

