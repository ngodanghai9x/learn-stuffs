DROP TABLE IF EXISTS sales;
CREATE TABLE IF NOT EXISTS sales(
  sales_employee VARCHAR(50) NOT NULL,
  fiscal_year INT NOT NULL,
  sale DECIMAL(14,2) NOT NULL,
  PRIMARY KEY(sales_employee,fiscal_year)
);

INSERT INTO sales(sales_employee,fiscal_year,sale) VALUES
('Hai',2016,300),
('Hai',2017,320),
('Hai',2018,350),
('Bob',2016,100),
('Bob',2017,150),
('Bob',2018,200),
('Alice',2016,150),
('Alice',2017,100),
('Alice',2018,200),
('John',2016,200),
('John',2017,150),
('John',2018,250);

SELECT * FROM sales;

SELECT
  *,
  RANK() OVER (
    PARTITION BY fiscal_year -- group by fiscal_year
    ORDER BY sale DESC
  ) sales_rank
FROM sales;

SELECT
  *,
  PERCENT_RANK() OVER (
    PARTITION BY fiscal_year -- group by fiscal_year
    ORDER BY sale DESC
  ) sales_rank
FROM sales;

SELECT 
  *,  
  PERCENT_RANK() OVER (PARTITION BY fiscal_year ORDER BY sale DESC) sales_rank, -- (rank-1) / ( total_rows-1)  
  SUM(sale) OVER (PARTITION BY fiscal_year) AS 'total_sale', 
  RANK() OVER (PARTITION BY fiscal_year ORDER BY sale DESC)-1 AS 'RANK-1', 
  ROW_NUMBER() OVER (PARTITION BY fiscal_year ORDER BY sale DESC)-1 AS 'ROW_NUMBER-1', 
  COUNT(*) OVER (PARTITION BY fiscal_year)-1 AS 'total_rows-1'
FROM sales;
    
SELECT
  *,
  RANK() OVER (
    PARTITION BY sales_employee
    ORDER BY sale DESC
  ) sales_rank
FROM sales;

SELECT
  *,
  RANK() OVER (
    PARTITION BY sale
    ORDER BY sale DESC
  ) sales_rank
FROM sales;

SELECT
  *,
  RANK() OVER (
    ORDER BY sale DESC
  ) sales_rank
FROM sales;

-- ========