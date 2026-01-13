from datetime import datetime
from decimal import Decimal
from enum import Enum
from pydantic import BaseModel, ConfigDict, Field

class TransactionStatus(str, Enum):
    PENDING = "PENDING"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"

class FinancialTransaction(BaseModel):
    # model_config = ConfigDict(strict=True) # strict=True prevents JSON parsing (str -> datetime, etc.)


    transaction_id: str = Field(..., min_length=1, description="Unique identifier for the transaction")
    amount: Decimal = Field(..., gt=0, description="Transaction amount")
    currency: str = Field(..., min_length=3, max_length=3, pattern="^[A-Z]{3}$", description="ISO 4217 currency code")
    timestamp: datetime = Field(..., description="Timestamp of the transaction")
    sender_id: str = Field(..., min_length=1, description="ID of the sender")
    receiver_id: str = Field(..., min_length=1, description="ID of the receiver")
    status: TransactionStatus = Field(..., description="Current status of the transaction")
