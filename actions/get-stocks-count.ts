import prismadb from "@/lib/prismadb";

export const getStocksCount = async (storeId:string) => {
    const salesCount = await prismadb.product.count({
        where: {
            storeId,
            isArchived: false,
        },
    });

    return salesCount;
};