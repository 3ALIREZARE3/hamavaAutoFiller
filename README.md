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
4. Copy the entire script from `script.js` (or copy the code below) and paste it into the console.
5. Press **Enter**.
6. Sit back and watch the script open, fill, and submit every form automatically. The page will refresh once all evaluations are completed.

### The Script
```javascript
(async function automateAllEvaluations() {
    const buttons = document.querySelectorAll('.EvaluationBtn');
    
    if (buttons.length === 0) {
        alert('No pending evaluations found!');
        return;
    }

    console.log(`Found ${buttons.length} evaluations. Starting...`);

    // 1. Intercept the website's jQuery AJAX to safely block the page refresh
    if (typeof $ !== 'undefined' && $.ajax) {
        const originalAjax = $.ajax;
        $.ajax = function(options) {
            if (options.url && options.url.includes('SaveFormQuestions')) {
                const originalSuccess = options.success;
                options.success = function(result) {
                    console.log("Form submitted safely! Moving to the next one...");
                    if ($("#common-dialog").length) {
                        $("#common-dialog").modal('hide');
                    }
                };
            }
            return originalAjax.apply(this, arguments);
        };
    }

    // 2. Loop through all the buttons
    for (let i = 0; i < buttons.length; i++) {
        console.log(`Evaluating teacher ${i + 1} of ${buttons.length}...`);
        
        buttons[i].click();

        // Wait for the modal to fully load
        await new Promise(resolve => {
            const checkInterval = setInterval(() => {
                const submitBtn = document.querySelector('#submit');
                const radios = document.querySelectorAll('.answer-type-choice');
                if (submitBtn && submitBtn.offsetParent !== null && radios.length > 0) {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 300);
        });

        // Group radio buttons by question
        const questions = {};
        document.querySelectorAll('.answer-type-choice').forEach(radio => {
            if (!questions[radio.name]) {
                questions[radio.name] = [];
            }
            questions[radio.name].push(radio);
        });

        // Answer every question randomly
        for (let questionName in questions) {
            const choices = questions[questionName];
            const randomIndex = Math.floor(Math.random() * choices.length); 
            choices[randomIndex].checked = true;
        }

        // Submit form
        const submitBtn = document.querySelector('#submit');
        submitBtn.click();

        // Wait for modal to close
        await new Promise(resolve => {
            const checkInterval = setInterval(() => {
                const currentSubmitBtn = document.querySelector('#submit');
                if (!currentSubmitBtn || currentSubmitBtn.offsetParent === null) {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 300);
        });

        // 1-second delay to avoid server spam
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('All evaluations completed successfully!');
    alert('All teachers evaluated! Reloading page to update status.');
    window.location.reload();
})();

🛠 Customization (Positive Reviews Only)

By default, the script picks completely random answers (ranging from "Strongly
Agree" to "Strongly Disagree"). If you prefer to give mostly positive reviews
(e.g., only selecting the first two choices: "کاملا موافقم" or "موافقم"), you
can easily change one line of code.

Find this line in the script:

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
