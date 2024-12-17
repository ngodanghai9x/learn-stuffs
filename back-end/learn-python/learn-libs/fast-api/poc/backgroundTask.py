from fastapi import FastAPI, BackgroundTasks

app = FastAPI()

async def error_task():
    try:
        raise ValueError("Something went wrong in the background task")
    except Exception as e:
        # # Ghi lỗi vào log
        # with open("error_log.txt", "a") as f:
        #     f.write(f"Task failed with error: {e}\n")
        print(f"Task failed with error: {e}")

async def success_task():
    with open("log.txt", "a") as f:
        f.write("Task completed successfully\n")

@app.get("/background-error")
async def background_error(background_tasks: BackgroundTasks):
    background_tasks.add_task(error_task)
    background_tasks.add_task(success_task)
    return {"message": "Tasks added to the background"}
