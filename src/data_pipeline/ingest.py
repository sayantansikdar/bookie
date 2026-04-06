import pandas as pd
import numpy as np
import os

def ingest_data(output_path="data/raw/ratings.csv"):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    np.random.seed(42)
    
    num_users = 1000
    num_books = 500
    num_ratings = 10000
    
    users = np.random.randint(1, num_users + 1, num_ratings)
    books = np.random.randint(1, num_books + 1, num_ratings)
    ratings = np.random.randint(1, 6, num_ratings)
    
    df = pd.DataFrame({
        "user_id": users,
        "book_id": books,
        "rating": ratings
    })
    
    df = df.drop_duplicates(subset=["user_id", "book_id"])
    
    df.to_csv(output_path, index=False)
    print(f"Generated {len(df)} ratings at {output_path}")

if __name__ == "__main__":
    ingest_data()
