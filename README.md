# Encrypt & Decrypt data
Mã hoá dữ liệu gửi đi và giải mã dữ liệu nhận về
# Client
Sử dụng Vue tạo ra một form đăng nhập yêu cầu nhập 2 field email và password đầy đủ
Dữ liệu được mã hoá bằng Crypto AES sau đó gửi lên server. Sau khi có kết quả làm việc thì nhận được chuỗi mã hoá từ Server, tiếp tục giải mã và thao tác công việc
# Server
Nhận dữ liệu từ dưới Client gửi lên, giải mã và xử lý dữ liệu.
Mã hoá kết quả bằng Crypto AES và gửi chuỗi mã hoá về phía client.
