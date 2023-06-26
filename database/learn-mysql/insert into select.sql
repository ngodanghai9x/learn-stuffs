-- mysql -h ftct-dataplatform-dev-mysql.cu7v4yvwoodx.eu-west-2.rds.amazonaws.com -P 3306 -u'lam_missionplus' -p'C@NB?d3q'

SELECT group_concat(company_id) FROM taxonomies.companies_dimensions WHERE dimension_id IN (
	SELECT dimension_id FROM taxonomies.dimensions WHERE parent_dimension_id = 21 OR dimension_id = 21 );
SELECT distinct company_id FROM taxonomies.companies_dimensions WHERE dimension_id IN (
	SELECT dimension_id FROM taxonomies.dimensions WHERE parent_dimension_id = 21 OR dimension_id = 21 );
    
INSERT INTO taxonomies.companies_categories(company_id, category_id, is_primary, fct_status_id, user)
  SELECT company_id, category_id, NOT is_primary as is_primary, fct_status_id, user  
  FROM taxonomies.companies_categories WHERE fct_status_id = 1 AND company_id IN (
    SELECT company_id FROM taxonomies.companies_dimensions  WHERE is_primary = 1 AND company_id IN (
      SELECT company_id FROM taxonomies.companies_dimensions WHERE is_primary = 0 
    )
  )
  GROUP BY company_id 
  HAVING COUNT(company_id) = 1;

SELECT GROUP_CONCAT(company_id) FROM taxonomies.companies_categories where company_id IN (
	SELECT company_id FROM taxonomies.companies_categories WHERE fct_status_id = 1 AND company_id IN (
		SELECT company_id FROM taxonomies.companies_dimensions  WHERE is_primary = 1 AND company_id IN (
			SELECT company_id FROM taxonomies.companies_dimensions WHERE is_primary = 0 
		)
	)
		GROUP BY company_id 
		HAVING COUNT(company_id) = 1
);
SELECT * FROM taxonomies.companies_categories where company_id IN 
(100522,101240,102252,102953,103578,104196,104723,105417,105511,105672,105797,106461,108039,111625,111858,113369,113952,114096,115647,117665,118332,118621,118926,119677,121250,122952,123154,124716,126229,126922,128414,129067,129164,129526,130083,132293,132364,132562,132814,132895,134505,135719,135920,136564,136880,137268,137605,140221,141428,142127,142235,143106,143703,145152,145264,145291,145301,145401,145411,145422,145423,145424,145432,145485,145546,145612,145617,145653,145670,145742,145804,145811,145856,146041,146323,146644,146660,146663,146664,146675,146676,147637,147640,147647,147653,147654,147709,147742,147746,147902,147902);

select people_id, name, "" as user from people.people;

SELECT company_id, category_id, NOT is_primary as is_primary, is_primary as is_primary1  
FROM taxonomies.companies_categories where company_id IN (107768, 100000) ;
-- 5
DELETE FROM taxonomies.companies_dimensions WHERE company_id IN (
  SELECT DISTINCT company_id FROM taxonomies.companies_dimensions WHERE dimension_id IN (
	  SELECT dimension_id FROM taxonomies.dimensions WHERE parent_dimension_id = 21 OR dimension_id = 21 ) AND is_primary = 1
) AND dimension_id = 5;

DELETE cd1 FROM taxonomies.companies_dimensions cd1
JOIN taxonomies.companies_dimensions cd2 ON cd1.company_id = cd2.company_id
JOIN taxonomies.dimensions d1 ON cd2.dimension_id = d1.dimension_id AND (d1.parent_dimension_id = 21 OR d1.dimension_id = 21) AND cd2.is_primary = 1
WHERE cd1.dimension_id = 5;

-- 7
SELECT * FROM taxonomies.companies_categories WHERE category_id = 1 AND fct_status_id = 1 AND company_id IN (
	SELECT company_id FROM taxonomies.companies_categories  WHERE is_primary = 1 AND category_id = 3 AND company_id IN (
		SELECT company_id FROM taxonomies.companies_categories WHERE is_primary = 1 AND category_id = 1 
	)
);

select ct1.* FROM taxonomies.companies_categories ct1 
JOIN taxonomies.companies_categories ct2 ON ct1.company_id = ct2.company_id
JOIN taxonomies.companies_categories ct3 ON ct3.id = ct2.id AND ct3.is_primary = 1 AND ct3.category_id = 3
JOIN taxonomies.companies_categories ct4 ON ct3.company_id= ct4.company_id AND ct4.is_primary = 1 AND ct4.category_id = 1 
WHERE ct1.category_id = 1 AND ct1.fct_status_id = 1;

select ct1.* FROM taxonomies.companies_categories ct1 
JOIN taxonomies.companies_categories ct2 ON ct1.company_id = ct2.company_id
WHERE ct2.id IN (
	SELECT ct3.id FROM taxonomies.companies_categories ct3 
    JOIN taxonomies.companies_categories ct4 ON ct3.company_id= ct4.company_id 
    WHERE ct3.is_primary = 1 AND ct3.category_id = 3 AND ct4.is_primary = 1 AND ct4.category_id = 1 
) AND ct1.category_id = 1 AND ct1.fct_status_id = 1;

SELECT 
    user, 
    host, 
    db, 
    command 
FROM 
    information_schema.processlist;