from flask import Flask
app = Flask(__name__)

@app.route("/thunghiem")
def thu_nghiem():
    ket_qua = "đây là server đầu tiên do chính tay tui tạo ý"
    return ket_qua
if __name__ == "__main__":
    app.run(debug=True)
