export const insertSaleDetails = async (connection, saleId, filteredItems) => {
    try {
        const promises = filteredItems.map(bread => {
            const querySaleDetails = `
                INSERT INTO Sales_Details (id_sale, id_bread, quantity)
                VALUES (?, (SELECT id_bread FROM Breads WHERE name = ?), ?)
            `;
            const valuesSaleDetails = [
                saleId,
                bread.name,
                bread.quantity
            ];

            return connection.execute(querySaleDetails, valuesSaleDetails);
        });

        await Promise.all(promises);
    } catch (error) {
        console.error('Error inserting sale details:', error);
        throw error;
    }
}


