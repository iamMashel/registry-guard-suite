import json
import os
import sys
from pathlib import Path
from typing import List

from pydantic import ValidationError

from validation.models import FinancialTransaction

DATA_FILE = Path(__file__).parent.parent / "data" / "transactions.json"

def load_data() -> List[dict]:
    if not DATA_FILE.exists():
        print(f"Error: Data file not found at {DATA_FILE}")
        sys.exit(1)
    
    try:
        with open(DATA_FILE, "r") as f:
            return json.load(f)
    except json.JSONDecodeError as e:
        print(f"Error: Failed to parse JSON: {e}")
        sys.exit(1)

def validate_transactions(data: List[dict]):
    print(f"Validating {len(data)} transactions...")
    valid_count = 0
    errors = []

    for i, file_data in enumerate(data):
        try:
            FinancialTransaction(**file_data)
            valid_count += 1
        except ValidationError as e:
            errors.append(f"Transaction {i} invalid: {e}")
    
    if errors:
        print("\n".join(errors))
        print(f"\nMigration Failed: {len(errors)} transactions are invalid.")
        sys.exit(1)
    
    print(f"Success: All {valid_count} transactions validated successfully.")

if __name__ == "__main__":
    print("Starting Validation Engine...")
    data = load_data()
    # Expecting a list of transactions
    if not isinstance(data, list):
        print("Error: Input data must be a JSON list of objects.")
        sys.exit(1)
        
    validate_transactions(data)
