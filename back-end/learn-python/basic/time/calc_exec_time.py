from datetime import datetime

class Timer:
    def __init__(self, label="Timer", start_time = None, end_time = None):
        self.label = label
        self.start_time = start_time
        self.end_time = end_time

    def start(self):
        self.start_time = datetime.now()
        # print(f"{self.label} started...")

    def stop(self):
        self.end_time = datetime.now()
        execution_time = self.end_time - self.start_time
        print(f"{self.label} finished. Execution time: {execution_time.total_seconds()} seconds")
        self.reset()
        del self

    def reset(self):
        self.start_time = None
        self.end_time = None
        print(f"{self.label} reset.")

# Sử dụng
timer = Timer(label="My Code Block")
timer.start()
# Đoạn mã cần đo thời gian
# ...
execution_time = timer.stop()  # Dừng và lấy thời gian thực hiện
