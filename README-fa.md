\# تکمیل‌کننده خودکار فرم‌های ارزشیابی هم‌آوا / سما 🎓🤖



یک اسکریپت ساده، سریع و کاربردی برای تکمیل و ارسال خودکار فرم‌های ارزشیابی اساتید در سامانه‌های دانشگاهی \*\*هم‌آوا و سما\*\* (مانند دانشگاه علوم پزشکی گلستان و سایر دانشگاه‌ها).



اگر در پایان ترم با لیست بلندی از اساتید برای ارزشیابی مواجه هستید و می‌خواهید در زمان خود صرفه‌جویی کنید، این اسکریپت تمام کارها را در چند ثانیه و به صورت خودکار برای شما انجام می‌دهد.



\## ✨ ویژگی‌ها

\* \*\*کاملاً خودکار:\*\* تمام فرم‌های باقی‌مانده لیست را یکی پس از دیگری پر می‌کند.

\* \*\*انتخاب تصادفی هوشمند:\*\* برای هر سوال، یکی از گزینه‌های طیف لیکرت را به صورت تصادفی انتخاب می‌کند.

\* \*\*بدون توقف (AJAX Interception):\*\* با کنترل درخواست‌های سرور، از رفرش شدن مزاحم صفحه بعد از ثبت هر فرم جلوگیری کرده و همه اساتید را در یک دور اجرا تکمیل می‌کند.

\* \*\*پویا و داینامیک:\*\* فارغ از اینکه تعداد سوالات یا گزینه‌ها چقدر باشد، اسکریپت به درستی کار می‌کند (کدها Hardcode نشده‌اند).

\* \*\*تاخیرهای ایمن:\*\* برای جلوگیری از فشار به سرور دانشگاه و جلوگیری از بلاک شدن درخواست‌ها، بین ارسال هر فرم یک مکث کوتاه یک ثانیه‌ای در نظر گرفته شده است.



\## 🚀 راهنمای استفاده



برای استفاده از این کد نیازی به نصب هیچ نرم‌افزار یا افزونه‌ای ندارید و مستقیماً در مرورگر شما اجرا می‌شود:



۱. وارد پورتال آموزشی دانشگاه خود شوید و به صفحه \*\*«فرم های ارزشیابی»\*\* (جایی که لیست اساتید نمایش داده می‌شود) بروید.

۲. کلید \*\*F12\*\* روی کیبورد (یا `Ctrl + Shift + I` / `Cmd + Option + I` در مک) را فشار دهید تا پنجره ابزار توسعه‌دهندگان (Developer Tools) باز شود.

۳. به تب \*\*Console\*\* بروید.

۴. کد زیر را کپی کرده و در محیط کنسول پیست (Paste) کنید.

۵. کلید \*\*Enter\*\* را بزنید.

۶. بدون اینکه روی چیزی کلیک کنید، تماشا کنید که اسکریپت تمام فرم‌ها را باز، پر و ارسال می‌کند. پس از اتمام کار، صفحه یک‌بار به طور خودکار رفرش می‌شود تا نتیجه نهایی را ببینید.



\### کد اسکریپت

```javascript

(async function automateAllEvaluations() {

&#x20;   const buttons = document.querySelectorAll('.EvaluationBtn');

&#x20;   

&#x20;   if (buttons.length === 0) {

&#x20;       alert('هیچ فرم ارزشیابی برای تکمیل یافت نشد!');

&#x20;       return;

&#x20;   }



&#x20;   console.log(`تعداد ${buttons.length} فرم پیدا شد. در حال شروع...`);



&#x20;   // 1. Intercept the website's jQuery AJAX to safely block the page refresh

&#x20;   if (typeof $ !== 'undefined' \&\& $.ajax) {

&#x20;       const originalAjax = $.ajax;

&#x20;       $.ajax = function(options) {

&#x20;           if (options.url \&\& options.url.includes('SaveFormQuestions')) {

&#x20;               const originalSuccess = options.success;

&#x20;               options.success = function(result) {

&#x20;                   console.log("فرم با موفقیت ثبت شد! در حال انتقال به استاد بعدی...");

&#x20;                   if ($("#common-dialog").length) {

&#x20;                       $("#common-dialog").modal('hide');

&#x20;                   }

&#x20;               };

&#x20;           }

&#x20;           return originalAjax.apply(this, arguments);

&#x20;       };

&#x20;   }



&#x20;   // 2. Loop through all the buttons

&#x20;   for (let i = 0; i < buttons.length; i++) {

&#x20;       console.log(`در حال ارزشیابی استاد ${i + 1} از ${buttons.length}...`);

&#x20;       

&#x20;       buttons\[i].click();



&#x20;       // Wait for the modal to fully load

&#x20;       await new Promise(resolve => {

&#x20;           const checkInterval = setInterval(() => {

&#x20;               const submitBtn = document.querySelector('#submit');

&#x20;               const radios = document.querySelectorAll('.answer-type-choice');

&#x20;               if (submitBtn \&\& submitBtn.offsetParent !== null \&\& radios.length > 0) {

&#x20;                   clearInterval(checkInterval);

&#x20;                   resolve();

&#x20;               }

&#x20;           }, 300);

&#x20;       });



&#x20;       // Group radio buttons by question

&#x20;       const questions = {};

&#x20;       document.querySelectorAll('.answer-type-choice').forEach(radio => {

&#x20;           if (!questions\[radio.name]) {

&#x20;               questions\[radio.name] = \[];

&#x20;           }

&#x20;           questions\[radio.name].push(radio);

&#x20;       });



&#x20;       // Answer every question randomly

&#x20;       for (let questionName in questions) {

&#x20;           const choices = questions\[questionName];

&#x20;           const randomIndex = Math.floor(Math.random() \* choices.length); 

&#x20;           choices\[randomIndex].checked = true;

&#x20;       }



&#x20;       // Submit form

&#x20;       const submitBtn = document.querySelector('#submit');

&#x20;       submitBtn.click();



&#x20;       // Wait for modal to close

&#x20;       await new Promise(resolve => {

&#x20;           const checkInterval = setInterval(() => {

&#x20;               const currentSubmitBtn = document.querySelector('#submit');

&#x20;               if (!currentSubmitBtn || currentSubmitBtn.offsetParent === null) {

&#x20;                   clearInterval(checkInterval);

&#x20;                   resolve();

&#x20;               }

&#x20;           }, 300);

&#x20;       });



&#x20;       // 1-second delay to avoid server spam

&#x20;       await new Promise(resolve => setTimeout(resolve, 1000));

&#x20;   }



&#x20;   console.log('تمام ارزشیابی‌ها با موفقیت انجام شد!');

&#x20;   alert('ارزشیابی تمامی اساتید به اتمام رسید! صفحه برای اعمال تغییرات رفرش می‌شود.');

&#x20;   window.location.reload();

})();



🛠 شخصی‌سازی (فقط ثبت نظرات مثبت)



به طور پیش‌فرض، اسکریپت گزینه‌ها را کاملاً به صورت تصادفی انتخاب می‌کند (از

"کاملا موافقم" تا "کاملا مخالفم"). اگر می‌خواهید برای همه اساتید فقط گزینه‌های

مثبت ثبت شود (مثلاً فقط ۲ گزینه اول: "کاملا موافقم" یا "موافقم" انتخاب شوند)،

می‌توانید کد را به سادگی تغییر دهید.



این خط را در کد پیدا کنید:



const randomIndex = Math.floor(Math.random() \* choices.length); 



و به این شکل تغییر دهید:



const randomIndex = Math.floor(Math.random() \* 2); 



(با این کار، انتخاب تصادفی فقط محدود به گزینه‌های اول و دوم می‌شود).



⚠️ سلب مسئولیت



&#x20; - این پروژه صرفاً برای اهداف آموزشی و سهولت استفاده شخصی ساخته شده است.

&#x20; - مسئولیت نظرات و بازخوردهای ثبت‌شده در اکانت شما، تماماً بر عهده شخص شماست.

&#x20; - توسعه‌دهنده این اسکریپت هیچ‌گونه مسئولیتی در قبال عواقب انضباطی یا مشکلات

&#x20;   آموزشی ناشی از استفاده از ابزارهای خودکار در سامانه دانشگاه ندارد. لطفاً با

&#x20;   مسئولیت خودتان از آن استفاده کنید.



📄 لایسنس (مجوز)



این پروژه تحت لایسنس MIT منتشر شده است - برای جزئیات بیشتر می‌توانید فایل

LICENSE را مطالعه کنید.

