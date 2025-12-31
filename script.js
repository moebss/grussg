document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('subscribeForm');
    const formContainer = document.getElementById('formContainer');
    const successMessage = document.getElementById('successMessage');
    const submitBtn = document.getElementById('submitBtn');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();

            // Loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Wird geladen... ⏳';

            try {
                const response = await fetch('/api/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                });

                const data = await response.json();

                if (response.ok) {
                    // Success
                    formContainer.style.display = 'none';
                    successMessage.style.display = 'block';
                } else {
                    throw new Error(data.error || 'Fehler beim Abonnieren');
                }
            } catch (err) {
                alert('Ups! Da ist was schiefgelaufen: ' + err.message);
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Erinnert mich! 🔔';
            }
        });
    }
});
