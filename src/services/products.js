import { productModel } from "../models/products.js";

export const getProductsService = async ({limit = 2, page = 1, sort, query }) => {
    try{
        page = page ==0 ? 1 : page;
        page = Number(page);
        limit = Number(limit);
        const skip = (page-1) * limit;
        const sortOrderOptions = {'asc':-1,'desc':1 };
        sort = sortOrderOptions[sort] || null;

        try {
            if(query)
                query = JSON.parse(decodeURIComponent(query))
        } catch (error) {
            query = {}
        }

        const queryProducts = productModel.find(query).limit(limit).skip(skip);

        if(sort !== null)
            queryProducts.sort({price:sort});

        const [products, totalDocs] = await Promise.all([queryProducts, productModel.countDocuments(query)]);

        const totalPages = Math.ceil(totalDocs/limit);
        const hasNextPage = page < totalPages;
        const hastPrePage = page > 1;
        const prevPage = hastPrePage ? page -1 : null;
        const nextPage = hasNextPage ? page +1 : null;

        return {
            totalDocs,
            totalPages,
            limit,
            hasNextPage,
            hastPrePage,
            prevPage,
            nextPage,
            payload: products,       
        }


    } catch {
        console.log(`getProductsService -> `, error);
        throw error;
    }
}