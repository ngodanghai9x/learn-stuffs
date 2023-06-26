select sp.*, (temp.sum * commissionRate) as total
from SalesPerson sp
join (
  select o.saleId, sum(o.amount) as sum 
  from `Order` o 
  group by o.saleId 
) as temp on sp.saleId = temp.saleId;

select sp.id, sp.name
from SalesPerson sp
where sp.saleId in (
  select o.saleId
  from `Order` o 
  join Customer c on c.id = o.customerId
  where c.name != 'Github'
);


