// 1. Hàm lấy các tham số từ URL (như gmail và token)
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        gmail: params.get('gmail'),
        token: params.get('token')
    };
}

async function verifyToken() {
    const { gmail, token } = getQueryParams();

    if (!gmail || !token) {
        alert("Link này thiếu thông tin rồi og ơi, kiểm tra lại mail nhé!");
        return;
    }

    try {
        // 2. Gọi API xác thực (Bước 2 của og)
        // URL sẽ có dạng: /auth/tim-mat-khau2?gmail=...&token=...
        const response = await fetch(`https://learnpythonsever-sm.onrender.com/auth/tim-mat-khau2?gmail=${gmail}&token=${token}`, {
            method: 'POST'
        });

        const data = await response.json();

        if (response.ok && data.success) {
            console.log("Xác thực token thành công! Giờ cho phép đổi pass.");
            // Ở đây ông có thể hiện cái form nhập mật khẩu mới lên
            document.getElementById('reset-form-container').style.display = 'block';
        } else {
            alert("Lỗi rồi: " + (data.message || "Token hết hạn hoặc không đúng!"));
        }
    } catch (error) {
        console.error("Lỗi:", error);
        alert("Không kết nối được server!");
    }
}

// Chạy hàm xác thực ngay khi vừa load trang này
window.onload = verifyToken;