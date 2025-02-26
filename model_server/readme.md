# Make the environment first and then install the dependencies into that...

# Model Backend Setup
- Install dependencies by requirements.txt file.
    ``` 
    pip install -r requirements.txt
    ```

- Start the backend : 
    ```
    uvicorn main:app --reload
    ```
# NOTE
- If facing issues of not getting path of uvicorn, try the below command.
    ```
    python -m uvicorn main:app --reload
    ```
