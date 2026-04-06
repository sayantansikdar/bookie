import pandas as pd
from sklearn.model_selection import train_test_split
import os

def preprocess(input_path="data/raw/ratings.csv", output_train="data/processed/train.csv", output_test="data/processed/test.csv"):
    df = pd.read_csv(input_path)
    df = df.dropna()
    
    train_df, test_df = train_test_split(df, test_size=0.2, random_state=42)
    
    os.makedirs(os.path.dirname(output_train), exist_ok=True)
    train_df.to_csv(output_train, index=False)
    test_df.to_csv(output_test, index=False)
    
    print(f"Train/test splits saved to {output_train} and {output_test}")

if __name__ == "__main__":
    preprocess()
