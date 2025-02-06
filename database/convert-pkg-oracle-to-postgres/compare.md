## compare

| **Tiêu chí**                | **Postgres**                           | **Oracle**                         |
|-----------------------------|----------------------------------------|---------------------------------------|
| **Số dòng bị ảnh hưởng bởi câu lệnh SQL gần nhất** | DECLARE rowCount INTEGER; GET DIAGNOSTICS rowCount = ROW_COUNT; | rowCount := SQL%ROWCOUNT; |
| **Find index của chuỗi con** | POSITION('con' IN 'cha') | INSTR('cha', 'con', 1, 1) |
| **abc** |  |  |
| **abc** |  |  |
| **abc** |  |  |
| **abc** |  |  |
| **abc** |  |  |
| **abc** |  |  |
| **abc** |  |  |