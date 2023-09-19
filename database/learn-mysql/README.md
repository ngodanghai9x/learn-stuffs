# learn-mysql
### Procedure vs Function
Title,Stored Procedure,Function
---,---,---
Returns,Zero or more values,A single value (which may be a scalar or a table)
Can use transaction?,Yes,No
Can output to parameters?,Yes,No
Can call each other?,Can call a function,Cannot call a stored procedure
Usable in SELECT, WHERE and HAVING statements?,Yes,Yes
Usable in INSERT, UPDATE and UPSERT statements?,Yes,No
Supports exception handling (via try/catch)?,Yes,No