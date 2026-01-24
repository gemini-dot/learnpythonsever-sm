import os
import requests
from pathlib import Path

def gui_mail_reset(email_nguoi_nhan, token):
    # 1. Lấy cấu hình từ biến môi trường (Environment trên Render)
    # Với EmailJS, og cần các ID này thay vì email/pass thông thường
    service_id = os.getenv("EMAILJS_SERVICE_ID")
    template_id = os.getenv("EMAILJS_TEMPLATE_ID")
    public_key = os.getenv("EMAILJS_PUBLIC_KEY")

    # 2. Tạo link reset
    link_reset = f"https://gemini-dot.github.io/learnpythonsever-sm/frontend/view/group_password/forgot_password.html?gmail={email_nguoi_nhan}&token={token}"

    # 3. Xử lý đường dẫn file HTML (File đang ở utils, nên phải lùi 2 cấp để vào frontend)
    # Dùng Pathlib cho an toàn và dễ hiểu
    BASE_DIR = Path(__file__).resolve().parent.parent
    file_path = BASE_DIR / "frontend" / "view" / "giao_dien_email" / "index.html"

    try:
        # Đọc nội dung HTML
        with open(file_path, "r", encoding="utf-8") as f:
            html_template = f.read()
        
        # Thay thế link vào template (nếu og dùng EmailJS để gửi HTML trực tiếp)
        # Nhưng thường EmailJS dùng template có sẵn trên web của nó
        final_html = html_template.replace("{{LINK_RESET}}", link_reset)

        # 4. Gửi mail qua API EmailJS
        url = "https://api.emailjs.com/api/v1.0/email/send"
        
        data = {
            'service_id': service_id,
            'template_id': template_id,
            'user_id': public_key,
            'template_params': {
                'user_email': email_nguoi_nhan,
                'my_html_content': final_html
            }
        }

        response = requests.post(url, json=data)
        
        if response.status_code == 200:
            print(f"Gửi mail cho {email_nguoi_nhan} thành công rồi og ơi! 🎉")
            return True
        else:
            print(f"EmailJS báo lỗi: {response.text}")
            return False

    except FileNotFoundError:
        print(f"Lỗi: Không tìm thấy file HTML tại {file_path}")
    except Exception as e:
        print(f"Có lỗi bất ngờ rồi og ơi: {e}")
        return False