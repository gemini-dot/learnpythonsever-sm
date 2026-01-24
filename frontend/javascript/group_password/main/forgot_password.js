const form = document.getElementById('forgotPasswordForm');
const emailInput = document.getElementById('email');

form.addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const emailValue = emailInput.value.trim();

    if (!emailValue) {
        alert('Vui lòng nhập địa chỉ email, og ơi!');
        return;
    }

    const submitBtn = form.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerText = "Đang gửi...";
    submitBtn.disabled = true;

    try {
        const response = await fetch('https://learnpythonsever-sm.onrender.com/auth/tim-mat-khau1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ gmail: emailValue })
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Server bảo: " + data.message);
            document.getElementById('successModal').style.display = 'flex';
        } else {
            alert("Lỗi: " + (data.message || "Có gì đó sai sai rồi og ơi!"));
        }

    } catch (error) {
        console.error("Lỗi kết nối:", error);
        alert("Không kết nối được với server rồi!");
    } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
});

function closeModal() {
    document.getElementById('successModal').style.display = 'none';
}