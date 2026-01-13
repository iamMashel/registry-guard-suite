from datetime import datetime
from decimal import Decimal
import pytest
from pydantic import ValidationError
from src.validation.models import FinancialTransaction, TransactionStatus

def test_valid_transaction():
    data = {
        "transaction_id": "tx_123",
        "amount": 100.50,
        "currency": "USD",
        "timestamp": "2023-01-01T12:00:00Z",
        "sender_id": "alice",
        "receiver_id": "bob",
        "status": "COMPLETED"
    }
    tx = FinancialTransaction(**data)
    assert tx.transaction_id == "tx_123"
    assert tx.amount == Decimal("100.50")
    assert tx.status == TransactionStatus.COMPLETED

def test_invalid_currency_code():
    data = {
        "transaction_id": "tx_123",
        "amount": 100.50,
        "currency": "USDT", # Too long
        "timestamp": "2023-01-01T12:00:00Z",
        "sender_id": "alice",
        "receiver_id": "bob",
        "status": "COMPLETED"
    }
    with pytest.raises(ValidationError) as exc:
        FinancialTransaction(**data)
    assert "currency" in str(exc.value)

def test_negative_amount():
    data = {
        "transaction_id": "tx_123",
        "amount": -10.00,
        "currency": "USD",
        "timestamp": "2023-01-01T12:00:00Z",
        "sender_id": "alice",
        "receiver_id": "bob",
        "status": "COMPLETED"
    }
    with pytest.raises(ValidationError) as exc:
        FinancialTransaction(**data)
    assert "amount" in str(exc.value)

def test_invalid_status():
    data = {
        "transaction_id": "tx_123",
        "amount": 100.00,
        "currency": "USD",
        "timestamp": "2023-01-01T12:00:00Z",
        "sender_id": "alice",
        "receiver_id": "bob",
        "status": "IN_PROGRESS" # Not in Enum
    }
    with pytest.raises(ValidationError) as exc:
        FinancialTransaction(**data)
    assert "status" in str(exc.value)
