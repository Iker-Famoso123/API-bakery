export const insertSaleDetails = async (client, saleId, filteredItems) => {
    try {
        const promises = filteredItems.map(bread => {
            const querySaleDetails = `
                INSERT INTO Sales_Details (id_sale, id_bread, quantity)
                VALUES ($1, (SELECT id_bread FROM Breads WHERE name = $2), $3)
            `;
            const valuesSaleDetails = [
                saleId,
                bread.name,
                bread.quantity
            ];

            return client.query(querySaleDetails, valuesSaleDetails);
        });

        await Promise.all(promises);
    } catch (error) {
        console.error('Error inserting sale details:', error);
        throw error;
    }
}


