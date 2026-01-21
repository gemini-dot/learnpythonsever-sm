userpass = document.getElementById("password")
useremail = document.getElementById("email")
buttonpass = document.getElementById("dang-nhap")

function an_hienpassbutton() {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
}

buttonpass.addEventListener('submit', function(event) { // Nếu là nút bấm thì nên dùng 'click'
    event.preventDefault();

    const lay_gia_tri_pass = userpass.value;
    const lay_gia_tri_user = useremail.value;

    const goi_du_lieu = {
        "email": lay_gia_tri_user,
        "password": lay_gia_tri_pass    
    };

    fetch("http://localhost:5000/auth/input-pass", { // Thêm http://
        method: 'POST', // Đổi thành 'method'
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(goi_du_lieu) // Xóa dấu ; ở đây
    }) // Đóng ngoặc fetch ở đây
    .then(response => {
        return response.json().then(data => {
            if (!response.ok) {
                throw data;
            }
            return data;
        });
    })
    .then(data => {
        console.log("Đăng nhập thành công!");
        window.location.href = "../../../view/upload/index.html";
    })
    .catch(error => {
        console.log("Sai rồi og ơi:", error);
    });
});

