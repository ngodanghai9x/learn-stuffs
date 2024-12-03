CREATE OR REPLACE PROCEDURE make_sale(product_id INT, sale_quantity INT)
LANGUAGE plpgsql AS $$
DECLARE
    product_quantity INT;
    product_price NUMERIC;
    total NUMERIC;
BEGIN
    -- Bắt đầu một transaction
    BEGIN
        -- Kiểm tra số lượng sản phẩm trong kho
        SELECT quantity, price INTO product_quantity, product_price
        FROM products
        WHERE id = product_id;

        -- Nếu không tìm thấy sản phẩm, báo lỗi
        IF NOT FOUND THEN
            RAISE EXCEPTION 'Sản phẩm không tồn tại!';
        END IF;

        -- Kiểm tra nếu số lượng bán vượt quá số lượng hiện có
        IF product_quantity < sale_quantity THEN
            RAISE EXCEPTION 'Không đủ số lượng sản phẩm trong kho!';
        END IF;

        -- Tính tổng tiền bán
        total := sale_quantity * product_price;

        -- Cập nhật số lượng sản phẩm trong kho
        UPDATE products
        SET quantity = quantity - sale_quantity
        WHERE id = product_id;

        -- Thêm giao dịch vào bảng sales
        INSERT INTO sales (product_id, quantity, total_price)
        VALUES (product_id, sale_quantity, total);

        -- Commit transaction nếu không có lỗi
        COMMIT;

    EXCEPTION
        WHEN OTHERS THEN
            -- Nếu có lỗi xảy ra, rollback transaction và thông báo lỗi
            ROLLBACK;
            RAISE NOTICE 'Lỗi xảy ra: %, giao dịch bị hủy', SQLERRM;
    END;
END;
$$;
