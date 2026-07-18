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
                // Keep a reference to their original success function
                const originalSuccess = options.success;
                // Override it with our own
                options.success = function(result) {
                    console.log("Form submitted safely! Moving to the next one...");
                    // Close the modal manually instead of reloading the page
                    if ($("#common-dialog").length) {
                        $("#common-dialog").modal('hide');
                    }
                };
            }
            // Proceed with the actual network request
            return originalAjax.apply(this, arguments);
        };
    }

    // 2. Loop through all the buttons
    for (let i = 0; i < buttons.length; i++) {
        console.log(`Evaluating teacher ${i + 1} of ${buttons.length}...`);
        
        // Click to open the evaluation modal
        buttons[i].click();

        // Wait for the modal to fully load the questions dynamically
        await new Promise(resolve => {
            const checkInterval = setInterval(() => {
                const submitBtn = document.querySelector('#submit');
                const radios = document.querySelectorAll('.answer-type-choice');
                
                // If button is visible and questions exist, we can proceed
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
            
            // Randomly select an option (usually between 0 and 4)
            // Note: If you want mostly "كاملا موافقم" or "موافقم", change 'choices.length' to '2'
            const randomIndex = Math.floor(Math.random() * choices.length); 
            choices[randomIndex].checked = true;
        }

        // Click the submit button
        const submitBtn = document.querySelector('#submit');
        submitBtn.click();

        // Wait for the modal to close (which means our fake AJAX success triggered)
        await new Promise(resolve => {
            const checkInterval = setInterval(() => {
                const currentSubmitBtn = document.querySelector('#submit');
                if (!currentSubmitBtn || currentSubmitBtn.offsetParent === null) {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 300);
        });

        // Add a 1-second delay so we don't overload the university's servers
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('All evaluations completed successfully!');
    alert('All teachers evaluated! Reloading page to update status.');
    
    // Once everything is absolutely done, reload the page to see the final results.
    window.location.reload();
})();