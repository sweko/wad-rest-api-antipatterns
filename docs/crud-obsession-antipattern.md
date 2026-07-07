# The CRUD Obsession Anti-Pattern

## Definition
The "CRUD Obsession" anti-pattern in REST API design refers to the tendency to model every operation as a Create, Read, Update, or Delete action, even when the domain calls for more specific or complex operations.

## Origin of the Name
The name "CRUD Obsession" highlights the fixation on using only the basic CRUD (Create, Read, Update, Delete) operations, often at the expense of more meaningful and domain-specific actions.

## The Problem
1. **Loss of Domain Semantics**: Important business operations are reduced to generic CRUD actions, losing their specific meaning.

2. **Increased Complexity**: Complex operations may require multiple CRUD calls, complicating client logic.

3. **Lack of Atomicity**: Operations that should be atomic are split across multiple requests, risking data inconsistency.

4. **Reduced Discoverability**: The API becomes less self-descriptive as domain-specific operations are hidden behind generic CRUD endpoints.

5. **Performance Issues**: Multiple roundtrips may be required to complete what should be a single operation.

## Examples
1. **Bank Transfer Scenario**:
   - Bad (CRUD Obsession): 
     ```
     POST /accounts/123/withdraw
     {
       "amount": 100
     }
     POST /accounts/456/deposit
     {
       "amount": 100
     }
     ```
   - Better: 
     ```
     POST /transfers
     {
       "fromAccount": "123",
       "toAccount": "456",
       "amount": 100
     }
     ```

2. **Order Fulfillment**:
   - Bad (CRUD Obsession):
     ```
     PATCH /orders/789
     {
       "status": "processing"
     }
     POST /inventory/item-456/decrement
     {
       "quantity": 1
     }
     POST /shipments
     {
       "orderId": "789",
       "address": "..."
     }
     ```
   - Better:
     ```
     POST /orders/789/fulfill
     {
       "shipmentAddress": "..."
     }
     ```

## How to Avoid
1. **Domain-Driven Design**: Model your API around domain-specific actions and concepts.
2. **Use Verbs for Operations**: When an operation doesn't fit CRUD, use a verb to describe the action (e.g., `/transfer`, `/fulfill`).
3. **Consider Command Pattern**: Implement complex operations as commands that encapsulate all necessary actions.
4. **Batch Operations**: Provide endpoints for batch operations to reduce the need for multiple CRUD calls.
5. **Embrace RPC for Complex Operations**: For very complex operations, consider using RPC-style endpoints alongside RESTful ones.

## Trade-offs
While avoiding "CRUD Obsession" is generally beneficial, consider:
- Potential increase in the number of specific endpoints.
- Need for clear naming conventions for non-CRUD operations.
- Balancing between REST principles and domain-specific actions.

Balance is key – aim for an API that expresses your domain clearly while still leveraging the benefits of RESTful design where appropriate.
