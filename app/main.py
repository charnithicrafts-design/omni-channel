from fastapi import FastAPI

app = FastAPI(title="Omni-Channel AI Workflow")

@app.get("/")
async def read_root():
    return {"status": "ok"}
